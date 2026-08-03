"""LaTeX-based CV PDF renderer.

Receives a structured CV payload (already localized) from the frontend,
builds a .tex document, compiles with xelatex and returns PDF bytes.
All user-provided text is escaped to prevent LaTeX injection and breakage.
"""
import os
import shutil
import subprocess
import tempfile
from typing import Any

XELATEX = shutil.which("xelatex") or "/usr/bin/xelatex"


def _pick_font() -> str:
    """Return the first available sans font name for fontspec.

    Order reflects availability across environments:
    - DejaVu Sans: default in our Docker image (texlive + fonts-dejavu-core),
      covers Latin + Cyrillic.
    - Liberation Sans: common on Linux.
    - Arial: macOS / Windows fallback.
    """
    candidates = ["DejaVu Sans", "Liberation Sans", "Arial"]
    try:
        out = subprocess.run(
            ["fc-list", ":", "family"],
            capture_output=True, text=True, timeout=5,
        )
        available = {line.strip() for line in out.stdout.splitlines() if line.strip()}
    except Exception:
        available = set()
    for c in candidates:
        if c in available:
            return c
    # Last resort: let fontspec pick its default (no \setmainfont).
    return ""


FONT = _pick_font()

LABELS = {
    "en": {
        "about": "About",
        "experience": "Experience",
        "skills": "Skills",
        "talks": "Talks & Meetups",
        "articles": "Articles",
        "education": "Education",
        "contact": "Contact",
        "tags": "Tags",
    },
    "ru": {
        "about": "Обо мне",
        "experience": "Опыт работы",
        "skills": "Навыки",
        "talks": "Выступления и митапы",
        "articles": "Статьи",
        "education": "Образование",
        "contact": "Контакты",
        "tags": "Теги",
    },
}

PDFBORDER = r"pdfborder={0 0 0}"


def esc(s: str | None) -> str:
    if not s:
        return ""
    repl = {
        "\\": r"\textbackslash{}",
        "&": r"\&",
        "%": r"\%",
        "$": r"\$",
        "#": r"\#",
        "_": r"\_",
        "{": r"\{",
        "}": r"\}",
        "~": r"\textasciitilde{}",
        "^": r"\textasciicircum{}",
    }
    out = []
    for ch in s:
        out.append(repl.get(ch, ch))
    return "".join(out)


def esc_url(u: str | None) -> str:
    if not u:
        return ""
    # \url handles most special chars except % which we still escape
    return u.replace("%", r"\%")


def _header(p: dict) -> str:
    name = esc(p.get("name"))
    title = esc(p.get("title"))
    contacts = p.get("contacts") or []
    line_parts = []
    for c in contacts:
        val = esc(c.get("value"))
        if c.get("link", "").startswith("mailto:"):
            line_parts.append(rf"\href{{{esc(c['link'])}}}{{{val}}}")
        elif c.get("link"):
            line_parts.append(rf"\url{{{esc_url(c['link'])}}}")
        else:
            line_parts.append(val)
    contact_line = r" \textbar{} ".join(line_parts) if line_parts else ""
    parts = [r"\begin{center}", rf"{{\Huge\bfseries {name}}}\\[0.25em]"]
    if title:
        parts.append(rf"{{\large\color{{secondary}} {title}}}\\[0.4em]")
    if contact_line:
        parts.append(rf"{{\small\color{{muted}} {contact_line}}}")
    parts.append(r"\end{center}")
    parts.append(r"\vspace{0.4em}")
    return "\n".join(parts) + "\n"


def _about(p: dict, L: dict) -> str:
    out = [rf"\section*{{{esc(L['about'])}}}"]
    if p.get("bio"):
        out.append(esc(p["bio"]) + "\n")
    for para in p.get("aboutExtra") or []:
        out.append(esc(para) + "\n")
    return "\n".join(out) + "\n"


def _experience(p: dict, L: dict) -> str:
    out = [rf"\section*{{{esc(L['experience'])}}}"]
    for e in p.get("experience") or []:
        out.append(rf"\textbf{{\large {esc(e.get('title'))}}} \hfill {{\color{{muted}}\small {esc(e.get('period'))}}}\\")
        if e.get("company"):
            out.append(rf"\textcolor{{accent}}{{{esc(e['company'])}}}\\[0.3em]")
        if e.get("description"):
            out.append(esc(e["description"]) + "\n")
        if e.get("intro"):
            out.append(rf"\textit{{{esc(e['intro'])}}}" + "\n")
        for d in e.get("details") or []:
            out.append(rf"\textbf{{{esc(d.get('heading'))}}}\\")
            out.append(esc(d.get("body")) + "\n")
        if e.get("tags"):
            tags = ", ".join(esc(t) for t in e["tags"])
            out.append(rf"{{\small\itshape {esc(L['tags'])}: {tags}}}")
        out.append(r"\noindent{\color{rule}\rule{\linewidth}{0.4pt}}")
        out.append(r"\vspace{0.7em}")
        out.append("")
    return "\n".join(out) + "\n"


def _skills(p: dict, L: dict) -> str:
    out = [rf"\section*{{{esc(L['skills'])}}}", r"\begin{itemize}"]
    for s in p.get("skills") or []:
        name = esc(s.get("name"))
        level = esc(s.get("level"))
        desc = esc(s.get("description"))
        out.append(rf"\item \textbf{{{name}}} \textcolor{{muted}}{{({level})}} --- {desc}")
    out.append(r"\end{itemize}")
    return "\n".join(out) + "\n"


