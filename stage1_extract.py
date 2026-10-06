"""Stage 1: per-page pdftotext (reading order, no -layout) + bbox xml + PNG render."""
import subprocess, pathlib, shutil, sys

BASE = pathlib.Path(r"C:\photodentro\antigravity\coursebook_fifth")
IMGDIR = pathlib.Path(r"C:\Users\apokr\AppData\Local\Temp\tea_img_a")
IMGDIR.mkdir(parents=True, exist_ok=True)

FILES = [
    ("split/front_matter/teacher_front_matter.pdf", "text/front_matter/teacher_front_matter", "teacher_front_matter.pdf", 0, 4),
    ("split/front_matter/teacher_intro_methodology.pdf", "text/front_matter/teacher_intro_methodology", "teacher_intro_methodology.pdf", 5, 16),
    ("split/unit01/teacher_unit01.pdf", "text/unit01/teacher_unit01", "teacher_unit01.pdf", 17, 24),
    ("split/unit02/teacher_unit02.pdf", "text/unit02/teacher_unit02", "teacher_unit02.pdf", 25, 33),
    ("split/unit03/teacher_unit03.pdf", "text/unit03/teacher_unit03", "teacher_unit03.pdf", 34, 47),
    ("split/unit04/teacher_unit04.pdf", "text/unit04/teacher_unit04", "teacher_unit04.pdf", 48, 56),
    ("split/unit05/teacher_unit05.pdf", "text/unit05/teacher_unit05", "teacher_unit05.pdf", 57, 66),
]

import pymupdf

for src_rel, out_rel, src_fname, g0, g1 in FILES:
    src = BASE / src_rel
    outdir = BASE / out_rel
    pagesdir = outdir / "pages"
    outdir.mkdir(parents=True, exist_ok=True)
    pagesdir.mkdir(parents=True, exist_ok=True)
    # page count via pymupdf
    doc = pymupdf.open(str(src))
    n = doc.page_count
    print(f"{src_rel}: {n} pages (expected {g1-g0+1})")
    assert n == (g1 - g0 + 1), f"page count mismatch for {src_rel}"
    # per-page pdftotext
    for i in range(1, n + 1):
        dest = pagesdir / f"page_{i:03d}.txt"
        # plain reading-order, NO -layout
        r = subprocess.run(["pdftotext", "-enc", "UTF-8", "-f", str(i), "-l", str(i),
                            str(src), str(dest)], capture_output=True, text=True)
        if r.returncode != 0:
            print(f"  pdftotext failed p{i}: {r.stderr[:500]}")
    # bbox xml via pdftohtml -xml -stdout
    bbox_path = outdir / (pathlib.Path(src_fname).stem + ".bbox.xml")
    with open(bbox_path, "wb") as f:
        r = subprocess.run(["pdftohtml", "-xml", "-stdout", str(src)], stdout=f, stderr=subprocess.PIPE)
        if r.returncode != 0:
            print(f"  pdftohtml failed for {src_rel}: {r.stderr.decode(errors='replace')[:500]}")
    print(f"  wrote {bbox_path.name} ({bbox_path.stat().st_size} bytes)")
    # render PNGs ~150dpi
    zoom = 150.0 / 72.0
    mat = pymupdf.Matrix(zoom, zoom)
    stem = pathlib.Path(src_fname).stem
    for i, page in enumerate(doc):
        pix = page.get_pixmap(matrix=mat)
        pix.save(str(IMGDIR / f"{stem}_p{i+1:02d}.png"))
    doc.close()
    print(f"  rendered {n} PNGs for {stem}")

print("STAGE1 DONE")
print("IMGDIR contents:", len(list(IMGDIR.glob('*.png'))))
