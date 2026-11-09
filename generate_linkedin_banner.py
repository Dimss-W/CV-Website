import os
import math
from PIL import Image, ImageDraw, ImageFont

def draw_rounded_badge(draw, bbox, bg_color, border_color=None, radius=8, width=1):
    x0, y0, x1, y1 = bbox
    # Draw background
    draw.rounded_rectangle([x0, y0, x1, y1], radius=radius, fill=bg_color)
    if border_color:
        draw.rounded_rectangle([x0, y0, x1, y1], radius=radius, outline=border_color, width=width)

def generate_linkedin_banner_tech(out_path):
    w, h = 1584, 396
    
    # 1. Base image with smooth gradient
    base = Image.new('RGBA', (w, h), (11, 15, 25, 255))
    draw = ImageDraw.Draw(base)

    # Gradient background: #080c14 -> #0f172a
    for y in range(h):
        factor = y / h
        r = int(8 + (15 - 8) * factor)
        g = int(12 + (23 - 12) * factor)
        b = int(20 + (42 - 20) * factor)
        draw.line([(0, y), (w, y)], fill=(r, g, b, 255))

    # Ambient radial gradient glows on top right
    glow_overlay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_overlay)
    
    # Cyan / Sky Glow at (1320, 100)
    for rad in range(320, 0, -8):
        alpha = int(28 * (1 - rad / 320))
        glow_draw.ellipse(
            [1320 - rad * 1.5, 90 - rad * 0.9, 1320 + rad * 1.5, 90 + rad * 0.9],
            fill=(2, 132, 199, alpha)
        )
    
    # Subtle Blue Glow at (800, 200)
    for rad in range(250, 0, -10):
        alpha = int(18 * (1 - rad / 250))
        glow_draw.ellipse(
            [800 - rad * 1.6, 200 - rad * 0.8, 800 + rad * 1.6, 200 + rad * 0.8],
            fill=(59, 130, 246, alpha)
        )

    base = Image.alpha_composite(base, glow_overlay)
    draw = ImageDraw.Draw(base)

    # 2. Subtle Tech Grid lines
    grid_color = (255, 255, 255, 9)
    grid_img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    grid_draw = ImageDraw.Draw(grid_img)
    for x in range(0, w, 44):
        grid_draw.line([(x, 0), (x, h)], fill=grid_color, width=1)
    for y in range(0, h, 44):
        grid_draw.line([(0, y), (w, y)], fill=grid_color, width=1)
    base = Image.alpha_composite(base, grid_img)
    draw = ImageDraw.Draw(base)

    # 3. Geometric accent lines & circuits on the right
    draw.line([(1100, 28), (1480, 28)], fill=(14, 165, 233, 60), width=1)
    draw.line([(1480, 28), (1520, 68)], fill=(14, 165, 233, 60), width=1)
    draw.line([(1520, 68), (1520, 200)], fill=(14, 165, 233, 60), width=1)
    draw.ellipse([1478, 26, 1482, 30], fill=(56, 189, 248, 180))
    draw.ellipse([1518, 66, 1522, 70], fill=(56, 189, 248, 180))

    # 4. Safe avatar indicator on the left (subtle aesthetic ring)
    # Avatar center is around x=200, y=280
    draw.ellipse([80, 160, 320, 400], outline=(255, 255, 255, 12), width=1)
    draw.ellipse([60, 140, 340, 420], outline=(2, 132, 199, 18), width=1)

    # 5. Fonts setup
    font_path_bahn = r"C:\Windows\Fonts\bahnschrift.ttf"
    font_path_bold = r"C:\Windows\Fonts\segoeuib.ttf"
    font_path_reg = r"C:\Windows\Fonts\segoeui.ttf"

    font_name = ImageFont.truetype(font_path_bahn, 52)
    font_role = ImageFont.truetype(font_path_bold, 24)
    font_desc = ImageFont.truetype(font_path_reg, 16)
    font_badge = ImageFont.truetype(font_path_bold, 13)
    font_cred = ImageFont.truetype(font_path_bold, 13)
    font_meta = ImageFont.truetype(font_path_reg, 13)

    # 6. Content Placement (Starts at x=410, safe from avatar)
    content_x = 410

    # Top Status Pill & Web Domain
    # Status Pill
    status_text = "OPEN FOR OPPORTUNITIES  |  FULL-TIME & CONTRACT"
    pill_w = 345
    pill_h = 28
    draw_rounded_badge(draw, [content_x, 34, content_x + pill_w, 34 + pill_h], (15, 23, 42, 220), (51, 65, 85, 255), radius=14, width=1)
    # Green pulse dot
    draw.ellipse([content_x + 12, 43, content_x + 22, 53], fill=(52, 211, 153, 255))
    draw.text((content_x + 30, 40), status_text, fill=(203, 213, 225, 255), font=font_badge)

    # Top Right Domain & Email
    web_text = "portofolio-dimas-kappa.vercel.app"
    email_text = "dmswijanarko@gmail.com"
    meta_full = f"{web_text}   •   {email_text}"
    draw.text((1050, 40), meta_full, fill=(148, 163, 184, 255), font=font_meta)

    # Main Name
    draw.text((content_x, 82), "DIMAS WIJANARKO", fill=(255, 255, 255, 255), font=font_name)

    # Headline Title
    title_text = "Full Stack Software Engineer  •  Data Analytics"
    draw.text((content_x + 2, 146), title_text, fill=(56, 189, 248, 255), font=font_role)

    # Value Statement
    desc_text = "Mahasiswa S1 Sistem Informasi UBSI (IPK 3.82) | Laravel, Flutter, MySQL, Power BI & Cloud Database"
    draw.text((content_x + 2, 184), desc_text, fill=(203, 213, 225, 255), font=font_desc)

    # Tech Stack Badges Row
    tech_tags = [
        ("Laravel & PHP", (185, 28, 28, 40), (239, 68, 68, 140)),
        ("Flutter & Dart", (2, 132, 199, 40), (56, 189, 248, 140)),
        ("React & Next.js", (15, 23, 42, 180), (100, 116, 139, 140)),
        ("Microsoft Power BI", (180, 83, 9, 40), (245, 158, 11, 140)),
        ("MySQL & SQL Index", (14, 116, 144, 40), (34, 211, 238, 140)),
        ("RESTful API & MVC", (15, 23, 42, 180), (100, 116, 139, 140)),
    ]

    curr_x = content_x
    badge_y = 224
    badge_h = 30
    for tag_name, bg_c, border_c in tech_tags:
        # Approximate width using length
        tw = int(len(tag_name) * 8.6) + 24
        draw_rounded_badge(draw, [curr_x, badge_y, curr_x + tw, badge_y + badge_h], bg_c, border_c, radius=6, width=1)
        draw.text((curr_x + 12, badge_y + 7), tag_name, fill=(241, 245, 249, 255), font=font_badge)
        curr_x += tw + 10

    # Key Credentials Row (Bottom Highlight Cards)
    cred_y = 278
    cred_h = 76
    
    # Cred 1: BNSP DBA
    c1_w = 340
    draw_rounded_badge(draw, [content_x, cred_y, content_x + c1_w, cred_y + cred_h], (15, 23, 42, 230), (56, 189, 248, 90), radius=10, width=1)
    # Accent indicator bar
    draw.rounded_rectangle([content_x + 12, cred_y + 14, content_x + 16, cred_y + cred_h - 14], radius=2, fill=(56, 189, 248, 255))
    draw.text((content_x + 28, cred_y + 16), "BNSP Database Administrator", fill=(255, 255, 255, 255), font=font_cred)
    draw.text((content_x + 28, cred_y + 40), "Sertifikasi Resmi Kompeten Nasional (SQL & ERD)", fill=(148, 163, 184, 255), font=font_meta)

    # Cred 2: Juara 1 IT Bootcamp
    c2_x = content_x + c1_w + 14
    c2_w = 360
    draw_rounded_badge(draw, [c2_x, cred_y, c2_x + c2_w, cred_y + cred_h], (15, 23, 42, 230), (245, 158, 11, 90), radius=10, width=1)
    # Accent indicator bar
    draw.rounded_rectangle([c2_x + 12, cred_y + 14, c2_x + 16, cred_y + cred_h - 14], radius=2, fill=(245, 158, 11, 255))
    draw.text((c2_x + 28, cred_y + 16), "Juara 1 IT Bootcamp Software Dev", fill=(255, 255, 255, 255), font=font_cred)
    draw.text((c2_x + 28, cred_y + 40), "Desainer Grafis & UI Smart Tahfidz School", fill=(148, 163, 184, 255), font=font_meta)

    # Cred 3: PGNCOM & Leadership
    c3_x = c2_x + c2_w + 14
    c3_w = 350
    draw_rounded_badge(draw, [c3_x, cred_y, c3_x + c3_w, cred_y + cred_h], (15, 23, 42, 230), (52, 211, 153, 90), radius=10, width=1)
    # Accent indicator bar
    draw.rounded_rectangle([c3_x + 12, cred_y + 14, c3_x + 16, cred_y + cred_h - 14], radius=2, fill=(52, 211, 153, 255))
    draw.text((c3_x + 28, cred_y + 16), "PGNCOM Intern & Ketua PRISMA", fill=(255, 255, 255, 255), font=font_cred)
    draw.text((c3_x + 28, cred_y + 40), "Sistem Operasional Korporat & Kepemimpinan", fill=(148, 163, 184, 255), font=font_meta)

    # Save image
    rgb_final = base.convert('RGB')
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    rgb_final.save(out_path, quality=98)
    print(f"Tech banner generated successfully at: {out_path}")

