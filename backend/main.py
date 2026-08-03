import os
import sqlite3
import hashlib
import secrets
from contextlib import contextmanager
from datetime import datetime, timezone

from fastapi import FastAPI, Request, HTTPException, Query
from fastapi.responses import HTMLResponse, JSONResponse, Response
from pydantic import BaseModel, Field

from pdf import render_cv

DB_PATH = os.getenv("DB_PATH", "/data/telemetry.db")
STATS_TOKEN = os.getenv("STATS_TOKEN", "")
SALT = os.getenv("IP_SALT", "change-me-please")

app = FastAPI(title="cv-telemetry", version="1.0.0")


@contextmanager
def get_db():
    conn = sqlite3.connect(DB_PATH, timeout=10)
    conn.row_factory = sqlite3.Row
    try:
        conn.execute("PRAGMA journal_mode=WAL")
        conn.execute("PRAGMA synchronous=NORMAL")
        yield conn
        conn.commit()
    finally:
        conn.close()


def init_db() -> None:
    os.makedirs(os.path.dirname(DB_PATH) or ".", exist_ok=True)
    with get_db() as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
                path TEXT,
                referrer TEXT,
                visitor_id TEXT,
                ip_hash TEXT,
                user_agent TEXT
            );
            CREATE INDEX IF NOT EXISTS idx_events_created ON events(created_at);
            CREATE INDEX IF NOT EXISTS idx_events_visitor ON events(visitor_id);
            CREATE INDEX IF NOT EXISTS idx_events_path ON events(path);
            """
        )


@app.on_event("startup")
def _startup() -> None:
    init_db()


def hash_value(value: str) -> str:
    if not value:
        return ""
    return hashlib.sha256((SALT + "|" + value).encode()).hexdigest()


def client_ip(request: Request) -> str:
    xff = request.headers.get("x-forwarded-for", "")
    if xff:
        return xff.split(",")[0].strip()
    return request.client.host if request.client else ""


class TrackEvent(BaseModel):
    path: str = "/"
    referrer: str = ""
    visitor_id: str = ""


@app.post("/api/track")
async def track(event: TrackEvent, request: Request):
    ip_h = hash_value(client_ip(request))
    ua = request.headers.get("user-agent", "")[:512]
    try:
        with get_db() as conn:
            conn.execute(
                "INSERT INTO events (path, referrer, visitor_id, ip_hash, user_agent) VALUES (?,?,?,?,?)",
                (event.path[:500], event.referrer[:500], event.visitor_id[:64], ip_h, ua),
            )
    except sqlite3.Error:
        raise HTTPException(status_code=503, detail="storage error")
    return JSONResponse(status_code=204, content=None)


def require_token(token: str | None) -> None:
    if not STATS_TOKEN:
        raise HTTPException(status_code=503, detail="stats disabled (no token configured)")
    if not token or not secrets.compare_digest(token, STATS_TOKEN):
        raise HTTPException(status_code=401, detail="unauthorized")


def scalar(conn, sql, args=()):
    row = conn.execute(sql, args).fetchone()
    return row[0] if row else 0


@app.get("/api/stats")
async def stats(token: str | None = Query(default=None)):
    require_token(token)
    with get_db() as conn:
        total = scalar(conn, "SELECT COUNT(*) FROM events")
        unique_total = scalar(
            conn, "SELECT COUNT(DISTINCT COALESCE(visitor_id, ip_hash)) FROM events WHERE visitor_id IS NOT NULL OR ip_hash IS NOT NULL"
        )
        today = scalar(conn, "SELECT COUNT(*) FROM events WHERE date(created_at)=date('now')")
        unique_today = scalar(
            conn,
            "SELECT COUNT(DISTINCT COALESCE(visitor_id, ip_hash)) FROM events WHERE date(created_at)=date('now') AND (visitor_id IS NOT NULL OR ip_hash IS NOT NULL)",
        )
        last_7 = scalar(conn, "SELECT COUNT(*) FROM events WHERE created_at >= datetime('now','-7 days')")
        unique_7 = scalar(
            conn,
            "SELECT COUNT(DISTINCT COALESCE(visitor_id, ip_hash)) FROM events WHERE created_at >= datetime('now','-7 days') AND (visitor_id IS NOT NULL OR ip_hash IS NOT NULL)",
        )
        last_30 = scalar(conn, "SELECT COUNT(*) FROM events WHERE created_at >= datetime('now','-30 days')")
        unique_30 = scalar(
            conn,
            "SELECT COUNT(DISTINCT COALESCE(visitor_id, ip_hash)) FROM events WHERE created_at >= datetime('now','-30 days') AND (visitor_id IS NOT NULL OR ip_hash IS NOT NULL)",
        )

        by_day = [
            {"date": r[0], "views": r[1], "uniques": r[2]}
            for r in conn.execute(
                """
                SELECT date(created_at) AS d, COUNT(*) AS views,
                       COUNT(DISTINCT COALESCE(visitor_id, ip_hash)) AS uniques
                FROM events WHERE created_at >= datetime('now','-30 days')
                GROUP BY d ORDER BY d
                """
            )
        ]
        by_path = [
            {"path": r[0] or "(none)", "views": r[1], "uniques": r[2]}
            for r in conn.execute(
                """
                SELECT path, COUNT(*) AS views,
                       COUNT(DISTINCT COALESCE(visitor_id, ip_hash)) AS uniques
                FROM events GROUP BY path ORDER BY views DESC LIMIT 10
                """
            )
        ]

    return {
        "total": total,
        "unique_total": unique_total,
        "today": today,
        "unique_today": unique_today,
        "last_7_days": last_7,
        "unique_last_7_days": unique_7,
        "last_30_days": last_30,
        "unique_last_30_days": unique_30,
        "by_day": by_day,
        "by_path": by_path,
    }


@app.get("/api/dashboard", response_class=HTMLResponse)
async def dashboard(token: str | None = Query(default=None)):
    require_token(token)
    data = await stats(token=token)
    max_bar = max((d["views"] for d in data["by_day"]), default=1) or 1

    rows_html = "".join(
        f"<tr><td>{d['date']}</td><td>{d['views']}</td><td>{d['uniques']}</td>"
        f"<td class='bar-cell'><div class='bar' style='width:{(d['views']/max_bar*100):.1f}%'></div></td></tr>"
        for d in reversed(data["by_day"])
    )
    paths_html = "".join(
        f"<tr><td>{p['path']}</td><td>{p['views']}</td><td>{p['uniques']}</td></tr>"
        for p in data["by_path"]
    )

    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Telemetry — {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}</title>
<style>
  :root{{--bg:#0a0a0f;--card:#12121a;--border:#2a2a3a;--text:#fff;--muted:#a0a0b0;--accent:#6366f1}}
  *{{box-sizing:border-box;margin:0;padding:0}}
  body{{background:var(--bg);color:var(--text);font-family:-apple-system,Inter,sans-serif;padding:24px;max-width:980px;margin:0 auto}}
  h1{{font-size:24px;margin-bottom:24px}}
  .grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:16px;margin-bottom:32px}}
  .card{{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px}}
  .card .v{{font-size:28px;font-weight:700;color:var(--accent)}}
  .card .l{{font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-top:6px}}
  h2{{font-size:16px;margin:32px 0 12px;color:var(--muted)}}
  table{{width:100%;border-collapse:collapse;font-size:14px}}
  th,td{{text-align:left;padding:10px 12px;border-bottom:1px solid var(--border)}}
  th{{color:var(--muted);font-weight:600;font-size:12px;text-transform:uppercase;letter-spacing:.05em}}
  td{{color:var(--text)}}
  .bar-cell{{width:40%}}
  .bar{{height:8px;background:var(--accent);border-radius:4px;min-width:2px}}
  a{{color:var(--accent)}}
</style></head><body>
<h1>Telemetry</h1>
<div class="grid">
  <div class="card"><div class="v">{data['total']}</div><div class="l">Total views</div></div>
  <div class="card"><div class="v">{data['unique_total']}</div><div class="l">Unique visitors</div></div>
  <div class="card"><div class="v">{data['today']}</div><div class="l">Today (views)</div></div>
  <div class="card"><div class="v">{data['unique_today']}</div><div class="l">Today (unique)</div></div>
  <div class="card"><div class="v">{data['last_7_days']}</div><div class="l">7d views</div></div>
  <div class="card"><div class="v">{data['unique_last_7_days']}</div><div class="l">7d unique</div></div>
  <div class="card"><div class="v">{data['last_30_days']}</div><div class="l">30d views</div></div>
  <div class="card"><div class="v">{data['unique_last_30_days']}</div><div class="l">30d unique</div></div>
</div>
<h2>Last 30 days</h2>
<table><thead><tr><th>Date</th><th>Views</th><th>Unique</th><th></th></tr></thead><tbody>{rows_html}</tbody></table>
<h2>Top pages</h2>
<table><thead><tr><th>Path</th><th>Views</th><th>Unique</th></tr></thead><tbody>{paths_html}</tbody></table>
<p style="margin-top:24px;color:var(--muted);font-size:12px">JSON: <a href="/api/stats?token={token}">/api/stats?token=...</a></p>
</body></html>"""


