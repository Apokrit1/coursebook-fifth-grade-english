import shutil
import re

# Copy css
shutil.copyfile('unit1/style.css', 'unit2/style.css')
shutil.copyfile('unit1/style_v2.css', 'unit2/style_v2.css')
shutil.copyfile('unit1/app.js', 'unit2/app.js')
shutil.copyfile('unit1/app_v2.js', 'unit2/app_v2.js')

# Adapt index.html
with open('unit1/index.html', 'r', encoding='utf-8') as f:
    idx = f.read()

idx = re.sub(r'<body data-unit="1">', '<body data-unit="2">', idx)
idx = re.sub(r'<span class="badge unit-badge shell-unit-label">Unit 1</span>', '<span class="badge unit-badge shell-unit-label">Unit 2</span>', idx)
idx = re.sub(r'<span class="badge cefr-badge" id="cefrBadge">CEFR A1-</span>', '<span class="badge cefr-badge" id="cefrBadge">CEFR A1</span>', idx)

with open('unit2/index.html', 'w', encoding='utf-8') as f:
    f.write(idx)

# Adapt v2.html
with open('unit1/v2.html', 'r', encoding='utf-8') as f:
    v2 = f.read()

v2 = re.sub(r'<body data-unit="1" data-workbook="unit1_workbook_data\.js">', '<body data-unit="2" data-workbook="unit2_workbook_data.js">', v2)

with open('unit2/v2.html', 'w', encoding='utf-8') as f:
    f.write(v2)

print("Shell files copied and adapted successfully!")
