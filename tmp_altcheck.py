import re
for f in ['split/front_matter/workbook_front_matter.pdf','split/unit01/workbook_unit01.pdf','split/appendix/workbook_back_matter.pdf']:
    dd=open(f,'rb').read()
    print(f, len(re.findall(rb'/Alt', dd)))
    idxs=[m.start() for m in re.finditer(rb'/Alt', dd)][:4]
    for i in idxs:
        print(repr(dd[max(0,i-60):i+100])[:220])
    print('======')
