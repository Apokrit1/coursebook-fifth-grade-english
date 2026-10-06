import subprocess, os, sys, datetime, pathlib, shutil
import pymupdf

BASE = pathlib.Path(r"C:\photodentro\antigravity\coursebook_fifth")
IMGDIR = pathlib.Path(r"C:\Users\apokr\AppData\Local\Temp\tea_img_b")
IMGDIR.mkdir(parents=True, exist_ok=True)

FILES = [
    ("split/unit06/teacher_unit06.pdf", "text/unit06/teacher_unit06", 67),
    ("split/unit07/teacher_unit07.pdf", "text/unit07/teacher_unit07", 79),
    ("split/unit08/teacher_unit08.pdf", "text/unit08/teacher_unit08", 88),
    ("split/unit09/teacher_unit09.pdf", "text/unit09/teacher_unit09", 99),
    ("split/unit10/teacher_unit10.pdf", "text/unit10/teacher_unit10", 111),
    ("split/appendix/teacher_appendix_final_test.pdf", "text/appendix/teacher_appendix_final_test", 120),
    ("split/appendix/teacher_appendix_final_test_key.pdf", "text/appendix/teacher_appendix_final_test_key", 124),
    ("split/appendix/teacher_appendix_activity_answers.pdf", "text/appendix/teacher_appendix_activity_answers", 125),
    ("split/appendix/teacher_appendix_sample_lesson_plan.pdf", "text/appendix/teacher_appendix_sample_lesson_plan", 128),
    ("split/appendix/teacher_appendix_bibliography_readers.pdf", "text/appendix/teacher_appendix_bibliography_readers", 135),
    ("split/appendix/teacher_back_matter.pdf", "text/appendix/teacher_back_matter", 141),
]

DATE = datetime.date.today().isoformat()  # 2026-10-04
ZOOM = 150/72.0

for src_rel, out_rel, gstart in FILES:
    src = BASE / src_rel
    outdir = BASE / out_rel
    pagesdir = outdir / "pages"
    outdir.mkdir(parents=True, exist_ok=True)
    pagesdir.mkdir(parents=True, exist_ok=True)
    basename = src.stem  # e.g. teacher_unit06
    doc = pymupdf.open(src)
    n = doc.page_count
    gend = gstart + n - 1
    print(f"== {src_rel} : {n} pp global {gstart}-{gend}")
    # bbox xml via pdftohtml
    bbox_path = outdir / f"{basename}.bbox.xml"
    try:
        # pdftohtml -xml -stdout src out-basename? Use -stdout then capture
        # syntax: pdftohtml -xml -stdout file.pdf [xmlfile]? Actually with -stdout, output goes to stdout.
        r = subprocess.run(["pdftohtml", "-xml", "-stdout", str(src)], capture_output=True, timeout=120)
        if r.returncode == 0 and r.stdout:
            bbox_path.write_bytes(r.stdout)
            print(f"  bbox xml {len(r.stdout)} bytes")
        else:
            print(f"  pdftohtml FAILED rc={r.returncode} stderr={r.stderr[:500]}")
    except Exception as e:
        print(f"  pdftohtml error: {e}")
    # per-page pdftotext (reading order, no -layout)
    page_texts = []
    total_chars = 0
    for i in range(1, n+1):
        tmp = BASE / f"_tmp_{basename}_p{i}.txt"
        r = subprocess.run(["pdftotext", "-enc", "UTF-8", "-f", str(i), "-l", str(i), str(src), str(tmp)], capture_output=True, timeout=60)
        if r.returncode != 0:
            print(f"  pdftotext p{i} FAILED {r.stderr[:300]}")
            txt = ""
        else:
            try:
                txt = tmp.read_text(encoding="utf-8", errors="strict")
            except Exception:
                txt = tmp.read_text(encoding="utf-8", errors="replace")
        # strip trailing whitespace lines but keep content verbatim otherwise; remove formfeed
        txt = txt.replace("\x0c", "").strip()
        # save per-page file
        (pagesdir / f"{basename}_p{i:02d}_global{gstart+i-1:03d}.txt").write_text(txt, encoding="utf-8")
        page_texts.append(txt)
        total_chars += len(txt)
        if tmp.exists():
            tmp.unlink()
        # render PNG
        page = doc[i-1]
        pix = page.get_pixmap(matrix=pymupdf.Matrix(ZOOM, ZOOM))
        imgname = f"{basename}_p{i:02d}_global{gstart+i-1:03d}.png"
        pix.save(str(IMGDIR / imgname))
    doc.close()
    # Build combined file with header + separators. Image block placeholder appended per page.
    # Stats
    sib = outdir / f"{basename}.bbox.xml"
    header_lines = []
    header_lines.append(f"SOURCE PDF: {basename}.pdf")
    header_lines.append(f"SOURCE PATH: {src_rel}")
    header_lines.append(f"GLOBAL PDF PAGES: {gstart}-{gend} (global pages = index in original 146-page teacher PDF)")
    header_lines.append(f"PAGES IN THIS FILE: {n}")
    header_lines.append(f"EXTRACTION TOOL: pdftotext (poppler 25.07.0) + pdftohtml (poppler) + pymupdf {pymupdf.__version__} for PNG rendering")
    header_lines.append(f"EXTRACTION MODE: reading-order, NO -layout (plain pdftotext -enc UTF-8 one page at a time); Teacher's Book pages are TWO-COLUMN so -layout interleaves columns — plain mode preserves reading order")
    header_lines.append(f"DATE: {DATE}")
    header_lines.append(f"STATS: {n} pages | ~{total_chars} chars (body, excl. header/separators) | bbox xml: {basename}.bbox.xml")
    header_lines.append(f"ENCODING: UTF-8 (Greek kept verbatim, never translated/corrected; tests/keys/scripts verbatim)")
    header_lines.append(f"PAGE SEPARATOR: a line of '=' chars, then [PAGE i/N | GLOBAL PDF p.G | SOURCE: <filename>], then a line of '=' chars")
    header_lines.append(f"SIBLING FILES: {basename}.bbox.xml (pdftohtml -xml -stdout) in same folder; per-page plain-text files in pages/ ({basename}_pNN_globalGGG.txt)")
    header_lines.append(f"ALT-TEXT: assumed absent in source PDF (no embedded alt-text found/expected); image content described manually from rendered PNGs — record as assumed, not extracted")
    header = "\n".join(header_lines)
    sep_eq = "=" * 72
    parts = [header, ""]
    for idx, txt in enumerate(page_texts, start=1):
        g = gstart + idx - 1
        parts.append(sep_eq)
        parts.append(f"[PAGE {idx}/{n} | GLOBAL PDF p.{g} | SOURCE: {basename}.pdf]")
        parts.append(sep_eq)
        if txt.strip() == "":
            parts.append("[BLANK PAGE — no extractable text]")
        else:
            parts.append(txt)
        parts.append("")
        parts.append(f"--- IMAGES ON THIS PAGE (p.{g}) ---")
        parts.append(f"[PENDING-VIEW: to be filled after PNG inspection]")
        parts.append("")
    combined = "\n".join(parts)
    # update STATS with actual combined chars?
    combined_path = outdir / f"{basename}.txt"
    combined_path.write_text(combined, encoding="utf-8")
    print(f"  wrote {combined_path} chars={len(combined)} body={total_chars}")
print("DONE")
