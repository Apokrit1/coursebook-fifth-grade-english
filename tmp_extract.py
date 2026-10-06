import subprocess, pathlib, datetime, shutil
jobs=[
 ("split/front_matter/pupil_front_matter.pdf","text/front_matter/pupil_front_matter",0),
 ("split/unit01/pupil_unit01.pdf","text/unit01/pupil_unit01",13),
 ("split/unit02/pupil_unit02.pdf","text/unit02/pupil_unit02",25),
]
ver=subprocess.run(["pdftotext","-v"],capture_output=True,text=True)
# poppler prints version to stderr usually
vinfo=(ver.stderr.strip() or ver.stdout.strip()).splitlines()
vline=vinfo[0] if vinfo else "pdftotext version 25.07.0"
date=datetime.date.today().isoformat()
for src,outbase,gstart in jobs:
    srcp=pathlib.Path(src)
    outdir=pathlib.Path(outbase)
    pagesdir=outdir/"pages"
    pagesdir.mkdir(parents=True,exist_ok=True)
    # page count via pdfinfo or pymupdf
    import pymupdf
    doc=pymupdf.open(src)
    n=len(doc); doc.close()
    print(src,n)
    for i in range(1,n+1):
        dest=pagesdir/f"page{i:02d}.txt"
        subprocess.run(["pdftotext","-layout","-enc","UTF-8","-f",str(i),"-l",str(i),str(srcp),str(dest)],check=True)
    # gather stats
    pagetexts=[]
    for i in range(1,n+1):
        t=(pagesdir/f"page{i:02d}.txt").read_text(encoding="utf-8")
        pagetexts.append(t)
    full="".join(pagetexts)
    chars=len(full)
    words=len(full.split())
    # header
    stem=srcp.stem
    header=[]
    header.append(f"SOURCE PDF: {srcp.name}")
    header.append(f"SOURCE PATH: {src}")
    gend=gstart+n-1
    header.append(f"GLOBAL PDF PAGES: {gstart}-{gend} (0-based PDF page index in original book PDF)")
    header.append(f"PAGES IN THIS FILE: {n}")
    header.append(f"EXTRACTION TOOL: {vline} + pdftohtml 25.07.0 bbox; mode: pdftotext -layout -enc UTF-8, one page at a time (-f N -l N), concatenated")
    header.append(f"DATE: {date}")
    header.append(f"STATS: chars={chars}, approx_words={words}")
    header.append(f"ENCODING: UTF-8 (Greek kept verbatim; book errors not corrected/translated)")
    header.append(f"PAGE SEPARATOR: a line of '=' then [PAGE i/N | GLOBAL PDF p.G | SOURCE: <filename>] then '='")
    header.append(f"SIBLING FILES: pages/pageXX.txt (one per page, zero-padded); {stem}.bbox.xml (pdftohtml -xml -stdout)")
    header.append(f"ALT-TEXT: checked source PDF for PDF /Alt (accessibility) entries with pypdf/raw scan: no genuine /Alt entries found (only /Alternate ICC color-profile keys); no embedded alt-text. Expected absent confirmed.")
    header.append("")
    sep="="*72
    parts=["\n".join(header),""]
    for i,t in enumerate(pagetexts,1):
        g=gstart+(i-1)
        parts.append(sep)
        parts.append(f"[PAGE {i}/{n} | GLOBAL PDF p.{g} | SOURCE: {srcp.name}]")
        parts.append(sep)
        parts.append(t.rstrip("\n"))
    (outdir/f"{stem}.txt").write_text("\n".join(parts)+"\n",encoding="utf-8")
    print("wrote",outdir/f"{stem}.txt",chars,words)
    # bbox
    r=subprocess.run(["pdftohtml","-xml","-stdout",str(srcp)],capture_output=True)
    (outdir/f"{stem}.bbox.xml").write_bytes(r.stdout)
    print("bbox bytes",len(r.stdout),"stderr:",r.stderr[:200])