def _talks(p: dict, L: dict) -> str:
    talks = p.get("talks") or []
    if not talks:
        return ""
    out = [rf"\section*{{{esc(L['talks'])}}}", r"\begin{itemize}"]
    for t in talks:
        meta = f"{esc(t.get('typeLabel'))} · {esc(t.get('date'))}"
        out.append(rf"\item \textbf{{{esc(t.get('title'))}}} \textcolor{{muted}}{{[{meta}]}}\\")
        if t.get("description"):
            out.append(esc(t["description"]) + "\n")
        if t.get("link"):
            out.append(rf"\url{{{esc_url(t['link'])}}}")
    out.append(r"\end{itemize}")
    return "\n".join(out) + "\n"


def _articles(p: dict, L: dict) -> str:
    arts = p.get("articles") or []
    if not arts:
        return ""
    out = [rf"\section*{{{esc(L['articles'])}}}", r"\begin{itemize}"]
    for a in arts:
        meta = f"{esc(a.get('date'))} · {esc(a.get('tag'))}"
        out.append(rf"\item \textbf{{{esc(a.get('title'))}}} \textcolor{{muted}}{{[{meta}]}}\\")
        if a.get("description"):
            out.append(esc(a["description"]) + "\n")
        if a.get("link"):
            out.append(rf"\url{{{esc_url(a['link'])}}}")
    out.append(r"\end{itemize}")
    return "\n".join(out) + "\n"


def _education(p: dict, L: dict) -> str:
    edu = p.get("education") or {}
    if not edu:
        return ""
    out = [rf"\section*{{{esc(L['education'])}}}"]
    out.append(rf"\textbf{{{esc(edu.get('university'))}}} \hfill {{\color{{muted}} {esc(edu.get('period'))}}}\\")
    if edu.get("name"):
        out.append(rf"\textcolor{{accent}}{{{esc(edu['name'])}}}\\[0.2em]")
    if edu.get("degree"):
        out.append(esc(edu["degree"]))
    return "\n".join(out) + "\n"


def _contact(p: dict, L: dict) -> str:
    contacts = p.get("contacts") or []
    if not contacts:
        return ""
    out = [rf"\section*{{{esc(L['contact'])}}}", r"\begin{itemize}"]
    for c in contacts:
        label = esc(c.get("label"))
        value = esc(c.get("value"))
        link = c.get("link", "")
        if link.startswith("mailto:"):
            val = rf"\href{{{esc(link)}}}{{{value}}}"
        elif link:
            val = rf"\url{{{esc_url(link)}}}"
        else:
            val = value
        out.append(rf"\item \textbf{{{label}}}: {val}")
    out.append(r"\end{itemize}")
    return "\n".join(out) + "\n"


def build_tex(p: dict) -> str:
    lang = p.get("lang") if p.get("lang") in LABELS else "en"
    L = LABELS[lang]
    doc = []
    doc.append(r"""\documentclass[11pt,a4paper]{article}
\usepackage{geometry}
\geometry{margin=1.8cm}
\usepackage{fontspec}
""" + (f"\\setmainfont{{{FONT}}}\n\\setsansfont{{{FONT}}}\n\\setmonofont{{{FONT}}}\n" if FONT else "") + r"""\usepackage{xcolor}
\definecolor{accent}{HTML}{6366F1}
\definecolor{muted}{HTML}{606070}
\definecolor{secondary}{HTML}{A0A0B0}
\definecolor{rule}{HTML}{2A2A3A}
\usepackage{titlesec}
\titleformat{\section}{\Large\bfseries\color{accent}}{}{0em}{}
\titlespacing{\section}{0pt}{1.3em}{0.5em}
\usepackage{enumitem}
\setlist[itemize]{leftmargin=1.3em,itemsep=3pt,topsep=3pt}
\usepackage{hyperref}
\hypersetup{colorlinks=true,urlcolor=accent,linkcolor=accent,""" + PDFBORDER + r"""}
\pagestyle{empty}
\setlength{\parindent}{0pt}
\begin{document}
""")
    doc.append(_header(p))
    doc.append(_about(p, L))
    doc.append(_experience(p, L))
    doc.append(_skills(p, L))
    doc.append(_talks(p, L))
    doc.append(_articles(p, L))
    doc.append(_education(p, L))
    doc.append(_contact(p, L))
    doc.append(r"\end{document}")
    return "\n".join(doc)


def render_cv(payload: dict[str, Any]) -> bytes:
    tex = build_tex(payload)
    with tempfile.TemporaryDirectory() as td:
        tex_path = os.path.join(td, "cv.tex")
        with open(tex_path, "w", encoding="utf-8") as f:
            f.write(tex)
        env = os.environ.copy()
        env["TEXMFCACHE"] = td
        last_err = ""
        for _ in range(2):
            proc = subprocess.run(
                [
                    XELATEX,
                    "-no-shell-escape",
                    "-halt-on-error",
                    "-interaction=nonstopmode",
                    f"-output-directory={td}",
                    tex_path,
                ],
                capture_output=True,
                text=True,
                timeout=90,
                env=env,
            )
            if proc.returncode != 0:
                last_err = (proc.stdout or "")[-4000:] + "\n---STDERR---\n" + (proc.stderr or "")[-2000:]
        pdf_path = os.path.join(td, "cv.pdf")
        if not os.path.exists(pdf_path):
            log_path = os.path.join(td, "cv.log")
            log = ""
            if os.path.exists(log_path):
                with open(log_path, "r", encoding="utf-8", errors="replace") as f:
                    log = f.read()[-4000:]
            raise RuntimeError("xelatex did not produce PDF", last_err, log)
        with open(pdf_path, "rb") as f:
            return f.read()
