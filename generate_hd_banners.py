import os
import math
from PIL import Image, ImageDraw, ImageFont

def create_hd_banner_1(out_path_2x, out_path_1x):
    # 2x Retina resolution: 3168 x 792 px
    w, h = 3168, 792
    
    # Base background: deep slate #080c14 -> #0f172a
    base = Image.new('RGBA', (w, h), (8, 12, 20, 255))
    draw = ImageDraw.Draw(base)

    for y in range(h):
        fy = y / h
        r = int(8 + (15 - 8) * fy)
        g = int(12 + (23 - 12) * fy)
        b = int(20 + (42 - 20) * fy)
        draw.line([(0, y), (w, y)], fill=(r, g, b, 255))

    # Ornamen 1: Ambient soft blue glow di kanan atas (halus, tidak neon)
    glow = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow)
    
    center_gx, center_gy = 2500, 180
    for rad in range(650, 0, -15):
        alpha = int(22 * (1 - rad / 650))
        g_draw.ellipse(
            [center_gx - rad * 1.6, center_gy - rad * 0.9, center_gx + rad * 1.6, center_gy + rad * 0.9],
            fill=(3, 105, 161, alpha)
        )
    
    # Secondary subtle cyan glow di pojok kanan bawah
    for rad in range(400, 0, -15):
        alpha = int(14 * (1 - rad / 400))
        g_draw.ellipse(
            [2800 - rad * 1.3, 600 - rad * 0.8, 2800 + rad * 1.3, 600 + rad * 0.8],
            fill=(14, 165, 233, alpha)
        )

    base = Image.alpha_composite(base, glow)

    # Ornamen 2: Dot matrix modern (titik-titik halus khas Linear/Vercel)
    dots = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    d_draw = ImageDraw.Draw(dots)
    
    # Gambar dot grid halus dari x=800 ke x=3168
    dot_spacing = 48
    for x in range(850, w - 80, dot_spacing):
        for y in range(60, h - 60, dot_spacing):
            # Fade out dots towards left and bottom
            fade_x = min(1.0, max(0.0, (x - 850) / 700))
            dot_alpha = int(28 * fade_x)
            if dot_alpha > 0:
                d_draw.ellipse([x - 1.5, y - 1.5, x + 1.5, y + 1.5], fill=(148, 163, 184, dot_alpha))

    base = Image.alpha_composite(base, dots)
    draw = ImageDraw.Draw(base)

    # Ornamen 3: Garis aksen geometris sangat halus & rapi di sisi kanan
    accent_lines = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    al_draw = ImageDraw.Draw(accent_lines)
    
    # Subtle elegant border frame line on top
    al_draw.line([(0, 0), (w, 0)], fill=(56, 189, 248, 140), width=3)
    
    # Delicate tech polygon lines di sudut kanan
    al_draw.line([(2400, 100), (2800, 100)], fill=(56, 189, 248, 35), width=2)
    al_draw.line([(2800, 100), (2920, 220)], fill=(56, 189, 248, 35), width=2)
    al_draw.line([(2920, 220), (2920, 480)], fill=(56, 189, 248, 35), width=2)
    al_draw.line([(2920, 480), (2800, 600)], fill=(56, 189, 248, 35), width=2)
    al_draw.line([(2800, 600), (2300, 600)], fill=(56, 189, 248, 35), width=2)

    # Small node circles
    al_draw.ellipse([2796, 96, 2804, 104], fill=(56, 189, 248, 90))
    al_draw.ellipse([2916, 216, 2924, 224], fill=(56, 189, 248, 90))
    al_draw.ellipse([2916, 476, 2924, 484], fill=(56, 189, 248, 90))
    al_draw.ellipse([2796, 596, 2804, 604], fill=(56, 189, 248, 90))

    base = Image.alpha_composite(base, accent_lines)
    draw = ImageDraw.Draw(base)

    # Fonts
    font_bold = r'C:\Windows\Fonts\segoeuib.ttf'
    font_reg = r'C:\Windows\Fonts\segoeui.ttf'

    f_name = ImageFont.truetype(font_bold, 78)
    f_title = ImageFont.truetype(font_reg, 38)
    f_sub = ImageFont.truetype(font_reg, 29)
    f_link = ImageFont.truetype(font_reg, 25)

    # Posisi teks (x=900 di 2x setara dengan x=450 di 1x, sangat aman dari lingkaran foto profil)
    tx = 940

    # 1. Nama Lengkap
    draw.text((tx, 205), "Dimas Wijanarko", fill=(255, 255, 255, 255), font=f_name)

    # 2. Peran / Keahlian
    draw.text((tx, 310), "Web & Mobile Developer  •  Data Analytics", fill=(56, 189, 248, 255), font=f_title)

    # 3. Pembatas garis halus di bawah title
    draw.line([(tx, 385), (tx + 720, 385)], fill=(51, 65, 85, 160), width=2)

    # 4. Tech Stack Ringkas & Elegan
    draw.text((tx, 420), "Laravel   •   Flutter   •   MySQL   •   Microsoft Power BI", fill=(203, 213, 225, 255), font=f_sub)

    # 5. Link Portofolio & Status
    draw.text((tx, 485), "portofolio-dimas-kappa.vercel.app   •   Universitas Bina Sarana Informatika", fill=(148, 163, 184, 255), font=f_link)

    # Convert to RGB & Save 2x Ultra HD
    final_2x = base.convert('RGB')
    os.makedirs(os.path.dirname(out_path_2x), exist_ok=True)
    final_2x.save(out_path_2x, quality=100)
    print(f"2x Ultra HD Banner saved: {out_path_2x} (3168x792)")

    # Save 1x HD with high-quality Lanczos downsampling
    final_1x = final_2x.resize((1584, 396), Image.Resampling.LANCZOS)
    final_1x.save(out_path_1x, quality=100)
    print(f"1x Crisp HD Banner saved: {out_path_1x} (1584x396)")