def generate_linkedin_banner_executive(out_path):
    w, h = 1584, 396
    
    base = Image.new('RGBA', (w, h), (10, 15, 26, 255))
    draw = ImageDraw.Draw(base)

    # Deep premium background
    for y in range(h):
        factor = y / h
        r = int(10 + (16 - 10) * factor)
        g = int(14 + (24 - 14) * factor)
        b = int(23 + (40 - 23) * factor)
        draw.line([(0, y), (w, y)], fill=(r, g, b, 255))

    # Top accent bar (Sleek Blue Gradient)
    for x in range(w):
        fx = x / w
        r = int(2 + (56 - 2) * fx)
        g = int(132 + (189 - 132) * fx)
        b = int(199 + (248 - 199) * fx)
        draw.line([(x, 0), (x, 3)], fill=(r, g, b, 255))

    # Subtle lighting beam
    glow = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow)
    for rad in range(280, 0, -8):
        alpha = int(20 * (1 - rad / 280))
        g_draw.ellipse([1250 - rad * 1.8, 160 - rad * 0.7, 1250 + rad * 1.8, 160 + rad * 0.7], fill=(2, 132, 199, alpha))
    base = Image.alpha_composite(base, glow)
    draw = ImageDraw.Draw(base)

    # Fonts setup
    font_path_bahn = r"C:\Windows\Fonts\bahnschrift.ttf"
    font_path_bold = r"C:\Windows\Fonts\segoeuib.ttf"
    font_path_reg = r"C:\Windows\Fonts\segoeui.ttf"

    font_name = ImageFont.truetype(font_path_bold, 54)
    font_role = ImageFont.truetype(font_path_bold, 24)
    font_desc = ImageFont.truetype(font_path_reg, 16)
    font_badge = ImageFont.truetype(font_path_bold, 13)
    font_cred = ImageFont.truetype(font_path_bold, 14)
    font_meta = ImageFont.truetype(font_path_reg, 13)

    content_x = 410

    # Top Sub-headline
    draw.text((content_x, 42), "SOFTWARE ENGINEERING  •  DATA & CLOUD SYSTEMS", fill=(56, 189, 248, 255), font=font_badge)

    # Top right domain
    draw.text((1120, 42), "portofolio-dimas-kappa.vercel.app", fill=(148, 163, 184, 255), font=font_meta)

    # Name
    draw.text((content_x, 76), "DIMAS WIJANARKO", fill=(255, 255, 255, 255), font=font_name)

    # Title
    draw.text((content_x + 2, 144), "Full Stack Web & Mobile Software Engineer", fill=(241, 245, 249, 255), font=font_role)

    # Narrative
    narrative = "Mahasiswa S1 Sistem Informasi UBSI (IPK 3.82) | Ex-Web & Data Intern PGNCOM | BNSP Database Administrator"
    draw.text((content_x + 2, 184), narrative, fill=(148, 163, 184, 255), font=font_desc)

    # Dividing thin line
    draw.line([(content_x, 222), (w - 70, 222)], fill=(51, 65, 85, 120), width=1)

    # Bottom 3 Executive Pillars
    pillars = [
        ("Keahlian Utama", "Laravel, Flutter, MySQL, React, REST API", (56, 189, 248, 255)),
        ("Kualifikasi Resmi", "Database Administrator & Analis Program BNSP", (245, 158, 11, 255)),
        ("Prestasi & Peran", "Juara 1 IT Bootcamp UBSI  •  Ketua PRISMA", (52, 211, 153, 255)),
    ]

    col_w = 345
    for i, (col_title, col_desc, col_acc) in enumerate(pillars):
        px = content_x + i * (col_w + 25)
        py = 246
        # Container
        draw_rounded_badge(draw, [px, py, px + col_w, py + 86], (15, 23, 42, 200), (30, 41, 59, 255), radius=8, width=1)
        # Accent dot
        draw.ellipse([px + 16, py + 18, px + 24, py + 26], fill=col_acc)
        # Title
        draw.text((px + 32, py + 14), col_title.upper(), fill=col_acc, font=font_badge)
        # Description
        draw.text((px + 16, py + 42), col_desc, fill=(241, 245, 249, 255), font=font_badge)

    rgb_final = base.convert('RGB')
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    rgb_final.save(out_path, quality=98)
    print(f"Executive banner generated successfully at: {out_path}")

if __name__ == "__main__":
    web_pub = r"C:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\public"
    
    b1_path = os.path.join(web_pub, "linkedin_banner_cyan_tech.png")
    b2_path = os.path.join(web_pub, "linkedin_banner_executive.png")
    
    generate_linkedin_banner_tech(b1_path)
    generate_linkedin_banner_executive(b2_path)