@app.get("/api/health")
async def health():
    return {"status": "ok"}


# --- CV PDF generation -------------------------------------------------------

class CvDetail(BaseModel):
    heading: str = ""
    body: str = ""


class CvExperience(BaseModel):
    title: str = ""
    company: str = ""
    period: str = ""
    description: str = ""
    tags: list[str] = Field(default_factory=list)
    intro: str | None = None
    details: list[CvDetail] = Field(default_factory=list)


class CvSkill(BaseModel):
    name: str = ""
    level: str = ""
    description: str = ""


class CvTalk(BaseModel):
    typeLabel: str = ""
    date: str = ""
    title: str = ""
    description: str = ""
    link: str = ""


class CvArticle(BaseModel):
    date: str = ""
    tag: str = ""
    title: str = ""
    description: str = ""
    link: str = ""


class CvContact(BaseModel):
    icon: str = ""
    label: str = ""
    value: str = ""
    link: str = ""


class CvPayload(BaseModel):
    lang: str = "en"
    name: str = ""
    title: str = ""
    company: str = ""
    bio: str = ""
    aboutExtra: list[str] = Field(default_factory=list)
    experience: list[CvExperience] = Field(default_factory=list)
    skills: list[CvSkill] = Field(default_factory=list)
    education: dict = Field(default_factory=dict)
    talks: list[CvTalk] = Field(default_factory=list)
    articles: list[CvArticle] = Field(default_factory=list)
    contacts: list[CvContact] = Field(default_factory=list)


@app.post("/api/cv.pdf")
async def cv_pdf(payload: CvPayload):
    try:
        pdf_bytes = render_cv(payload.model_dump())
    except FileNotFoundError:
        raise HTTPException(status_code=503, detail="xelatex not installed on server")
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=f"PDF generation failed: {str(e)[:500]}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF generation error: {str(e)[:500]}")
    return Response(content=pdf_bytes, media_type="application/pdf",
                    headers={"Content-Disposition": 'attachment; filename="cv.pdf"'})
