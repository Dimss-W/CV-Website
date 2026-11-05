import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

def set_cell_border(cell, **kwargs):
    """
    kwargs can be top, bottom, left, right.
    value is a dict like {'sz': 12, 'val': 'single', 'color': '0369A1'}
    """
    tcPr = cell._tc.get_or_add_tcPr()
    tcBorders = tcPr.first_child_found_in("w:tcBorders")
    if tcBorders is None:
        tcBorders = OxmlElement('w:tcBorders')
        tcPr.append(tcBorders)
    
    for edge in ('top', 'left', 'bottom', 'right', 'insideH', 'insideV'):
        edge_data = kwargs.get(edge)
        if edge_data:
            tag = 'w:{}'.format(edge)
            element = tcBorders.find(qn(tag))
            if element is None:
                element = OxmlElement(tag)
                tcBorders.append(element)
            for key, val in edge_data.items():
                element.set(qn('w:{}'.format(key)), str(val))

def set_cell_margins(cell, top=50, bottom=50, left=50, right=50):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def add_horizontal_rule(doc, color_hex="0369A1", size_pt="12"):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(1)
    p.paragraph_format.space_after = Pt(4)
    pPr = p._p.get_or_add_pPr()
    pBdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="{size_pt}" w:space="1" w:color="{color_hex}"/></w:pBdr>')
    pPr.append(pBdr)