def create_hd_banner_2(out_path_2x, out_path_1x):
    # Option 2: Minimalist Dark Wave & Architectural Lines (Super Classy)
    w, h = 3168, 792
    
    base = Image.new('RGBA', (w, h), (13, 17, 23, 255))
    draw = ImageDraw.Draw(base)

    for y in range(h):
        fy = y / h
        r = int(12 + (17 - 12) * fy)
        g = int(16 + (24 - 16) * fy)
        b = int(24 + (39 - 24) * fy)
        draw.line([(0, y), (w, y)], fill=(r, g, b, 255))

    # Ornamen gelombang kurva halus (subtle flowing lines)
    wave_img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    w_draw = ImageDraw.Draw(wave_img)

    for offset in range(-120, 200, 35):
        pts = []
        for x in range(1200, w + 40, 40):
            # Smooth sine curve
            angle = (x - 1200) / 450.0
            y = int(396 + offset + math.sin(angle) * 90 + math.cos(angle * 0.5) * 50)
            pts.append((x, y))
        
        line_alpha = int(18 + 14 * math.sin((offset + 120) / 60.0))
        for i in range(len(pts) - 1):
            w_draw.line([pts[i], pts[i+1]], fill=(56, 189, 248, max(6, line_alpha)), width=2)

    # Soft ambient glow
    for rad in range(500, 0, -20):
        alpha = int(16 * (1 - rad / 500))
        w_draw.ellipse(
            [2600 - rad * 1.5, 300 - rad * 0.8, 2600 + rad * 1.5, 300 + rad * 0.8],
            fill=(30, 64, 175, alpha)
        )

    base = Image.alpha_composite(base, wave_img)
    draw = ImageDraw.Draw(base)

    # Fonts
    font_bold = r'C:\Windows\Fonts\segoeuib.ttf'
    font_reg = r'C:\Windows\Fonts\segoeui.ttf'

    f_name = ImageFont.truetype(font_bold, 76)
    f_title = ImageFont.truetype(font_reg, 36)
    f_sub = ImageFont.truetype(font_reg, 28)
    f_link = ImageFont.truetype(font_reg, 24)

    tx = 940

    # 1. Nama Lengkap
    draw.text((tx, 215), "Dimas Wijanarko", fill=(255, 255, 255, 255), font=f_name)

    # 2. Subtitle
    draw.text((tx, 315), "Software Engineer  •  Web & Mobile", fill=(148, 163, 184, 255), font=f_title)

    # 3. Subtle pill background for tech stack
    pill_x0 = tx
    pill_y0 = 385
    pill_x1 = tx + 780
    pill_y1 = 445
    draw.rounded_rectangle([pill_x0, pill_y0, pill_x1, pill_y1], radius=10, fill=(30, 41, 59, 140), outline=(51, 65, 85, 180), width=2)
    draw.text((tx + 24, 400), "Laravel   •   Flutter   •   MySQL   •   Power BI", fill=(241, 245, 249, 255), font=f_sub)

    # 4. University & Domain
    draw.text((tx, 480), "Mahasiswa S1 Sistem Informasi UBSI   |   portofolio-dimas-kappa.vercel.app", fill=(100, 116, 139, 255), font=f_link)

    final_2x = base.convert('RGB')
    final_2x.save(out_path_2x, quality=100)
    print(f"2x Ultra HD Wave Banner saved: {out_path_2x}")

    final_1x = final_2x.resize((1584, 396), Image.Resampling.LANCZOS)
    final_1x.save(out_path_1x, quality=100)
    print(f"1x Crisp HD Wave Banner saved: {out_path_1x}")

if __name__ == "__main__":
    desktop = r"C:\Users\Dimas Wijanarko\Desktop"
    
    b1_2x = os.path.join(desktop, "LinkedIn_Banner_HD_1_Ultra.png")
    b1_1x = os.path.join(desktop, "LinkedIn_Banner_HD_1.png")
    
    b2_2x = os.path.join(desktop, "LinkedIn_Banner_HD_2_Ultra.png")
    b2_1x = os.path.join(desktop, "LinkedIn_Banner_HD_2.png")
    
    create_hd_banner_1(b1_2x, b1_1x)
    create_hd_banner_2(b2_2x, b2_1x)

