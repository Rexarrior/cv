"""Render English figures from frozen repeat-level data; no experiment runs.

uv run --offline --with matplotlib python articles/content/skill-state-in-coding-agents/figures/build-en.py

The source revision and dataset SHA-256 hashes are in english-data.json.
This preserves the upstream point positions, means, shared scales, colors,
timeout markers, and figure dimensions. Only visible text is translated.
"""
import json
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

HERE = Path(__file__).resolve().parent
OUT = HERE.parent / "assets.en"
OUT.mkdir(parents=True, exist_ok=True)
DATA = json.loads((HERE / "english-data.json").read_text())
COLORS = {
    "native": "#59636F", "paper": "#7863A5", "v2": "#167D8D",
    "v3": "#DD8431", "paper2": "#167D8D", "large": "#167D8D", "small": "#B3663B",
}
NAMES = {
    "native": "Native", "paper": "Paper", "v2": "V2", "v3": "V3",
    "paper2": "Paper2", "large": "Paper2 · 2 MiB", "small": "Paper2 · small",
}
PANELS = [
    ("inputPerTask", 1e6, "Input per task", "Million input tokens", 3),
    ("callsPerTask", 1, "Cycles per task", "Recorded model responses", 2),
    ("minutesPerTask", 1, "Time per task", "Minutes, including waits", 2),
]
plt.rcParams.update({
    "font.family": "DejaVu Sans", "font.size": 11,
    "svg.fonttype": "none", "svg.hashsalt": "skill-state-english-20260911",
})

for dataset in DATA["datasets"]:
    for cohort, label in [("sol", "Sol"), ("astra", "Astra")]:
        fig, axes = plt.subplots(1, 3, figsize=(13.7, 5.4))
        for j, mode in enumerate(dataset["modes"]):
            points = [p for p in dataset["points"] if p["cohort"] == cohort and p["mode"] == mode]
            assert len(points) == 5 and {p["repetition"] for p in points} == set(range(1, 6))
            for ax, (key, divisor, title, ylabel, decimals) in zip(axes, PANELS):
                values = [p[key] / divisor for p in points]
                for offset, point, value in zip(np.linspace(-.16, .16, 5), points, values):
                    ax.scatter(j + offset, value, color=COLORS[mode], s=52,
                               marker="^" if point["timeouts"] else "o", alpha=.85, zorder=3)
                mean = sum(values) / 5
                ax.plot([j - .25, j + .25], [mean] * 2, color=COLORS[mode], linewidth=3, zorder=4)
                ax.annotate(f"{mean:.{decimals}f}", (j, max(values)),
                            xytext=(0, 10), textcoords="offset points", ha="center", fontsize=10)
        for ax, (key, divisor, title, ylabel, _) in zip(axes, PANELS):
            ax.set_title(title, loc="left", fontweight="bold", fontsize=13)
            ax.set_ylabel(ylabel)
            ax.set_xticks(range(len(dataset["modes"])), [NAMES[m] for m in dataset["modes"]])
            ax.set_xlim(-.55, len(dataset["modes"]) - .45)
            ax.set_ylim(0, max(p[key] / divisor for p in dataset["points"]) * 1.21)
            ax.spines[["top", "right"]].set_visible(False)
            ax.grid(axis="y", alpha=.16)
            ax.set_axisbelow(True)
        fig.suptitle(f"Codex / {label}: {dataset['title']}",
                     x=.06, ha="left", fontsize=17, fontweight="bold")
        fig.text(.06, .89, dataset["subtitle"], color="#555555", fontsize=11)
        fig.text(.06, .068, "Point: mean of five tasks in one repeat. Line and number: mean across all five repeats.", fontsize=10)
        if dataset["key"] == "small":
            note = "Triangle: repeat with a timeout. Shared scales for Sol and Astra. Time includes waits and machine load."
        else:
            note = "Triangle: repeat with a timeout (15-minute limit). Shared scales for Sol and Astra; time includes waits."
        fig.text(.06, .033, note, fontsize=10)
        fig.tight_layout(rect=(.015, .12, .995, .88), w_pad=2)
        name = f"codex-{cohort}-{dataset['suffix']}-input-cycles-time"
        for suffix in ("png", "svg"):
            target = OUT / f"{name}.{suffix}"
            fig.savefig(target, dpi=180, facecolor="white",
                        metadata={"Date": None} if suffix == "svg" else {})
            if suffix == "svg":
                target.write_text("\n".join(line.rstrip() for line in target.read_text().splitlines()) + "\n")
        plt.close(fig)
        print(name)
