from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "cover.png"
W, H = 1200, 630
BG, PANEL, LINE = "#071b21", "#0d2b33", "#28545d"
WHITE, MUTED, TEAL, AMBER = "#eef7f5", "#a9c7c4", "#4ad8c6", "#e9aa65"
font_dir = Path("C:/Windows/Fonts")
regular = font_dir / "segoeui.ttf"
bold = font_dir / "segoeuib.ttf"

def f(size, heavy=False):
    return ImageFont.truetype(str(bold if heavy else regular), size)

image = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(image)
d.rectangle((0, 0, 14, H), fill=TEAL)
d.text((64, 49), "RADAR CMED", font=f(27, True), fill=TEAL)
d.text((64, 130), "Antes de comparar", font=f(58, True), fill=WHITE)
d.text((64, 204), "preços, identifique", font=f(58, True), fill=WHITE)
d.text((64, 278), "a apresentação.", font=f(58, True), fill=WHITE)
d.text((66, 382), "Conferência de cotação e contexto estatístico", font=f(27), fill=MUTED)
d.text((66, 426), "com dados públicos da Anvisa/CMED.", font=f(27), fill=MUTED)
d.line((64, 511, 1136, 511), fill=LINE, width=2)
labels = ["01  IDENTIFICAR", "02  CONFERIR", "03  CONTEXTUALIZAR"]
for i, label in enumerate(labels):
    x = 64 + i * 366
    d.rounded_rectangle((x, 536, x + 334, 588), radius=10, fill=PANEL, outline=LINE, width=2)
    d.text((x + 19, 548), label, font=f(20, True), fill=AMBER if i == 1 else TEAL)
OUT.parent.mkdir(parents=True, exist_ok=True)
image.save(OUT, optimize=True)
print(OUT)