def build_docx_cv(dest_paths):
    doc = docx.Document()
    
    # 1. Page Margins - 0.5 inchi (Narrow ATS friendly)
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(0.45)
        section.bottom_margin = Inches(0.45)
        section.left_margin = Inches(0.5)
        section.right_margin = Inches(0.5)
        section.page_width = Inches(8.27)   # A4 width
        section.page_height = Inches(11.69) # A4 height

    # Palette
    c_primary = RGBColor(15, 23, 42)    # #0F172A Slate 900
    c_accent = RGBColor(3, 105, 161)    # #0369A1 Sky 700
    c_body = RGBColor(51, 65, 85)       # #334155 Slate 700
    c_muted = RGBColor(100, 116, 139)   # #64748B Slate 500

    font_family = "Calibri"

    # Set normal style font
    normal_style = doc.styles['Normal']
    normal_style.font.name = font_family
    normal_style.font.size = Pt(9.5)
    normal_style.font.color.rgb = c_body

    # Helper untuk Section Heading
    def add_section_heading(title_text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(6)
        p.paragraph_format.space_after = Pt(2)
        p.paragraph_format.keep_with_next = True
        
        run = p.add_run(title_text.upper())
        run.bold = True
        run.font.name = font_family
        run.font.size = Pt(10.5)
        run.font.color.rgb = c_primary
        
        # Border bawah aksen biru
        pPr = p._p.get_or_add_pPr()
        pBdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="10" w:space="2" w:color="0369A1"/></w:pBdr>')
        pPr.append(pBdr)

    # 1. HEADER (FOTO + IDENTITAS ATS)
    passport_img_path = r"c:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\public\dimas-profile-passport.jpg"
    
    table = doc.add_table(rows=1, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    
    col_widths = [Inches(1.05), Inches(6.22)]
    for i, col in enumerate(table.columns):
        col.width = col_widths[i]
        for cell in col.cells:
            cell.width = col_widths[i]

    # Cell 0: Foto Formal
    cell_photo = table.cell(0, 0)
    cell_photo.vertical_alignment = WD_ALIGN_VERTICAL.TOP
    set_cell_margins(cell_photo, top=0, bottom=0, left=0, right=80)
    p_photo = cell_photo.paragraphs[0]
    p_photo.paragraph_format.space_before = Pt(0)
    p_photo.paragraph_format.space_after = Pt(0)
    if os.path.exists(passport_img_path):
        p_photo.add_run().add_picture(passport_img_path, width=Inches(0.95), height=Inches(1.27))

    # Cell 1: Info Nama & Kontak
    cell_info = table.cell(0, 1)
    cell_info.vertical_alignment = WD_ALIGN_VERTICAL.TOP
    set_cell_margins(cell_info, top=0, bottom=0, left=60, right=0)
    
    # Nama Lengkap
    p_name = cell_info.paragraphs[0]
    p_name.paragraph_format.space_before = Pt(0)
    p_name.paragraph_format.space_after = Pt(1)
    r_name = p_name.add_run("DIMAS WIJANARKO")
    r_name.bold = True
    r_name.font.name = font_family
    r_name.font.size = Pt(17)
    r_name.font.color.rgb = c_primary

    # Jabatan / Title
    p_title = cell_info.add_paragraph()
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(2.5)
    r_title = p_title.add_run("Full Stack Web & Mobile Software Engineer • Mahasiswa S1 Sistem Informasi UBSI")
    r_title.bold = True
    r_title.font.name = font_family
    r_title.font.size = Pt(9.5)
    r_title.font.color.rgb = c_accent

    # TTL & Alamat
    p_addr = cell_info.add_paragraph()
    p_addr.paragraph_format.space_before = Pt(0)
    p_addr.paragraph_format.space_after = Pt(1.5)
    r_addr = p_addr.add_run("TTL: Jakarta, 21 April 2004  |  Alamat: Jl. Kramat Jaya RT.001 RW.01, Johar Baru, Jakarta Pusat, DKI Jakarta")
    r_addr.font.name = font_family
    r_addr.font.size = Pt(8.5)
    r_addr.font.color.rgb = c_body

    # Kontak Online (Email, LinkedIn, GitHub)
    p_contact = cell_info.add_paragraph()
    p_contact.paragraph_format.space_before = Pt(0)
    p_contact.paragraph_format.space_after = Pt(0)
    
    r_em_label = p_contact.add_run("Email: ")
    r_em_label.font.size = Pt(8.5)
    r_em_val = p_contact.add_run("dmswijanarko@gmail.com")
    r_em_val.font.size = Pt(8.5)
    r_em_val.font.color.rgb = c_accent
    r_em_val.underline = True

    p_contact.add_run("  |  ").font.size = Pt(8.5)

    r_li_label = p_contact.add_run("LinkedIn: ")
    r_li_label.font.size = Pt(8.5)
    r_li_val = p_contact.add_run("linkedin.com/in/dimas-wijanarko")
    r_li_val.font.size = Pt(8.5)
    r_li_val.font.color.rgb = c_accent
    r_li_val.underline = True

    p_contact.add_run("  |  ").font.size = Pt(8.5)

    r_gh_label = p_contact.add_run("GitHub: ")
    r_gh_label.font.size = Pt(8.5)
    r_gh_val = p_contact.add_run("github.com/Dimss-W")
    r_gh_val.font.size = Pt(8.5)
    r_gh_val.font.color.rgb = c_accent
    r_gh_val.underline = True

    # 2. RINGKASAN PROFESIONAL
    add_section_heading("Ringkasan Profesional")
    p_sum = doc.add_paragraph()
    p_sum.paragraph_format.space_before = Pt(1)
    p_sum.paragraph_format.space_after = Pt(3)
    p_sum.paragraph_format.line_spacing = 1.15
    
    r_sum = p_sum.add_run(
        "Mahasiswa Sistem Informasi Universitas Bina Sarana Informatika (UBSI) dengan spesialisasi rekayasa perangkat lunak web dan mobile. "
        "Tersertifikasi resmi "
    )
    r_sum.font.size = Pt(8.8)
    
    r_b1 = p_sum.add_run("Database Administrator oleh BNSP")
    r_b1.bold = True
    r_b1.font.size = Pt(8.8)

    r_sum2 = p_sum.add_run(", lulus asesmen ")
    r_sum2.font.size = Pt(8.8)

    r_b2 = p_sum.add_run("Analis Program BNSP")
    r_b2.bold = True
    r_b2.font.size = Pt(8.8)

    r_sum3 = p_sum.add_run(", dan peraih predikat ")
    r_sum3.font.size = Pt(8.8)

    r_b3 = p_sum.add_run("Juara 1 IT Bootcamp Software Development UBSI")
    r_b3.bold = True
    r_b3.font.size = Pt(8.8)

    r_sum4 = p_sum.add_run(
        ". Memiliki rekam jejak mengembangkan sistem operasional korporat di PT PGAS Telekomunikasi Nusantara (PGNCOM) terintegrasi analitik Power BI, "
        "serta merilis sistem produksi nyata: Otokeep (manajemen armada dengan integrasi Google Gemini Vision AI OCR) dan FindIt (sistem informasi terpadu 27 kampus cabang UBSI)."
    )
    r_sum4.font.size = Pt(8.8)

    # 3. KEAHLIAN TEKNIS & KOMPETENSI
    add_section_heading("Keahlian Teknis & Kompetensi")
    skills = [
        ("Bahasa & Framework", "PHP, Laravel, Dart, Flutter, TypeScript, JavaScript, React.js, Next.js, Tailwind CSS, HTML5, CSS3"),
        ("Basis Data & Analitik", "MySQL, PostgreSQL, Supabase Cloud, Microsoft Power BI, Kalkulasi DAX, Optimasi Kueri SQL, Relasi ERD"),
        ("Tools, AI & Arsitektur", "Git, GitHub, RESTful API, Arsitektur MVC, RBAC, Gemini Vision AI (OCR), Postman, Linux/Vercel Cloud"),
    ]
    for cat, val in skills:
        p_sk = doc.add_paragraph()
        p_sk.paragraph_format.space_before = Pt(0.5)
        p_sk.paragraph_format.space_after = Pt(1)
        r_c = p_sk.add_run(f"• {cat}: ")
        r_c.bold = True
        r_c.font.size = Pt(8.7)
        r_c.font.color.rgb = c_primary
        
        r_v = p_sk.add_run(val)
        r_v.font.size = Pt(8.7)
        r_v.font.color.rgb = c_body

    # 4. PENGALAMAN KERJA & MENGAJAR
    add_section_heading("Pengalaman Kerja & Mengajar")

    # Exp 1
    p_e1 = doc.add_paragraph()
    p_e1.paragraph_format.space_before = Pt(2)
    p_e1.paragraph_format.space_after = Pt(1)
    r1_role = p_e1.add_run("Web Developer & Data Analytics Intern")
    r1_role.bold = True
    r1_role.font.size = Pt(8.9)
    r1_role.font.color.rgb = c_primary
    r1_comp = p_e1.add_run(" — PT PGAS Telekomunikasi Nusantara (PGNCOM)")
    r1_comp.font.size = Pt(8.9)
    r1_comp.font.color.rgb = c_accent
    r1_comp.bold = True
    r1_date = p_e1.add_run("  [Agustus 2026 – Oktober 2026]")
    r1_date.font.size = Pt(8.5)
    r1_date.font.color.rgb = c_muted

    e1_bullets = [
        "Mengembangkan sistem web internal Monitoring Realisasi Biaya & QC BASTO berbasis Laravel dan MySQL untuk mengotomasi alur validasi dokumen Berita Acara Serah Terima Operasional (BASTO) dan kepatuhan anggaran proyek.",
        "Merancang dan mengintegrasikan dashboard visualisasi interaktif Microsoft Power BI menggunakan pemodelan data relasional dan kalkulasi formula DAX untuk memonitor deviasi realisasi biaya serta performa proyek secara real-time.",
        "Mengimplementasikan manajemen hak akses berjenjang (RBAC) dan riwayat audit transaksi untuk menjamin integritas data operasional.",
    ]
    for b in e1_bullets:
        p_b = doc.add_paragraph()
        p_b.paragraph_format.left_indent = Inches(0.2)
        p_b.paragraph_format.space_before = Pt(0.5)
        p_b.paragraph_format.space_after = Pt(1)
        r_b = p_b.add_run(f"• {b}")
        r_b.font.size = Pt(8.5)

    # Exp 2
    p_e2 = doc.add_paragraph()
    p_e2.paragraph_format.space_before = Pt(2.5)
    p_e2.paragraph_format.space_after = Pt(1)
    r2_role = p_e2.add_run("Pengajar Tamu & Instruktur Rekayasa Perangkat Lunak (RPL)")
    r2_role.bold = True
    r2_role.font.size = Pt(8.9)
    r2_role.font.color.rgb = c_primary
    r2_comp = p_e2.add_run(" — SMK Muhammadiyah 15 Jakarta")
    r2_comp.font.size = Pt(8.9)
    r2_comp.font.color.rgb = c_accent
    r2_comp.bold = True
    r2_date = p_e2.add_run("  [2025]")
    r2_date.font.size = Pt(8.5)
    r2_date.font.color.rgb = c_muted

    e2_bullets = [
        "Menjadi instruktur teknis tamu kurikulum web modern: pengenalan Framework Laravel, struktur MVC, dan administrasi database MySQL.",
        "Membimbing praktikum laboratorium komputer mengenai penerapan clean code dan alur kolaborasi version control Git & GitHub standar industri.",
    ]
    for b in e2_bullets:
        p_b = doc.add_paragraph()
        p_b.paragraph_format.left_indent = Inches(0.2)
        p_b.paragraph_format.space_before = Pt(0.5)
        p_b.paragraph_format.space_after = Pt(1)
        r_b = p_b.add_run(f"• {b}")
        r_b.font.size = Pt(8.5)

    # Exp 3
    p_e3 = doc.add_paragraph()
    p_e3.paragraph_format.space_before = Pt(2.5)
    p_e3.paragraph_format.space_after = Pt(1)
    r3_role = p_e3.add_run("Pengembang Perangkat Lunak Web & Mobile (Full Stack)")
    r3_role.bold = True
    r3_role.font.size = Pt(8.9)
    r3_role.font.color.rgb = c_primary
    r3_comp = p_e3.add_run(" — Proyek Mandiri & Klien")
    r3_comp.font.size = Pt(8.9)
    r3_comp.font.color.rgb = c_accent
    r3_comp.bold = True
    r3_date = p_e3.add_run("  [2023]")
    r3_date.font.size = Pt(8.5)
    r3_date.font.color.rgb = c_muted

    e3_bullets = [
        "Merancang dan membangun aplikasi mobile (Flutter & Dart) serta web berskala enterprise terintegrasi RESTful API terstruktur dan database relasional.",
    ]
    for b in e3_bullets:
        p_b = doc.add_paragraph()
        p_b.paragraph_format.left_indent = Inches(0.2)
        p_b.paragraph_format.space_before = Pt(0.5)
        p_b.paragraph_format.space_after = Pt(1)
        r_b = p_b.add_run(f"• {b}")
        r_b.font.size = Pt(8.5)

    # 5. PROYEK REKAYASA PERANGKAT LUNAK UNGGULAN
    add_section_heading("Proyek Rekayasa Perangkat Lunak Unggulan")
    projects = [
        ("Otokeep – Platform Servis Kendaraan Cerdas & Pemindai AI OCR",
         "Platform pemantauan servis kendaraan dengan integrasi Google Gemini Vision API OCR untuk deteksi otomatis angka odometer dari foto speedometer secara instan, dilengkapi kompresi citra cepat, penjadwalan servis berkala, dan pengingat pajak STNK. (Stack: Laravel, Tailwind CSS, MySQL, Gemini AI, REST API)."),
        ("FindIt – Sistem Informasi Barang Hilang & Ditemukan 27 Kampus UBSI",
         "Sistem informasi penemuan dan kehilangan barang terpadu untuk 27 kampus cabang UBSI se-Indonesia dengan partisi data multi-cabang tanpa benturan ID, pencatatan loker brankas penitipan, dan validasi klaim identitas mahasiswa. (Stack: Laravel, Blade, MySQL, REST API)."),
        ("CalTrack – Aplikasi Mobile Kesehatan & Kalkulator Nutrisi IMT",
         "Aplikasi mobile Android cross-platform dengan Flutter & MVVM untuk kalkulasi IMT/BMI real-time, panduan nutrisi harian, dan integrasi backend REST API Laravel. (Stack: Flutter, Dart, Laravel REST API, MySQL)."),
        ("Kastrix – Platform Kasir Pintar (POS) & Manajemen Multi-Gerai",
         "Membangun sistem Point of Sale (POS) multi-gerai dengan pembagian peran Super Admin dan Kasir, katalog menu dinamis, pencatatan transaksi kasir kilat, serta visualisasi rekap laba kotor real-time. (Stack: Laravel, React, Tailwind CSS, MySQL, REST API)."),
        ("Sistem Monitoring Realisasi Biaya & Dashboard Power BI (PGNCOM)",
         "Mengembangkan sistem web internal monitoring anggaran dan mengintegrasikan basis data transaksi operasional ke dashboard analitik Microsoft Power BI interaktif menggunakan formula DAX untuk evaluasi deviasi proyek. (Stack: Laravel, Microsoft Power BI, DAX, MySQL)."),
    ]
    for p_title, p_desc in projects:
        p_pj = doc.add_paragraph()
        p_pj.paragraph_format.space_before = Pt(1.5)
        p_pj.paragraph_format.space_after = Pt(0.5)
        r_pt = p_pj.add_run(f"• {p_title}")
        r_pt.bold = True
        r_pt.font.size = Pt(8.8)
        r_pt.font.color.rgb = c_primary
        
        p_pd = doc.add_paragraph()
        p_pd.paragraph_format.left_indent = Inches(0.2)
        p_pd.paragraph_format.space_before = Pt(0)
        p_pd.paragraph_format.space_after = Pt(1)
        r_pd = p_pd.add_run(p_desc)
        r_pd.font.size = Pt(8.5)

    # 6. SERTIFIKASI KOMPETENSI & PENGHARGAAN RESMI
    add_section_heading("Sertifikasi Kompetensi & Penghargaan Resmi")
    certs = [
        ("Sertifikat Kompetensi Database Administrator", "Badan Nasional Sertifikasi Profesi (BNSP) & LSP UBSI", "Mar 2026 – 2029",
         "Dinyatakan Kompeten secara nasional dalam perancangan basis data relasional, penulisan kueri SQL tingkat lanjut, pengoptimalan indeks, dan integritas data."),
        ("Sertifikasi Kompetensi Analis Program (Program Analyst)", "BNSP & LSP UBSI", "Agustus 2026 – 2029",
         "Lulus uji asesmen 10 unit kompetensi SKKNI: skalabilitas sistem, SQL, algoritma, debugging, profiling, code review, dan pengujian program. (Blangko fisik dalam proses penerbitan BNSP)."),
        ("Juara 1 IT Bootcamp Software Development", "Fakultas Teknologi Informasi (FTI) & Rektorat UBSI", "2025",
         "Meraih predikat JUARA 1 tingkat nasional mengungguli perwakilan mahasiswa dari seluruh kampus cabang UBSI se-Indonesia atas keunggulan arsitektur sistem dan mutu kode."),
    ]
    for c_title, c_issuer, c_date, c_desc in certs:
        p_ct = doc.add_paragraph()
        p_ct.paragraph_format.space_before = Pt(1.5)
        p_ct.paragraph_format.space_after = Pt(0.5)
        r_ct = p_ct.add_run(f"• {c_title}")
        r_ct.bold = True
        r_ct.font.size = Pt(8.8)
        r_ct.font.color.rgb = c_primary
        
        r_ci = p_ct.add_run(f" — {c_issuer}")
        r_ci.font.size = Pt(8.6)
        r_ci.font.color.rgb = c_accent
        
        r_cd = p_ct.add_run(f"  [{c_date}]")
        r_cd.font.size = Pt(8.4)
        r_cd.font.color.rgb = c_muted

        p_cd = doc.add_paragraph()
        p_cd.paragraph_format.left_indent = Inches(0.2)
        p_cd.paragraph_format.space_before = Pt(0)
        p_cd.paragraph_format.space_after = Pt(1)
        r_des = p_cd.add_run(c_desc)
        r_des.font.size = Pt(8.5)

    # 7. PENDIDIKAN FORMAL
    add_section_heading("Pendidikan Formal")
    edus = [
        ("Universitas Bina Sarana Informatika (UBSI)", "S1 Sistem Informasi", "2023 – Sekarang (Aktif)"),
        ("SMK Negeri 31 Jakarta", "Jurusan Animasi", "2019 – 2022"),
        ("SMP Negeri 156 Jakarta", "Sekolah Menengah Pertama", "2016 – 2019"),
    ]
    for inst, major, yr in edus:
        p_ed = doc.add_paragraph()
        p_ed.paragraph_format.space_before = Pt(1)
        p_ed.paragraph_format.space_after = Pt(0.5)
        r_in = p_ed.add_run(f"• {inst}")
        r_in.bold = True
        r_in.font.size = Pt(8.8)
        r_in.font.color.rgb = c_primary
        
        r_mj = p_ed.add_run(f" — {major}")
        r_mj.font.size = Pt(8.6)
        r_mj.font.color.rgb = c_accent
        
        r_yr = p_ed.add_run(f"  [{yr}]")
        r_yr.font.size = Pt(8.4)
        r_yr.font.color.rgb = c_muted

    # Save to destinations
    for path in dest_paths:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        doc.save(path)
        print(f"Berhasil membuat file Word CV ATS di: {path}")

if __name__ == "__main__":
    targets = [
        # Storage di project personal-cv-web
        r"c:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\storage\CV_Dimas_Wijanarko_ATS.docx",
        r"c:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\public\storage\CV_Dimas_Wijanarko_ATS.docx",
        r"c:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\public\CV_Dimas_Wijanarko_ATS.docx",
    ]
    build_docx_cv(targets)
