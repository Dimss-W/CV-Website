import os
import math
from PIL import Image, ImageDraw, ImageFont

FONT_DIR = r"C:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\fonts"
FONT_BLACK = os.path.join(FONT_DIR, "Montserrat-Black.ttf")
FONT_XBOLD = os.path.join(FONT_DIR, "Montserrat-ExtraBold.ttf")
FONT_BOLD  = os.path.join(FONT_DIR, "Montserrat-Bold.ttf")
FONT_SBOLD = os.path.join(FONT_DIR, "Montserrat-SemiBold.ttf")
FONT_MED   = os.path.join(FONT_DIR, "Montserrat-Medium.ttf")
FONT_REG   = os.path.join(FONT_DIR, "Montserrat-Regular.ttf")

def draw_vector_globe(draw, x, y, size=32, color=(2, 132, 199, 255)):
    r = size // 2
    cx, cy = x + r, y + r
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=color, width=3)
    draw.ellipse([cx - r//2, cy - r, cx + r//2, cy + r], outline=color, width=3)
    draw.line([(cx - r, cy), (cx + r, cy)], fill=color, width=3)

def draw_vector_mail(draw, x, y, size=32, color=(51, 65, 85, 255)):
    w, h = size + 6, size - 2
    draw.rounded_rectangle([x, y, x + w, y + h], radius=4, outline=color, width=3)
    draw.line([(x + 2, y + 2), (x + w//2, y + h//2)], fill=color, width=3)
    draw.line([(x + w - 2, y + 2), (x + w//2, y + h//2)], fill=color, width=3)

def draw_vector_pin(draw, x, y, size=30, color=(100, 116, 139, 255)):
    r = size // 2
    cx, cy = x + r, y + r - 4
    draw.ellipse([cx - r + 2, cy - r + 2, cx + r - 2, cy + r - 2], outline=color, width=3)
    draw.ellipse([cx - 3, cy - 3, cx + 3, cy + 3], fill=color)
    draw.polygon([(cx - r + 4, cy + 3), (cx + r - 4, cy + 3), (cx, cy + r + 7)], fill=color)


# =========================================================================
# BANNER 1: DEV WORKSPACE & FLOATING CODE CARD (VIBRANT & ENGAGING)
# =========================================================================
def create_banner_1_dev_code(out_path_fhd, out_path_1x):
    w, h = 3168, 792
    
    # 1. Base vibrant light background: soft ice blue to bright sky tint
    base = Image.new('RGBA', (w, h), (240, 249, 255, 255))
    draw = ImageDraw.Draw(base)

    for x in range(w):
        fx = x / w
        r = int(238 - 14 * fx + 16 * math.sin(fx * math.pi))
        g = int(246 - 8 * fx + 10 * math.sin(fx * math.pi))
        b = int(255 - 0 * fx)
        draw.line([(x, 0), (x, h)], fill=(r, g, b, 255))

    # 2. Glowing ambient mesh orbs in the background
    mesh = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    m_draw = ImageDraw.Draw(mesh)

    # Vibrant cyan/sky orb at right
    cx1, cy1 = 2500, 220
    for rad in range(750, 0, -25):
        alpha = int(55 * (1 - rad / 750))
        m_draw.ellipse([cx1 - rad * 1.5, cy1 - rad * 0.9, cx1 + rad * 1.5, cy1 + rad * 0.9], fill=(186, 230, 253, alpha))

    # Soft royal blue orb at bottom right
    cx2, cy2 = 2900, 650
    for rad in range(600, 0, -20):
        alpha = int(45 * (1 - rad / 600))
        m_draw.ellipse([cx2 - rad * 1.4, cy2 - rad * 0.8, cx2 + rad * 1.4, cy2 + rad * 0.8], fill=(219, 234, 254, alpha))

    # Subtle soft emerald/cyan hint at bottom-left
    cx3, cy3 = 1400, 750
    for rad in range(450, 0, -20):
        alpha = int(35 * (1 - rad / 450))
        m_draw.ellipse([cx3 - rad * 1.4, cy3 - rad * 0.7, cx3 + rad * 1.4, cy3 + rad * 0.7], fill=(204, 251, 241, alpha))

    base = Image.alpha_composite(base, mesh)

    # 3. Floating Modern Code/Terminal Window on the far right (x = 2160 to 3080)
    # Directly symbolizes Dimas's software engineering & Information Systems identity
    code_win = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    cw_draw = ImageDraw.Draw(code_win)

    win_box = [2180, 110, 3080, 680]
    # Drop shadow
    for off in range(16, 0, -2):
        cw_draw.rounded_rectangle([win_box[0] - off, win_box[1] - off, win_box[2] + off, win_box[3] + off], radius=24, fill=(15, 23, 42, 4))
    
    # Window card body (clean crisp white with delicate border)
    cw_draw.rounded_rectangle(win_box, radius=20, fill=(255, 255, 255, 245), outline=(203, 213, 225, 255), width=2)
    
    # Window header bar
    cw_draw.rounded_rectangle([win_box[0], win_box[1], win_box[2], win_box[1] + 52], radius=20, fill=(241, 245, 249, 255))
    cw_draw.rectangle([win_box[0], win_box[1] + 30, win_box[2], win_box[1] + 52], fill=(241, 245, 249, 255))
    cw_draw.line([(win_box[0], win_box[1] + 52), (win_box[2], win_box[1] + 52)], fill=(226, 232, 240, 255), width=2)

    # 3 Mac-style window dots (red, yellow, green)
    cw_draw.ellipse([win_box[0] + 24, win_box[1] + 20, win_box[0] + 36, win_box[1] + 32], fill=(239, 68, 68, 255))
    cw_draw.ellipse([win_box[0] + 46, win_box[1] + 20, win_box[0] + 58, win_box[1] + 32], fill=(234, 179, 8, 255))
    cw_draw.ellipse([win_box[0] + 68, win_box[1] + 20, win_box[0] + 80, win_box[1] + 32], fill=(34, 197, 94, 255))

    # Window title tab
    f_tab = ImageFont.truetype(FONT_MED, 20)
    cw_draw.text((win_box[0] + 110, win_box[1] + 15), "developer_profile.ts", fill=(100, 116, 139, 255), font=f_tab)

    # Code lines inside the card (representing Dimas's real stack & identity)
    f_code_bold = ImageFont.truetype(FONT_BOLD, 22)
    f_code_reg  = ImageFont.truetype(FONT_MED, 22)

    code_lines = [
        [("const ", (225, 29, 72)), ("developer ", (15, 23, 42)), ("= {", (100, 116, 139))],
        [("  name: ", (100, 116, 139)), ("'Dimas Wijanarko'", (2, 132, 199)), (",", (100, 116, 139))],
        [("  discipline: ", (100, 116, 139)), ("'Information Systems'", (16, 185, 129)), (",", (100, 116, 139))],
        [("  specialty: ", (100, 116, 139)), ("['Web', 'Mobile', 'Data']", (124, 58, 237)), (",", (100, 116, 139))],
        [("  frameworks: ", (100, 116, 139)), ("['Laravel', 'Flutter', 'React']", (217, 119, 6)), (",", (100, 116, 139))],
        [("  database: ", (100, 116, 139)), ("'Certified Administrator (BNSP)'", (2, 132, 199)), (",", (100, 116, 139))],
        [("  mission: ", (100, 116, 139)), ("'Building scalable digital solutions'", (71, 85, 105)), (",", (100, 116, 139))],
        [("};", (100, 116, 139))],
    ]

    ly = win_box[1] + 85
    for line in code_lines:
        lx = win_box[0] + 36
        for chunk, col in line:
            cw_draw.text((lx, ly), chunk, fill=col, font=f_code_reg)
            bbox = f_code_reg.getbbox(chunk)
            lx += (bbox[2] - bbox[0])
        ly += 54

    base = Image.alpha_composite(base, code_win)
    draw = ImageDraw.Draw(base)

    # 4. Content Typography in MONTSERRAT
    f_name = ImageFont.truetype(FONT_XBOLD, 108)
    f_prodi = ImageFont.truetype(FONT_SBOLD, 46)
    f_contact = ImageFont.truetype(FONT_SBOLD, 32)

    # Top accent bar
    draw.line([(0, 0), (w, 0)], fill=(2, 132, 199, 255), width=8)
    draw.line([(0, 8), (w, 8)], fill=(56, 189, 248, 180), width=4)

    # Safe X zone starting at x = 980 (safe from profile picture)
    tx = 980

    # 1. NAMA LENGKAP (MONTSERRAT EXTRA-BOLD)
    draw.text((tx, 220), "DIMAS WIJANARKO", fill=(15, 23, 42, 255), font=f_name)

    # 2. PRODI (ENGLISH: Information Systems) in MONTSERRAT SEMI-BOLD
    draw.text((tx, 375), "Information Systems", fill=(2, 132, 199, 255), font=f_prodi)

    # Thin Divider Line
    draw.line([(tx, 465), (2080, 465)], fill=(203, 213, 225, 255), width=3)

    # 3. KONTAK LENGKAP (IN ENGLISH, MONTSERRAT)
    cy = 530
    draw_vector_globe(draw, tx, cy + 4, size=32, color=(2, 132, 199, 255))
    draw.text((tx + 46, cy), "dimaswijanarko.me", fill=(2, 132, 199, 255), font=f_contact)

    draw.ellipse([tx + 460, cy + 16, tx + 468, cy + 24], fill=(148, 163, 184, 255))

    draw_vector_mail(draw, tx + 500, cy + 4, size=32, color=(51, 65, 85, 255))
    draw.text((tx + 550, cy), "dmswijanarko@gmail.com", fill=(51, 65, 85, 255), font=f_contact)

    # Save
    base.save(out_path_fhd, 'PNG', quality=100)
    print(f"FHD Banner 1 saved at: {out_path_fhd} ({w}x{h})")

    base_1x = base.resize((1584, 396), Image.Resampling.LANCZOS)
    base_1x.save(out_path_1x, 'PNG', quality=100)
    print(f"1x Banner 1 saved at: {out_path_1x} (1584x396)")


# =========================================================================
# BANNER 2: GEOSPATIAL & TELEMETRY NETWORK NODES (CERAH & MENARIK)
# =========================================================================
def create_banner_2_network(out_path_fhd, out_path_1x):
    """
    Varian 2: Geospatial & Telemetry Network
    Terinspirasi dari keahlian Dimas di sistem monitoring kendaraan (Fleedy) & basis data relasional.
    Network nodes, data grid lines, cerah, modern, menggunakan font Montserrat.
    """
    w, h = 3168, 792
    
    # Base: Off-white crisp to sky tint
    base = Image.new('RGBA', (w, h), (248, 250, 252, 255))
    draw = ImageDraw.Draw(base)

    for y in range(h):
        fy = y / h
        r = int(245 + (235 - 245) * fy)
        g = int(249 + (245 - 249) * fy)
        b = int(255 + (255 - 255) * fy)
        draw.line([(0, y), (w, y)], fill=(r, g, b, 255))

    # Blue vertical bar on left edge
    draw.rectangle([0, 0, 32, h], fill=(2, 132, 199, 255))
    draw.rectangle([32, 0, 44, h], fill=(56, 189, 248, 255))

    # Network topology nodes and telemetry curves in background (symbolizing GIS & Data)
    net = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    n_draw = ImageDraw.Draw(net)

    # Glowing radial hub
    cx, cy = 2650, 380
    for rad in range(650, 0, -25):
        alpha = int(45 * (1 - rad / 650))
        n_draw.ellipse([cx - rad * 1.5, cy - rad * 0.9, cx + rad * 1.5, cy + rad * 0.9], fill=(186, 230, 253, alpha))

    # Nodes constellation
    nodes = [
        (2250, 160), (2500, 110), (2750, 180), (3000, 140),
        (2380, 320), (2650, 290), (2920, 350), (3080, 270),
        (2250, 500), (2520, 470), (2780, 520), (3020, 480),
        (2400, 660), (2680, 640), (2950, 680),
    ]

    # Draw connection lines between nearby nodes
    for i in range(len(nodes)):
        for j in range(i + 1, len(nodes)):
            x1, y1 = nodes[i]
            x2, y2 = nodes[j]
            dist = math.hypot(x2 - x1, y2 - y1)
            if dist < 320:
                line_alpha = int(90 * (1 - dist / 320))
                n_draw.line([(x1, y1), (x2, y2)], fill=(2, 132, 199, line_alpha), width=2)

    # Draw nodes circles with glowing aura
    for nx, ny in nodes:
        n_draw.ellipse([nx - 14, ny - 14, nx + 14, ny + 14], fill=(186, 230, 253, 140))
        n_draw.ellipse([nx - 7, ny - 7, nx + 7, ny + 7], fill=(2, 132, 199, 255))
        n_draw.ellipse([nx - 2, ny - 2, nx + 2, ny + 2], fill=(255, 255, 255, 255))

    # Floating abstract code badge watermark
    f_wm = ImageFont.truetype(FONT_BOLD, 72)
    n_draw.text((2280, 660), "{ SQL • GIS • MVC }", fill=(2, 132, 199, 35), font=f_wm)

    base = Image.alpha_composite(base, net)
    draw = ImageDraw.Draw(base)

    # Typography in Montserrat
    f_name = ImageFont.truetype(FONT_XBOLD, 108)
    f_prodi = ImageFont.truetype(FONT_SBOLD, 46)
    f_contact = ImageFont.truetype(FONT_SBOLD, 32)

    tx = 980

    # 1. NAMA LENGKAP
    draw.text((tx, 220), "DIMAS WIJANARKO", fill=(15, 23, 42, 255), font=f_name)

    # 2. PRODI (ENGLISH: Information Systems)
    draw.text((tx, 375), "Information Systems", fill=(30, 58, 138, 255), font=f_prodi)

    # Divider Line
    draw.line([(tx, 465), (2200, 465)], fill=(203, 213, 225, 255), width=3)

    # 3. KONTAK (MONTSERRAT)
    cy = 530
    draw_vector_globe(draw, tx, cy + 4, size=32, color=(2, 132, 199, 255))
    draw.text((tx + 46, cy), "dimaswijanarko.me", fill=(2, 132, 199, 255), font=f_contact)

    draw.ellipse([tx + 460, cy + 16, tx + 468, cy + 24], fill=(148, 163, 184, 255))

    draw_vector_mail(draw, tx + 500, cy + 4, size=32, color=(51, 65, 85, 255))
    draw.text((tx + 550, cy), "dmswijanarko@gmail.com", fill=(51, 65, 85, 255), font=f_contact)

    draw.ellipse([tx + 1120, cy + 16, tx + 1128, cy + 24], fill=(148, 163, 184, 255))

    draw_vector_pin(draw, tx + 1160, cy + 4, size=30, color=(100, 116, 139, 255))
    draw.text((tx + 1205, cy), "Jakarta, Indonesia", fill=(71, 85, 105, 255), font=f_contact)

    # Save
    base.save(out_path_fhd, 'PNG', quality=100)
    print(f"FHD Banner 2 saved at: {out_path_fhd} ({w}x{h})")

    base_1x = base.resize((1584, 396), Image.Resampling.LANCZOS)
    base_1x.save(out_path_1x, 'PNG', quality=100)
    print(f"1x Banner 2 saved at: {out_path_1x} (1584x396)")


# =========================================================================
# BANNER 3: VIBRANT AURORA GRADIENT & CODE SYNTAX ACCENTS
# =========================================================================
def create_banner_3_aurora_syntax(out_path_fhd, out_path_1x):
    """
    Varian 3: Vibrant Aurora Gradient with Abstract Code Brackets & Tech Glow
    Sangat cerah, memikat, bernapas, berkelas internasional.
    """
    w, h = 3168, 792
    
    # 1. Base luminous gradient
    base = Image.new('RGBA', (w, h), (255, 255, 255, 255))
    draw = ImageDraw.Draw(base)

    for x in range(w):
        fx = x / w
        r = int(240 - 15 * fx + 15 * math.sin(fx * math.pi))
        g = int(249 - 8 * fx + 6 * math.sin(fx * math.pi))
        b = int(255)
        draw.line([(x, 0), (x, h)], fill=(r, g, b, 255))

    # Mesh gradients
    mesh = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    m_draw = ImageDraw.Draw(mesh)

    # Big vibrant sky blue wave
    for rad in range(800, 0, -25):
        alpha = int(50 * (1 - rad / 800))
        m_draw.ellipse([2700 - rad * 1.5, 180 - rad * 0.9, 2700 + rad * 1.5, 180 + rad * 0.9], fill=(186, 230, 253, alpha))

    # Teal glow at bottom right
    for rad in range(600, 0, -20):
        alpha = int(40 * (1 - rad / 600))
        m_draw.ellipse([2850 - rad * 1.4, 680 - rad * 0.8, 2850 + rad * 1.4, 680 + rad * 0.8], fill=(204, 251, 241, alpha))

    # Indigo accent at center
    for rad in range(500, 0, -20):
        alpha = int(30 * (1 - rad / 500))
        m_draw.ellipse([1800 - rad * 1.3, 720 - rad * 0.7, 1800 + rad * 1.3, 720 + rad * 0.7], fill=(224, 231, 255, alpha))

    # Elegant large watermark symbols related to Dimas (Code & Data)
    f_wm_large = ImageFont.truetype(FONT_BLACK, 190)
    m_draw.text((2300, 160), "</>", fill=(2, 132, 199, 28), font=f_wm_large)
    
    f_wm_curly = ImageFont.truetype(FONT_BOLD, 170)
    m_draw.text((2760, 360), "{ ; }", fill=(14, 165, 233, 24), font=f_wm_curly)

    base = Image.alpha_composite(base, mesh)
    draw = ImageDraw.Draw(base)

    # Top accent line
    draw.line([(0, 0), (w, 0)], fill=(2, 132, 199, 255), width=8)
    draw.line([(0, 8), (w, 8)], fill=(56, 189, 248, 180), width=4)

    # Typography
    f_name = ImageFont.truetype(FONT_BLACK, 110)
    f_prodi = ImageFont.truetype(FONT_SBOLD, 46)
    f_contact = ImageFont.truetype(FONT_SBOLD, 32)

    tx = 980

    # 1. NAMA LENGKAP (MONTSERRAT BLACK)
    draw.text((tx, 220), "DIMAS WIJANARKO", fill=(15, 23, 42, 255), font=f_name)

    # 2. PRODI (ENGLISH: Information Systems)
    draw.text((tx, 375), "Information Systems", fill=(2, 132, 199, 255), font=f_prodi)

    # Divider
    draw.line([(tx, 465), (2150, 465)], fill=(203, 213, 225, 255), width=3)

    # 3. KONTAK LENGKAP
    cy = 530
    draw_vector_globe(draw, tx, cy + 4, size=32, color=(2, 132, 199, 255))
    draw.text((tx + 46, cy), "dimaswijanarko.me", fill=(2, 132, 199, 255), font=f_contact)

    draw.ellipse([tx + 460, cy + 16, tx + 468, cy + 24], fill=(148, 163, 184, 255))

    draw_vector_mail(draw, tx + 500, cy + 4, size=32, color=(51, 65, 85, 255))
    draw.text((tx + 550, cy), "dmswijanarko@gmail.com", fill=(51, 65, 85, 255), font=f_contact)

    draw.ellipse([tx + 1120, cy + 16, tx + 1128, cy + 24], fill=(148, 163, 184, 255))

    draw_vector_pin(draw, tx + 1160, cy + 4, size=30, color=(100, 116, 139, 255))
    draw.text((tx + 1205, cy), "Jakarta, Indonesia", fill=(71, 85, 105, 255), font=f_contact)

    # Save
    base.save(out_path_fhd, 'PNG', quality=100)
    print(f"FHD Banner 3 saved at: {out_path_fhd} ({w}x{h})")

    base_1x = base.resize((1584, 396), Image.Resampling.LANCZOS)
    base_1x.save(out_path_1x, 'PNG', quality=100)
    print(f"1x Banner 3 saved at: {out_path_1x} (1584x396)")


if __name__ == "__main__":
    desktop_dir = r"C:\Users\Dimas Wijanarko\Desktop"
    public_dir = r"C:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\public\linkedin_banners"
    os.makedirs(public_dir, exist_ok=True)

    # 1. Dev Code Card
    create_banner_1_dev_code(
        os.path.join(desktop_dir, "Banner_LinkedIn_Dimas_Montserrat_DevCode_FHD.png"),
        os.path.join(desktop_dir, "Banner_LinkedIn_Dimas_Montserrat_DevCode_1x.png")
    )
    create_banner_1_dev_code(
        os.path.join(public_dir, "banner_montserrat_devcode_fhd.png"),
        os.path.join(public_dir, "banner_montserrat_devcode_1x.png")
    )

    # 2. Network GIS / Data
    create_banner_2_network(
        os.path.join(desktop_dir, "Banner_LinkedIn_Dimas_Montserrat_Network_FHD.png"),
        os.path.join(desktop_dir, "Banner_LinkedIn_Dimas_Montserrat_Network_1x.png")
    )
    create_banner_2_network(
        os.path.join(public_dir, "banner_montserrat_network_fhd.png"),
        os.path.join(public_dir, "banner_montserrat_network_1x.png")
    )

    # 3. Aurora & Code Symbols
    create_banner_3_aurora_syntax(
        os.path.join(desktop_dir, "Banner_LinkedIn_Dimas_Montserrat_Aurora_FHD.png"),
        os.path.join(desktop_dir, "Banner_LinkedIn_Dimas_Montserrat_Aurora_1x.png")
    )
    create_banner_3_aurora_syntax(
        os.path.join(public_dir, "banner_montserrat_aurora_fhd.png"),
        os.path.join(public_dir, "banner_montserrat_aurora_1x.png")
    )
    print("All Montserrat banners created successfully!")
