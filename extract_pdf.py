import pymupdf
import sys

pdf_path = r"c:\Users\Víctor Angulo\Supervisor-IA-4.0\Bases-PIA2026[F][F].pdf"
output_path = r"c:\Users\Víctor Angulo\Supervisor-IA-4.0\Bases-PIA2026.txt"

doc = pymupdf.open(pdf_path)
text = ""
for page in doc:
    text += page.get_text()

with open(output_path, "w", encoding="utf-8") as f:
    f.write(text)

print(f"Extracted {len(doc)} pages to {output_path}")
