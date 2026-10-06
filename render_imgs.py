import pymupdf
import os
out = r'C:\Users\apokr\AppData\Local\Temp\pupil_img_u345'
os.makedirs(out, exist_ok=True)
jobs = [
    ('split/unit03/pupil_unit03.pdf', 'u03'),
    ('split/unit04/pupil_unit04.pdf', 'u04'),
    ('split/unit05/pupil_unit05.pdf', 'u05'),
]
for pdf, tag in jobs:
    doc = pymupdf.open(pdf)
    for i, page in enumerate(doc):
        pix = page.get_pixmap(matrix=pymupdf.Matrix(150/72, 150/72))
        pix.save(os.path.join(out, f'{tag}_p{i+1:02d}.png'))
    print(tag, len(doc), 'pages rendered')
    doc.close()
