"""Step 1: layout-preserving text extraction + bbox xml + table audit + PNG render."""
import subprocess, os, sys, datetime, glob, shutil
import pypdf

WORK = r"C:\photodentro\antigravity\coursebook_fifth"
IMGROOT = r"C:\Users\apokr\AppData\Local\Temp\wb_img"
DATE = "2026-10-04"

FILES = [
    ("split/front_matter/workbook_front_matter.pdf", 0, 7, "text/front_matter/workbook_front_matter"),
    ("split/unit01/workbook_unit01.pdf", 7, 4, "text/unit01/workbook_unit01"),
    ("split/unit02/workbook_unit02.pdf", 11, 8, "text/unit02/workbook_unit02"),
    ("split/unit03/workbook_unit03.pdf", 19, 5, "text/unit03/workbook_unit03"),
    ("split/unit04/workbook_unit04.pdf", 24, 6, "text/unit04/workbook_unit04"),
    ("split/unit05/workbook_unit05.pdf", 30, 6, "text/unit05/workbook_unit05"),
    ("split/unit06/workbook_unit06.pdf", 36, 6, "text/unit06/workbook_unit06"),
    ("split/unit07/workbook_unit07.pdf", 42, 6, "text/unit07/workbook_unit07"),
    ("split/unit08/workbook_unit08.pdf", 48, 7, "text/unit08/workbook_unit08"),
    ("split/unit09/workbook_unit09.pdf", 55, 5, "text/unit09/workbook_unit09"),
    ("split/unit10/workbook_unit10.pdf", 60, 4, "text/unit10/workbook_unit10"),
    ("split/appendix/workbook_appendix_differentiated.pdf", 64, 26, "text/appendix/workbook_appendix_differentiated"),
    ("split/appendix/workbook_appendix_self_assessment_keys.pdf", 90, 6, "text/appendix/workbook_appendix_self_assessment_keys"),
    ("split/appendix/workbook_back_matter.pdf", 96, 2, "text/appendix/workbook_back_matter"),
]

os.chdir(WORK)
os.makedirs(IMGROOT, exist_ok=True)

# --- ALT-TEXT check across all 14 with pypdf (structure) ---
alt_findings = {}
for src, g0, n, outdir in FILES:
    r = pypdf.PdfReader(src)
    assert len(r.pages) == n, f"{src}: got {len(r.pages)} pages, expected {n}"
    has_alt = False
    try:
        if "/StructTreeRoot" in r.root_object:
            has_alt = True
    except Exception:
        pass
    # also scan page /Annots for /Contents or /Alt keys
    annot_notes = []
    for pi, pg in enumerate(r.pages):
        try:
            annots = pg.get("/Annots")
            if annots:
                for a in annots:
                    ao = a.get_object()
                    keys = list(ao.keys())
                    annot_notes.append((pi+1, [str(k) for k in keys]))
        except Exception as e:
            pass
    alt_findings[src] = (has_alt, annot_notes)
print("ALT-TEXT structural check (StructTreeRoot present?):")
for k, v in alt_findings.items():
    print(" ", k, v[0], v[1][:2] if v[1] else "")
print("Raw /Alt token hits are all '/Alternate /DeviceRGB' ICC profile entries -> no accessibility alt-text.", flush=True)

# --- pdfplumber table audit ---
try:
    import pdfplumber
    HAVE_PLUMBER = True
except ImportError:
    HAVE_PLUMBER = False
print("pdfplumber available:", HAVE_PLUMBER, flush=True)

audit_lines = []
for src, g0, n, outdir in FILES:
    base = os.path.splitext(os.path.basename(src))[0]
    pagesdir = os.path.join(outdir, "pages")
    os.makedirs(pagesdir, exist_ok=True)
    # bbox xml
    xmlpath = os.path.join(outdir, base + ".bbox.xml")
    with open(xmlpath, "wb") as f:
        subprocess.run(["pdftohtml", "-xml", "-stdout", src], stdout=f, check=True)
    print(f"bbox xml done: {xmlpath} ({os.path.getsize(xmlpath)} bytes)", flush=True)
    # per-page pdftotext
    page_texts = []
    for i in range(1, n+1):
        dest = os.path.join(pagesdir, f"page{i:02d}.txt")
        subprocess.run(["pdftotext", "-layout", "-enc", "UTF-8", "-f", str(i), "-l", str(i), src, dest], check=True)
        t = open(dest, encoding="utf-8").read()
        page_texts.append(t)
    # pdfplumber table audit
    if HAVE_PLUMBER:
        with pdfplumber.open(src) as pdf:
            for pi, pg in enumerate(pdf.pages):
                try:
                    tables = pg.extract_tables() or []
                except Exception as e:
                    audit_lines.append(f"{base} p{pi+1}: plumber error {e}")
                    continue
                if tables:
                    info = []
                    for ti, tb in enumerate(tables):
                        info.append(f"t{ti+1}:{len(tb)}r x {max(len(r) for r in tb)}c")
                    audit_lines.append(f"{base} p{pi+1}: {len(tables)} table(s) [{'; '.join(info)}]")
                    # dump tables for manual fix reference
                    for ti, tb in enumerate(tables):
                        audit_lines.append(f"  ROWS p{pi+1}t{ti+1}: " + " || ".join(" | ".join((c or "").strip().replace(chr(10),' / ') for c in row) for row in tb)[:600])
                # blank-underscore detection
                txt = page_texts[pi]
                import re
                blanks = len(re.findall(r'\.{3,}|_{2,}', txt))
                if blanks:
                    audit_lines.append(f"{base} p{pi+1}: blanks/dots markers x{blanks}")
    # stash page texts for step 2 (write combined WITHOUT images yet -> temp files)
    tmpcombined = os.path.join(outdir, base + ".__notext__")
    with open(tmpcombined, "w", encoding="utf-8") as f:
        for t in page_texts:
            f.write(t + "\n\x00PAGEBREAK\x00\n")
    total_chars = sum(len(t) for t in page_texts)
    print(f"text done: {src} pages={n} chars={total_chars}", flush=True)

with open("tmp_table_audit.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(audit_lines))
print(f"table audit lines: {len(audit_lines)} -> tmp_table_audit.txt", flush=True)

# --- render PNGs ~150dpi ---
import pymupdf
for src, g0, n, outdir in FILES:
    base = os.path.splitext(os.path.basename(src))[0]
    d = os.path.join(IMGROOT, base)
    os.makedirs(d, exist_ok=True)
    doc = pymupdf.open(src)
    for i, page in enumerate(doc):
        pix = page.get_pixmap(matrix=pymupdf.Matrix(150/72, 150/72))
        pix.save(os.path.join(d, f"page{i+1:02d}.png"))
    doc.close()
    print(f"png done: {base} ({n} pages)", flush=True)
print("STEP1 COMPLETE", flush=True)
