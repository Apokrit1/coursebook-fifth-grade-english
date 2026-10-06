import pdfplumber, io
out = io.open('check_plumb_out.txt', 'w', encoding='utf-8')
jobs = [
    ('split/unit03/pupil_unit03.pdf', [2, 4]),
    ('split/unit04/pupil_unit04.pdf', [2, 4, 8]),
    ('split/unit05/pupil_unit05.pdf', [6]),
]
for pdf, pages in jobs:
    print('=' * 20, pdf, file=out)
    with pdfplumber.open(pdf) as doc:
        for p in pages:
            print(f'--- PDF page index {p} (file page {p+1}) ---', file=out)
            try:
                txt = doc.pages[p].extract_text(x_tolerance=2, y_tolerance=2) or ''
            except Exception as e:
                txt = f'ERROR {e}'
            print(txt[:2500], file=out)
            print(file=out)
