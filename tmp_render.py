import pymupdf, pathlib
jobs=[
 ("split/front_matter/pupil_front_matter.pdf", r"C:\Users\apokr\AppData\Local\Temp\pupil_img_front_matter"),
 ("split/unit01/pupil_unit01.pdf", r"C:\Users\apokr\AppData\Local\Temp\pupil_img_unit01"),
 ("split/unit02/pupil_unit02.pdf", r"C:\Users\apokr\AppData\Local\Temp\pupil_img_unit02"),
]
for src, out in jobs:
    o=pathlib.Path(out); o.mkdir(parents=True,exist_ok=True)
    doc=pymupdf.open(src)
    for i,page in enumerate(doc,1):
        pix=page.get_pixmap(dpi=150)
        pix.save(o/f"page{i:02d}.png")
        print(out, i, pix.width, pix.height)
    doc.close()
