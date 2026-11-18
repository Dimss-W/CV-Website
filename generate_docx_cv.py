import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

def build_docx_cv(dest_paths):
    doc = docx.Document()
    
    # Page Margins - Standard 0.5 in (36 pt) ATS friendly
    for section in doc.sections:
        section.top_margin = Inches(0.5)
        section.bottom_margin = Inches(0.5)
        section.left_margin = Inches(0.5)
        section.right_margin = Inches(0.5)
        section.page_width = Inches(8.27)   # A4 width
        section.page_height = Inches(11.69) # A4 height

    # Palette
    c_primary = RGBColor(15, 23, 42)    # Slate 900 (Hitam Pekat)
    c_body = RGBColor(51, 65, 85)       # Slate 700 (Teks Isi)
    c_muted = RGBColor(100, 116, 139)   # Slate 500 (Tanggal / Keterangan)

    font_family = "Times New Roman"

    # Set normal style font
    normal_style = doc.styles['Normal']
    normal_style.font.name = font_family
    normal_style.font.size = Pt(9.5)
    normal_style.font.color.rgb = c_body

    def add_section_heading(title_text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(6)
        p.paragraph_format.space_after = Pt(2)
        p.paragraph_format.keep_with_next = True
        
        run = p.add_run(title_text.upper())
        run.bold = True
        run.font.name = font_family
        run.font.size = Pt(11.0)
        run.font.color.rgb = c_primary
        
        # Border bawah aksen hitam
        pPr = p._p.get_or_add_pPr()
        pBdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="8" w:space="2" w:color="0F172A"/></w:pBdr>')
        pPr.append(pBdr)

    # ==========================================
    # 1. HEADER: FOTO DI POJOK KIRI, DATA DIRI RATA TENGAH NAIK KE ATAS
    # ==========================================
    passport_img_path = r"c:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\public\dimas-profile-passport.jpg"
    
    header_table = doc.add_table(rows=1, cols=2)
    header_table.alignment = WD_TABLE_ALIGNMENT.LEFT
    header_table.autofit = False

    header_table.columns[0].width = Inches(1.05)
    header_table.columns[1].width = Inches(6.22)

    cell_photo = header_table.cell(0, 0)
    cell_photo.width = Inches(1.05)
    cell_photo.vertical_alignment = WD_ALIGN_VERTICAL.CENTER

    cell_text = header_table.cell(0, 1)
    cell_text.width = Inches(6.22)
    cell_text.vertical_alignment = WD_ALIGN_VERTICAL.CENTER

    # Hilangkan border tabel
    for row in header_table.rows:
        for cell in row.cells:
            tcPr = cell._tc.get_or_add_tcPr()
            tcBorders = parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="none"/><w:left w:val="none"/><w:bottom w:val="none"/><w:right w:val="none"/></w:tcBorders>')
            tcPr.append(tcBorders)

    # Foto di Kolom Kiri
    p_photo = cell_photo.paragraphs[0]
    p_photo.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p_photo.paragraph_format.space_before = Pt(0)
    p_photo.paragraph_format.space_after = Pt(0)
    if os.path.exists(passport_img_path):
        p_photo.add_run().add_picture(passport_img_path, width=Inches(0.92), height=Inches(1.23))

    # Teks di Kolom Kanan (Rata Tengah, Naik ke Atas Sejajar Foto)
    p_name = cell_text.paragraphs[0]
    p_name.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_name.paragraph_format.space_before = Pt(0)
    p_name.paragraph_format.space_after = Pt(1.5)
    r_name = p_name.add_run("DIMAS WIJANARKO")
    r_name.bold = True
    r_name.font.name = font_family
    r_name.font.size = Pt(18.5)
    r_name.font.color.rgb = c_primary

    p_title = cell_text.add_paragraph()
    p_title.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(1.5)
    r_title = p_title.add_run("Full Stack Web & Mobile Software Engineer • Mahasiswa S1 Sistem Informasi UBSI")
    r_title.bold = True
    r_title.font.name = font_family
    r_title.font.size = Pt(10.0)
    r_title.font.color.rgb = c_primary

    p_addr = cell_text.add_paragraph()
    p_addr.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_addr.paragraph_format.space_before = Pt(0)
    p_addr.paragraph_format.space_after = Pt(1.5)
    r_addr = p_addr.add_run("TTL: Jakarta, 21 April 2004  |  Alamat: Jl. Kramat Jaya RT.001 RW.01, Johar Baru, Jakarta Pusat, DKI Jakarta")
    r_addr.font.name = font_family
    r_addr.font.size = Pt(8.8)
    r_addr.font.color.rgb = c_body

    p_contact = cell_text.add_paragraph()
    p_contact.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_contact.paragraph_format.space_before = Pt(0)
    p_contact.paragraph_format.space_after = Pt(0)
    
    r_em_label = p_contact.add_run("Email: ")
    r_em_label.font.name = font_family
    r_em_label.font.size = Pt(8.8)
    r_em_val = p_contact.add_run("dmswijanarko@gmail.com")
    r_em_val.font.name = font_family
    r_em_val.font.size = Pt(8.8)
    r_em_val.font.color.rgb = c_primary
    r_em_val.underline = True

    p_contact.add_run("  |  ").font.size = Pt(8.8)

    r_li_label = p_contact.add_run("LinkedIn: ")
    r_li_label.font.name = font_family
    r_li_label.font.size = Pt(8.8)
    r_li_val = p_contact.add_run("linkedin.com/in/dmswijanarko")
    r_li_val.font.name = font_family
    r_li_val.font.size = Pt(8.8)
    r_li_val.font.color.rgb = c_primary
    r_li_val.underline = True

    p_contact.add_run("  |  ").font.size = Pt(8.8)

    r_gh_label = p_contact.add_run("GitHub: ")
    r_gh_label.font.name = font_family
    r_gh_label.font.size = Pt(8.8)
    r_gh_val = p_contact.add_run("github.com/Dimss-W")
    r_gh_val.font.name = font_family
    r_gh_val.font.size = Pt(8.8)
    r_gh_val.font.color.rgb = c_primary
    r_gh_val.underline = True

    p_contact.add_run("  |  ").font.size = Pt(8.8)

    r_web_label = p_contact.add_run("Web: ")
    r_web_label.font.name = font_family
    r_web_label.font.size = Pt(8.8)
    r_web_val = p_contact.add_run("dimaswijanarko.me")
    r_web_val.font.name = font_family
    r_web_val.font.size = Pt(8.8)
    r_web_val.font.color.rgb = c_primary
    r_web_val.underline = True

    # Divider Line
    p_div = doc.add_paragraph()
    p_div.paragraph_format.space_before = Pt(2)
    p_div.paragraph_format.space_after = Pt(3)
    pPr = p_div._p.get_or_add_pPr()
    pBdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="12" w:space="1" w:color="0F172A"/></w:pBdr>')
    pPr.append(pBdr)

    # ==========================================
    # 2. RINGKASAN PROFESIONAL (MENCERMINKAN IDENTITAS DIRI, JUSTIFIED, ISI BERSIH)
    # ==========================================
    add_section_heading("Ringkasan Profesional")
    p_sum = doc.add_paragraph()
    p_sum.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_sum.paragraph_format.space_before = Pt(1)
    p_sum.paragraph_format.space_after = Pt(3)
    p_sum.paragraph_format.line_spacing = 1.15
    
    r_sum = p_sum.add_run(
        "Software Engineer (Web & Mobile) dan mahasiswa S1 Sistem Informasi UBSI dengan fondasi desain visual serta analitik data. "
        "Berfokus pada perancangan aplikasi web modern menggunakan Laravel, aplikasi mobile lintas platform dengan Flutter, dan arsitektur basis data relasional tersertifikasi Database Administrator BNSP. "
        "Memiliki pengalaman industri di PT PGAS Telekomunikasi Nusantara (PGNCOM) dalam membangun sistem monitoring operasional dan dashboard interaktif Power BI. "
        "Memadukan ketelitian kode bersih, kepekaan estetika antarmuka (UI/UX), serta jiwa kepemimpinan aktif sebagai Ketua Umum PRISMA dan instruktur tamu RPL. "
        "Berdedikasi menghadirkan produk digital yang efisien, skalabel, dan memberikan nilai nyata bagi pengguna."
    )
    r_sum.font.name = font_family
    r_sum.font.size = Pt(9.4)
    r_sum.font.color.rgb = c_body

    # ==========================================
    # 3. KEAHLIAN TEKNIS & KOMPETENSI (SEJAJAR RATA PENUH)
    # ==========================================
    add_section_heading("Keahlian Teknis & Kompetensi")
    skills = [
        ("Bahasa & Framework", "PHP, Laravel, Dart, Flutter, TypeScript, JavaScript, React.js, Next.js, Tailwind CSS, HTML5, CSS3"),
        ("Basis Data & Analitik", "MySQL, PostgreSQL, Supabase Cloud, Microsoft Power BI, Kalkulasi DAX, Optimasi Kueri SQL, Relasi ERD"),
        ("Tools & Arsitektur", "Git, GitHub, RESTful API, Arsitektur MVC, RBAC, Postman, Linux Server, Vercel Cloud"),
    ]
    for label, val in skills:
        p_sk = doc.add_paragraph()
        p_sk.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p_sk.paragraph_format.left_indent = Inches(0.18)
        p_sk.paragraph_format.space_before = Pt(0.5)
        p_sk.paragraph_format.space_after = Pt(1)
        p_sk.paragraph_format.line_spacing = 1.15
        
        r_lbl = p_sk.add_run(f"• {label}: ")
        r_lbl.bold = True
        r_lbl.font.name = font_family
        r_lbl.font.size = Pt(9.4)
        r_lbl.font.color.rgb = c_primary
        
        r_val = p_sk.add_run(val)
        r_val.font.name = font_family
        r_val.font.size = Pt(9.4)
        r_val.font.color.rgb = c_body

    # ==========================================
    # 4. PENDIDIKAN FORMAL (NILAI RATA-RATA & IPK DIHAPUS)
    # ==========================================
    add_section_heading("Pendidikan Formal")

    # UBSI
    p_ub = doc.add_paragraph()
    p_ub.paragraph_format.space_before = Pt(1)
    p_ub.paragraph_format.space_after = Pt(1)
    
    r_u1 = p_ub.add_run("Universitas Bina Sarana Informatika (UBSI) ")
    r_u1.bold = True
    r_u1.font.name = font_family
    r_u1.font.size = Pt(9.8)
    r_u1.font.color.rgb = c_primary
    
    r_u2 = p_ub.add_run("— S1 Sistem Informasi")
    r_u2.bold = True
    r_u2.font.name = font_family
    r_u2.font.size = Pt(9.8)
    r_u2.font.color.rgb = c_primary

    r_ud = p_ub.add_run("\tSeptember 2023 – Sekarang (Mahasiswa Aktif)")
    r_ud.italic = True
    r_ud.font.name = font_family
    r_ud.font.size = Pt(9.0)
    r_ud.font.color.rgb = c_muted

    p_ub_rel = doc.add_paragraph()
    p_ub_rel.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_ub_rel.paragraph_format.left_indent = Inches(0.18)
    p_ub_rel.paragraph_format.space_before = Pt(0)
    p_ub_rel.paragraph_format.space_after = Pt(2)
    p_ub_rel.paragraph_format.line_spacing = 1.15
    r_ub_rel = p_ub_rel.add_run("• Mata Kuliah Relevan: Pemrograman Web (Laravel), Pemrograman Mobile (Flutter & Dart), Rekayasa Perangkat Lunak, Basis Data Relasional & SQL, Sistem Informasi Manajemen.")
    r_ub_rel.font.name = font_family
    r_ub_rel.font.size = Pt(9.4)
    r_ub_rel.font.color.rgb = c_body

    # SMK Negeri 31 Jakarta
    p_smk = doc.add_paragraph()
    p_smk.paragraph_format.space_before = Pt(2)
    p_smk.paragraph_format.space_after = Pt(1)
    
    r_s1 = p_smk.add_run("SMK Negeri 31 Jakarta ")
    r_s1.bold = True
    r_s1.font.name = font_family
    r_s1.font.size = Pt(9.8)
    r_s1.font.color.rgb = c_primary
    
    r_s2 = p_smk.add_run("— Kompetensi Keahlian Animasi")
    r_s2.bold = True
    r_s2.font.name = font_family
    r_s2.font.size = Pt(9.8)
    r_s2.font.color.rgb = c_primary

    r_sd = p_smk.add_run("\tJuli 2019 – Juli 2022")
    r_sd.italic = True
    r_sd.font.name = font_family
    r_sd.font.size = Pt(9.0)
    r_sd.font.color.rgb = c_muted

    p_smk_fok = doc.add_paragraph()
    p_smk_fok.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_smk_fok.paragraph_format.left_indent = Inches(0.18)
    p_smk_fok.paragraph_format.space_before = Pt(0)
    p_smk_fok.paragraph_format.space_after = Pt(2)
    p_smk_fok.paragraph_format.line_spacing = 1.15
    r_smk_fok = p_smk_fok.add_run("• Fokus Pembelajaran: Desain visual antarmuka pengguna (UI/UX), permodelan grafis digital, animasi komputer, dan komposisi aset multimedia.")
    r_smk_fok.font.name = font_family
    r_smk_fok.font.size = Pt(9.4)
    r_smk_fok.font.color.rgb = c_body

    # ==========================================
    # 5. PENGALAMAN KERJA & MENGAJAR (NO BOLD IN BULLETS)
    # ==========================================
    add_section_heading("Pengalaman Kerja & Mengajar")

    # Exp 1: PGNCOM
    p_e1 = doc.add_paragraph()
    p_e1.paragraph_format.space_before = Pt(1.5)
    p_e1.paragraph_format.space_after = Pt(1)
    
    r1_pos = p_e1.add_run("Web Developer & Data Analytics Intern ")
    r1_pos.bold = True
    r1_pos.font.name = font_family
    r1_pos.font.size = Pt(9.8)
    r1_pos.font.color.rgb = c_primary
    
    r1_comp = p_e1.add_run("— PT PGAS Telekomunikasi Nusantara (PGNCOM)")
    r1_comp.bold = True
    r1_comp.font.name = font_family
    r1_comp.font.size = Pt(9.8)
    r1_comp.font.color.rgb = c_primary

    r1_d = p_e1.add_run("\tAgustus 2026 – November 2026")
    r1_d.italic = True
    r1_d.font.name = font_family
    r1_d.font.size = Pt(9.0)
    r1_d.font.color.rgb = c_muted

    e1_bullets = [
        "• Mengembangkan sistem web internal Monitoring Realisasi Biaya & QC BASTO berbasis Laravel dan MySQL untuk mengotomasi alur validasi dokumen Berita Acara Serah Terima Operasional (BASTO) dan kepatuhan anggaran proyek.",
        "• Merancang dan mengintegrasikan dashboard visualisasi interaktif Microsoft Power BI menggunakan pemodelan data relasional dan kalkulasi formula DAX untuk memonitor deviasi realisasi biaya serta performa proyek secara real-time.",
        "• Mengimplementasikan manajemen hak akses berjenjang (RBAC) dan riwayat audit transaksi untuk menjamin integritas data operasional perusahaan.",
    ]
    for b in e1_bullets:
        p_b = doc.add_paragraph()
        p_b.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p_b.paragraph_format.left_indent = Inches(0.18)
        p_b.paragraph_format.space_before = Pt(0)
        p_b.paragraph_format.space_after = Pt(1.2)
        p_b.paragraph_format.line_spacing = 1.15
        r_b = p_b.add_run(b)
        r_b.font.name = font_family
        r_b.font.size = Pt(9.4)
        r_b.font.color.rgb = c_body

    # Exp 2: SMK Muhammadiyah 15
    p_e2 = doc.add_paragraph()
    p_e2.paragraph_format.space_before = Pt(2)
    p_e2.paragraph_format.space_after = Pt(1)
    
    r2_pos = p_e2.add_run("Pengajar Tamu & Instruktur Rekayasa Perangkat Lunak (RPL) ")
    r2_pos.bold = True
    r2_pos.font.name = font_family
    r2_pos.font.size = Pt(9.8)
    r2_pos.font.color.rgb = c_primary
    
    r2_comp = p_e2.add_run("— SMK Muhammadiyah 15 Jakarta")
    r2_comp.bold = True
    r2_comp.font.name = font_family
    r2_comp.font.size = Pt(9.8)
    r2_comp.font.color.rgb = c_primary

    r2_d = p_e2.add_run("\t2025")
    r2_d.italic = True
    r2_d.font.name = font_family
    r2_d.font.size = Pt(9.0)
    r2_d.font.color.rgb = c_muted

    e2_bullets = [
        "• Menjadi instruktur teknis tamu kurikulum web modern: pengenalan Framework Laravel, struktur arsitektur MVC, dan administrasi database MySQL.",
        "• Membimbing praktikum laboratorium komputer mengenai penerapan clean code dan simulasi alur kolaborasi version control Git & GitHub standar industri.",
    ]
    for b in e2_bullets:
        p_b = doc.add_paragraph()
        p_b.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p_b.paragraph_format.left_indent = Inches(0.18)
        p_b.paragraph_format.space_before = Pt(0)
        p_b.paragraph_format.space_after = Pt(1.2)
        p_b.paragraph_format.line_spacing = 1.15
        r_b = p_b.add_run(b)
        r_b.font.name = font_family
        r_b.font.size = Pt(9.4)
        r_b.font.color.rgb = c_body

    # Exp 3: Proyek Mandiri
    p_e3 = doc.add_paragraph()
    p_e3.paragraph_format.space_before = Pt(2)
    p_e3.paragraph_format.space_after = Pt(1)
    
    r3_pos = p_e3.add_run("Pengembang Perangkat Lunak Web & Mobile (Full Stack) ")
    r3_pos.bold = True
    r3_pos.font.name = font_family
    r3_pos.font.size = Pt(9.8)
    r3_pos.font.color.rgb = c_primary
    
    r3_comp = p_e3.add_run("— Proyek Independen & Klien")
    r3_comp.bold = True
    r3_comp.font.name = font_family
    r3_comp.font.size = Pt(9.8)
    r3_comp.font.color.rgb = c_primary

    r3_d = p_e3.add_run("\t2023")
    r3_d.italic = True
    r3_d.font.name = font_family
    r3_d.font.size = Pt(9.0)
    r3_d.font.color.rgb = c_muted

    p_b3 = doc.add_paragraph()
    p_b3.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_b3.paragraph_format.left_indent = Inches(0.18)
    p_b3.paragraph_format.space_before = Pt(0)
    p_b3.paragraph_format.space_after = Pt(2)
    p_b3.paragraph_format.line_spacing = 1.15
    r_b3 = p_b3.add_run("• Merancang dan membangun aplikasi mobile (Flutter & Dart) serta web berskala enterprise terintegrasi RESTful API terstruktur dan database relasional.")
    r_b3.font.name = font_family
    r_b3.font.size = Pt(9.4)
    r_b3.font.color.rgb = c_body

    # ==========================================
    # 6. PENGALAMAN ORGANISASI (NO BOLD IN BULLETS)
    # ==========================================
    doc.add_page_break()
    add_section_heading("Pengalaman Organisasi")

    p_og = doc.add_paragraph()
    p_og.paragraph_format.space_before = Pt(1.5)
    p_og.paragraph_format.space_after = Pt(1)
    
    r_og_pos = p_og.add_run("Ketua Umum ")
    r_og_pos.bold = True
    r_og_pos.font.name = font_family
    r_og_pos.font.size = Pt(9.8)
    r_og_pos.font.color.rgb = c_primary
    
    r_og_comp = p_og.add_run("— Pengurus Remaja Islam Masjid (PRISMA)")
    r_og_comp.bold = True
    r_og_comp.font.name = font_family
    r_og_comp.font.size = Pt(9.8)
    r_og_comp.font.color.rgb = c_primary

    r_og_d = p_og.add_run("\t2023 – Sekarang (Aktif)")
    r_og_d.italic = True
    r_og_d.font.name = font_family
    r_og_d.font.size = Pt(9.0)
    r_og_d.font.color.rgb = c_muted

    og_bullets = [
        "• Memimpin organisasi kepemudaan masjid dalam merencanakan program kerja tahunan, memimpin rapat kepengurusan berkala, mengelola transparansi pendanaan kas umat, serta menjalin koordinasi strategis bersama Dewan Kemakmuran Masjid (DKM) dan aparatur wilayah.",
        "• Menginisiasi dan mengeksekusi rangkaian program sosial-keagamaan rutin tahunan setiap bulan Ramadhan berskala ratusan penerima manfaat:",
        "    – Pemeriksaan & Pengobatan Medis Gratis: Menyelenggarakan layanan posko kesehatan gratis bagi warga sekitar bekerja sama dengan tenaga medis.",
        "    – Tabligh Akbar & Kajian Tematik: Mengoordinasikan acara keagamaan akbar menghadirkan penceramah dan ratusan jamaah.",
        "    – Perlombaan Islami Anak & Remaja: Menyelenggarakan kompetisi hafalan, adzan, dan wawasan islami untuk memacu semangat generasi muda.",
        "    – Santunan Sosial Anak Yatim, Dhuafa & Marbot: Menggalang dan menyalurkan paket sembako serta dana santunan tepat sasaran.",
    ]
    for b in og_bullets:
        p_b = doc.add_paragraph()
        p_b.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p_b.paragraph_format.left_indent = Inches(0.18)
        p_b.paragraph_format.space_before = Pt(0)
        p_b.paragraph_format.space_after = Pt(1.2)
        p_b.paragraph_format.line_spacing = 1.15
        r_b = p_b.add_run(b)
        r_b.font.name = font_family
        r_b.font.size = Pt(9.4)
        r_b.font.color.rgb = c_body

    # ==========================================
    # 7. PROYEK REKAYASA PERANGKAT LUNAK UNGGULAN
    # ==========================================
    add_section_heading("Proyek Rekayasa Perangkat Lunak Unggulan")

    projects = [
        ("Fleedy – Sistem Monitoring Kendaraan & GIS Telemetry (PT PGN MAS)",
         "• Membangun sistem komando pemantauan 1.229+ armada kendaraan operasional PT PGN MAS, analisis rasio utilisasi (88.4%), komposisi kepemilikan aset, pemetaan geospasial GIS interaktif (Leaflet) sebaran nasional, serta rekonsiliasi kontrak terintegrasi. (Stack: Laravel, React, Tailwind CSS, Leaflet GIS, MySQL)."),
        ("Otokeep – Platform Servis Kendaraan Cerdas & Manajemen Armada",
         "• Platform pemantauan servis kendaraan & armada cerdas dengan kompresi citra cepat, penjadwalan servis berkala berbasis kalkulasi jarak tempuh, estimasi biaya perawatan, dan pengingat masa aktif STNK. (Stack: Laravel, Tailwind CSS, MySQL, REST API)."),
        ("FindIt – Sistem Informasi Barang Hilang & Ditemukan 27 Kampus UBSI",
         "• Sistem informasi pengelolaan barang hilang & penemuan terpadu untuk 27 kampus cabang UBSI se-Indonesia dengan partisi data multi-cabang tanpa benturan ID, pencatatan loker brankas penitipan terpusat, dan verifikasi identitas mahasiswa. (Stack: Laravel, Blade, MySQL, REST API)."),
        ("CalTrack – Aplikasi Mobile Kesehatan & Kalkulator Nutrisi IMT",
         "• Aplikasi mobile Android cross-platform dengan Flutter & MVVM untuk kalkulasi IMT/BMI real-time, panduan rekomendasi nutrisi harian, dan integrasi backend REST API Laravel. (Stack: Flutter, Dart, Laravel REST API, MySQL)."),
        ("Kastrix – Platform Kasir Pintar (POS) & Manajemen Multi-Gerai",
         "• Membangun sistem Point of Sale (POS) multi-gerai dengan pembagian peran Super Admin dan Kasir, katalog menu dinamis, pencatatan transaksi kasir kilat, serta visualisasi rekap laba kotor real-time. (Stack: Laravel, React, Tailwind CSS, MySQL, REST API)."),
        ("Sistem Monitoring Realisasi Biaya & Dashboard Power BI (PGNCOM)",
         "• Mengembangkan sistem web internal monitoring anggaran dan mengintegrasikan basis data transaksi operasional ke dashboard analitik Microsoft Power BI interaktif menggunakan formula DAX untuk evaluasi deviasi proyek. (Stack: Laravel, Microsoft Power BI, DAX, MySQL)."),
    ]
    for p_title, p_desc in projects:
        p_t = doc.add_paragraph()
        p_t.paragraph_format.space_before = Pt(1.5)
        p_t.paragraph_format.space_after = Pt(0.5)
        r_t = p_t.add_run(p_title)
        r_t.bold = True
        r_t.font.name = font_family
        r_t.font.size = Pt(9.6)
        r_t.font.color.rgb = c_primary

        p_d = doc.add_paragraph()
        p_d.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p_d.paragraph_format.left_indent = Inches(0.18)
        p_d.paragraph_format.space_before = Pt(0)
        p_d.paragraph_format.space_after = Pt(1.5)
        p_d.paragraph_format.line_spacing = 1.15
        r_d = p_d.add_run(p_desc)
        r_d.font.name = font_family
        r_d.font.size = Pt(9.4)
        r_d.font.color.rgb = c_body

    # ==========================================
    # 8. SERTIFIKASI KOMPETENSI & PENGHARGAAN RESMI
    # ==========================================
    add_section_heading("Sertifikasi Kompetensi & Penghargaan Resmi")

    certs = [
        ("Sertifikat Kompetensi Database Administrator",
         "— Badan Nasional Sertifikasi Profesi (BNSP) & LSP UBSI",
         "Mar 2026 – 2029",
         "• Dinyatakan Kompeten secara nasional dalam perancangan basis data relasional, penulisan kueri SQL tingkat lanjut, pengoptimalan indeks, dan integritas data."),
        ("Sertifikasi Kompetensi Analis Program (Program Analyst)",
         "— BNSP & LSP UBSI",
         "Agustus 2026 – 2029",
         "• Lulus uji asesmen 10 unit kompetensi SKKNI: skalabilitas sistem, SQL, algoritma, debugging, profiling, code review, dan pengujian program. (Blangko fisik dalam proses penerbitan BNSP)."),
        ("Juara 1 IT Bootcamp Software Development",
         "— Fakultas Teknologi Informasi (FTI) & Rektorat UBSI",
         "2025",
         "• Meraih predikat Juara 1 tingkat nasional mengungguli seluruh perwakilan mahasiswa kampus cabang UBSI se-Indonesia melalui platform Smart Tahfidz School."),
    ]
    for c_title, c_inst, c_date, c_desc in certs:
        p_c = doc.add_paragraph()
        p_c.paragraph_format.space_before = Pt(1.5)
        p_c.paragraph_format.space_after = Pt(0.5)
        
        r_ct = p_c.add_run(c_title + " ")
        r_ct.bold = True
        r_ct.font.name = font_family
        r_ct.font.size = Pt(9.6)
        r_ct.font.color.rgb = c_primary
        
        r_ci = p_c.add_run(c_inst)
        r_ci.bold = True
        r_ci.font.name = font_family
        r_ci.font.size = Pt(9.6)
        r_ci.font.color.rgb = c_primary

        r_cd = p_c.add_run(f"\t{c_date}")
        r_cd.italic = True
        r_cd.font.name = font_family
        r_cd.font.size = Pt(9.0)
        r_cd.font.color.rgb = c_muted

        p_cd = doc.add_paragraph()
        p_cd.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p_cd.paragraph_format.left_indent = Inches(0.18)
        p_cd.paragraph_format.space_before = Pt(0)
        p_cd.paragraph_format.space_after = Pt(1.5)
        p_cd.paragraph_format.line_spacing = 1.15
        r_cd_txt = p_cd.add_run(c_desc)
        r_cd_txt.font.name = font_family
        r_cd_txt.font.size = Pt(9.4)
        r_cd_txt.font.color.rgb = c_body

    # Save to all destination paths
    for p in dest_paths:
        os.makedirs(os.path.dirname(p), exist_ok=True)
        try:
            doc.save(p)
            print(f"File Word CV ATS (Times New Roman) tersimpan di: {p}")
        except PermissionError:
            print(f"File sedang dibuka di Microsoft Word: {p}")
            alt_path = p.replace(".docx", "_TimesNewRoman.docx")
            doc.save(alt_path)
            print(f"Tersimpan sebagai file alternatif di: {alt_path}")

if __name__ == "__main__":
    destinations = [
        r"C:\Users\Dimas Wijanarko\Desktop\CV_Dimas_Wijanarko_ATS.docx",
        r"C:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\storage\CV_Dimas_Wijanarko_ATS.docx",
        r"C:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\public\storage\CV_Dimas_Wijanarko_ATS.docx",
        r"C:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\public\CV_Dimas_Wijanarko_ATS.docx",
    ]
    build_docx_cv(destinations)
