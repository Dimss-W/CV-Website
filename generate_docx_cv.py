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
        section.top_margin = Inches(0.4)
        section.bottom_margin = Inches(0.4)
        section.left_margin = Inches(0.45)
        section.right_margin = Inches(0.45)
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
    normal_style.font.size = Pt(9.2)
    normal_style.font.color.rgb = c_body

    def add_section_heading(title_text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(4.0)
        p.paragraph_format.space_after = Pt(2.0)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(title_text.upper())
        run.bold = True
        run.font.name = font_family
        run.font.size = Pt(10.2)
        run.font.color.rgb = c_primary

        pPr = p._p.get_or_add_pPr()
        pBdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="8" w:space="1" w:color="0F172A"/></w:pBdr>')
        pPr.append(pBdr)
        return p

    # ==========================================
    # 1. HEADER (NO PHOTO, FULL-WIDTH CENTERED ATS STANDARD)
    # ==========================================
    p_name = doc.add_paragraph()
    p_name.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_name.paragraph_format.space_before = Pt(0)
    p_name.paragraph_format.space_after = Pt(1.5)
    r_name = p_name.add_run("DIMAS WIJANARKO")
    r_name.bold = True
    r_name.font.name = font_family
    r_name.font.size = Pt(16.5)
    r_name.font.color.rgb = c_primary

    p_title = doc.add_paragraph()
    p_title.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(2.0)
    r_title = p_title.add_run("Full Stack Web & Mobile Software Engineer • Mahasiswa S1 Sistem Informasi UBSI")
    r_title.bold = True
    r_title.font.name = font_family
    r_title.font.size = Pt(9.8)
    r_title.font.color.rgb = c_primary

    p_contact = doc.add_paragraph()
    p_contact.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_contact.paragraph_format.space_before = Pt(0)
    p_contact.paragraph_format.space_after = Pt(2.0)

    r_loc = p_contact.add_run("Jakarta Pusat")
    r_loc.font.name = font_family
    r_loc.font.size = Pt(8.8)
    r_loc.font.color.rgb = c_body

    p_contact.add_run("  |  ").font.size = Pt(8.8)

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
    r_li_val = p_contact.add_run("in/dmswijanarko")
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
    p_div.paragraph_format.space_after = Pt(2.5)
    pPr = p_div._p.get_or_add_pPr()
    pBdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="12" w:space="1" w:color="0F172A"/></w:pBdr>')
    pPr.append(pBdr)

    # ==========================================
    # 2. RINGKASAN PERSONAL
    # ==========================================
    add_section_heading("Ringkasan Personal")
    p_sum = doc.add_paragraph()
    p_sum.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_sum.paragraph_format.space_before = Pt(1)
    p_sum.paragraph_format.space_after = Pt(2.5)
    p_sum.paragraph_format.line_spacing = 1.15
    summary_text = (
        "Mahasiswa S1 Sistem Informasi Universitas Bina Sarana Informatika (UBSI) dengan fondasi rekayasa perangkat lunak Web & Mobile serta analitik data. "
        "Berfokus pada perancangan aplikasi web modern menggunakan Laravel, aplikasi mobile lintas platform dengan Flutter, dan arsitektur basis data relasional tersertifikasi Database Administrator BNSP. "
        "Memiliki pengalaman industri di PT PGAS Telekomunikasi Nusantara (PGNCOM) dalam membangun sistem monitoring operasional dan dashboard interaktif Power BI. "
        "Memadukan ketelitian kode bersih, kepekaan estetika antarmuka (UI/UX), serta jiwa kepemimpinan aktif sebagai Ketua Umum PRISMA dan instruktur tamu RPL. "
        "Berdedikasi menghadirkan solusi teknologi yang efisien, skalabel, dan bernilai nyata bagi organisasi."
    )
    r_sum = p_sum.add_run(summary_text)
    r_sum.font.name = font_family
    r_sum.font.size = Pt(9.0)
    r_sum.font.color.rgb = c_body

    # ==========================================
    # 3. PENDIDIKAN FORMAL
    # ==========================================
    add_section_heading("Pendidikan Formal")

    # UBSI
    p_e1 = doc.add_paragraph()
    p_e1.paragraph_format.space_before = Pt(1)
    p_e1.paragraph_format.space_after = Pt(0.5)
    r_e1_title = p_e1.add_run("Universitas Bina Sarana Informatika (UBSI)")
    r_e1_title.bold = True
    r_e1_title.font.name = font_family
    r_e1_title.font.size = Pt(9.2)
    r_e1_title.font.color.rgb = c_primary

    r_e1_sub = p_e1.add_run(" - S1 Sistem Informasi")
    r_e1_sub.font.name = font_family
    r_e1_sub.font.size = Pt(9.2)
    r_e1_sub.font.color.rgb = c_primary

    r_e1_date = p_e1.add_run("\tSep 2023 - Sekarang (Aktif)")
    r_e1_date.italic = True
    r_e1_date.font.name = font_family
    r_e1_date.font.size = Pt(8.6)
    r_e1_date.font.color.rgb = c_muted

    p_e1_b = doc.add_paragraph()
    p_e1_b.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_e1_b.paragraph_format.left_indent = Inches(0.18)
    p_e1_b.paragraph_format.space_before = Pt(0)
    p_e1_b.paragraph_format.space_after = Pt(2.0)
    p_e1_b.paragraph_format.line_spacing = 1.15
    r_e1_b = p_e1_b.add_run("• Mata Kuliah Relevan: Pemrograman Web (Laravel), Pemrograman Mobile (Flutter & Dart), Rekayasa Perangkat Lunak, Basis Data Relasional & SQL, Sistem Informasi Manajemen.")
    r_e1_b.font.name = font_family
    r_e1_b.font.size = Pt(8.8)
    r_e1_b.font.color.rgb = c_body

    # SMK Negeri 31 Jakarta
    p_e2 = doc.add_paragraph()
    p_e2.paragraph_format.space_before = Pt(1)
    p_e2.paragraph_format.space_after = Pt(0.5)
    r_e2_title = p_e2.add_run("SMK Negeri 31 Jakarta")
    r_e2_title.bold = True
    r_e2_title.font.name = font_family
    r_e2_title.font.size = Pt(9.2)
    r_e2_title.font.color.rgb = c_primary

    r_e2_sub = p_e2.add_run(" - Kompetensi Keahlian Animasi")
    r_e2_sub.font.name = font_family
    r_e2_sub.font.size = Pt(9.2)
    r_e2_sub.font.color.rgb = c_primary

    r_e2_date = p_e2.add_run("\tJuli 2019 - Juli 2022")
    r_e2_date.italic = True
    r_e2_date.font.name = font_family
    r_e2_date.font.size = Pt(8.6)
    r_e2_date.font.color.rgb = c_muted

    p_e2_b = doc.add_paragraph()
    p_e2_b.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_e2_b.paragraph_format.left_indent = Inches(0.18)
    p_e2_b.paragraph_format.space_before = Pt(0)
    p_e2_b.paragraph_format.space_after = Pt(2.5)
    p_e2_b.paragraph_format.line_spacing = 1.15
    r_e2_b = p_e2_b.add_run("• Fokus Pembelajaran: Desain visual antarmuka pengguna (UI/UX), permodelan grafis digital, animasi komputer, dan komposisi aset multimedia.")
    r_e2_b.font.name = font_family
    r_e2_b.font.size = Pt(8.8)
    r_e2_b.font.color.rgb = c_body

    # ==========================================
    # 4. PENGALAMAN KERJA & MENGAJAR
    # ==========================================
    add_section_heading("Pengalaman Kerja & Mengajar")

    # Exp 1: PGNCOM
    p_x1 = doc.add_paragraph()
    p_x1.paragraph_format.space_before = Pt(1)
    p_x1.paragraph_format.space_after = Pt(0.5)
    r_x1_t = p_x1.add_run("Web Developer & Data Analytics Intern")
    r_x1_t.bold = True
    r_x1_t.font.name = font_family
    r_x1_t.font.size = Pt(9.2)
    r_x1_t.font.color.rgb = c_primary

    r_x1_i = p_x1.add_run(" - PT PGAS Telekomunikasi Nusantara (PGNCOM)")
    r_x1_i.font.name = font_family
    r_x1_i.font.size = Pt(9.2)
    r_x1_i.font.color.rgb = c_primary

    r_x1_d = p_x1.add_run("\tAgustus 2026 - November 2026")
    r_x1_d.italic = True
    r_x1_d.font.name = font_family
    r_x1_d.font.size = Pt(8.6)
    r_x1_d.font.color.rgb = c_muted

    bullets_x1 = [
        "• Mengembangkan sistem web internal Monitoring Realisasi Biaya & QC BASTO berbasis Laravel dan MySQL untuk mengotomasi alur validasi dokumen Berita Acara Serah Terima Operasional (BASTO) dan kepatuhan anggaran proyek.",
        "• Merancang dan mengintegrasikan dashboard visualisasi interaktif Microsoft Power BI menggunakan pemodelan data relasional dan kalkulasi formula DAX untuk memonitor deviasi realisasi biaya serta performa proyek secara real-time.",
        "• Mengimplementasikan manajemen hak akses berjenjang (RBAC) dan riwayat audit transaksi untuk menjamin integritas data operasional perusahaan.",
    ]
    for b in bullets_x1:
        p_b = doc.add_paragraph()
        p_b.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p_b.paragraph_format.left_indent = Inches(0.18)
        p_b.paragraph_format.space_before = Pt(0)
        p_b.paragraph_format.space_after = Pt(1.0)
        p_b.paragraph_format.line_spacing = 1.15
        r_b = p_b.add_run(b)
        r_b.font.name = font_family
        r_b.font.size = Pt(8.8)
        r_b.font.color.rgb = c_body

    # Exp 2: SMK Muhammadiyah 15
    p_x2 = doc.add_paragraph()
    p_x2.paragraph_format.space_before = Pt(1.5)
    p_x2.paragraph_format.space_after = Pt(0.5)
    r_x2_t = p_x2.add_run("Pengajar Tamu & Instruktur Rekayasa Perangkat Lunak (RPL)")
    r_x2_t.bold = True
    r_x2_t.font.name = font_family
    r_x2_t.font.size = Pt(9.2)
    r_x2_t.font.color.rgb = c_primary

    r_x2_i = p_x2.add_run(" - SMK Muhammadiyah 15 Jakarta")
    r_x2_i.font.name = font_family
    r_x2_i.font.size = Pt(9.2)
    r_x2_i.font.color.rgb = c_primary

    r_x2_d = p_x2.add_run("\t2025")
    r_x2_d.italic = True
    r_x2_d.font.name = font_family
    r_x2_d.font.size = Pt(8.6)
    r_x2_d.font.color.rgb = c_muted

    bullets_x2 = [
        "• Menjadi instruktur teknis tamu kurikulum web modern: pengenalan Framework Laravel, struktur arsitektur MVC, dan administrasi database MySQL.",
        "• Membimbing praktikum laboratorium komputer mengenai penerapan clean code dan simulasi alur kolaborasi version control Git & GitHub standar industri.",
    ]
    for b in bullets_x2:
        p_b = doc.add_paragraph()
        p_b.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p_b.paragraph_format.left_indent = Inches(0.18)
        p_b.paragraph_format.space_before = Pt(0)
        p_b.paragraph_format.space_after = Pt(1.0)
        p_b.paragraph_format.line_spacing = 1.15
        r_b = p_b.add_run(b)
        r_b.font.name = font_family
        r_b.font.size = Pt(8.8)
        r_b.font.color.rgb = c_body

    # Exp 3: Proyek Mandiri
    p_x3 = doc.add_paragraph()
    p_x3.paragraph_format.space_before = Pt(1.5)
    p_x3.paragraph_format.space_after = Pt(0.5)
    r_x3_t = p_x3.add_run("Pengembang Perangkat Lunak Web & Mobile (Full Stack)")
    r_x3_t.bold = True
    r_x3_t.font.name = font_family
    r_x3_t.font.size = Pt(9.2)
    r_x3_t.font.color.rgb = c_primary

    r_x3_i = p_x3.add_run(" - Proyek Independen & Klien")
    r_x3_i.font.name = font_family
    r_x3_i.font.size = Pt(9.2)
    r_x3_i.font.color.rgb = c_primary

    r_x3_d = p_x3.add_run("\t2023")
    r_x3_d.italic = True
    r_x3_d.font.name = font_family
    r_x3_d.font.size = Pt(8.6)
    r_x3_d.font.color.rgb = c_muted

    p_b3 = doc.add_paragraph()
    p_b3.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_b3.paragraph_format.left_indent = Inches(0.18)
    p_b3.paragraph_format.space_before = Pt(0)
    p_b3.paragraph_format.space_after = Pt(2.0)
    p_b3.paragraph_format.line_spacing = 1.15
    r_b3 = p_b3.add_run("• Merancang dan membangun aplikasi mobile (Flutter & Dart) serta web berskala enterprise terintegrasi RESTful API terstruktur dan database relasional.")
    r_b3.font.name = font_family
    r_b3.font.size = Pt(8.8)
    r_b3.font.color.rgb = c_body

    # ==========================================
    # 5. PENGALAMAN ORGANISASI
    # ==========================================
    add_section_heading("Pengalaman Organisasi")

    p_org = doc.add_paragraph()
    p_org.paragraph_format.space_before = Pt(1)
    p_org.paragraph_format.space_after = Pt(0.5)
    r_org_t = p_org.add_run("Ketua Umum")
    r_org_t.bold = True
    r_org_t.font.name = font_family
    r_org_t.font.size = Pt(9.2)
    r_org_t.font.color.rgb = c_primary

    r_org_i = p_org.add_run(" - Pengurus Remaja Islam Masjid (PRISMA)")
    r_org_i.font.name = font_family
    r_org_i.font.size = Pt(9.2)
    r_org_i.font.color.rgb = c_primary

    r_org_d = p_org.add_run("\t2023 - Sekarang (Aktif)")
    r_org_d.italic = True
    r_org_d.font.name = font_family
    r_org_d.font.size = Pt(8.6)
    r_org_d.font.color.rgb = c_muted

    org_bullets = [
        "• Memimpin organisasi kepemudaan masjid dalam merencanakan program kerja tahunan, rapat kepengurusan berkala, transparansi dana kas umat, serta koordinasi strategis DKM.",
        "• Menginisiasi dan mengeksekusi program sosial tahunan bulan Ramadhan: posko pemeriksaan medis gratis, santunan yatim dhuafa, dan buka puasa bersama ratusan jamaah.",
    ]
    for b in org_bullets:
        p_b = doc.add_paragraph()
        p_b.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p_b.paragraph_format.left_indent = Inches(0.18)
        p_b.paragraph_format.space_before = Pt(0)
        p_b.paragraph_format.space_after = Pt(1.0)
        p_b.paragraph_format.line_spacing = 1.15
        r_b = p_b.add_run(b)
        r_b.font.name = font_family
        r_b.font.size = Pt(8.8)
        r_b.font.color.rgb = c_body

    # ==========================================
    # 6. SERTIFIKASI KOMPETENSI & PENGHARGAAN RESMI
    # ==========================================
    add_section_heading("Sertifikasi Kompetensi & Penghargaan Resmi")

    certs = [
        ("Sertifikat Kompetensi Database Administrator",
         "- BNSP & LSP UBSI",
         "Mar 2026 - 2029",
         "• Dinyatakan Kompeten nasional dalam perancangan basis data relasional, kueri SQL lanjutan, indeks, dan integritas data."),
        ("Sertifikasi Kompetensi Analis Program (Program Analyst)",
         "- BNSP & LSP UBSI",
         "Agustus 2026 - 2029",
         "• Lulus asesmen 10 unit kompetensi SKKNI: skalabilitas sistem, SQL, algoritma, debugging, profiling, dan code review."),
        ("Juara 1 IT Bootcamp Software Development",
         "- FTI & Rektorat UBSI",
         "2025",
         "• Meraih Juara 1 tingkat nasional se-UBSI melalui platform Smart Tahfidz School (e-Sn: 19230181)."),
    ]
    for c_title, c_inst, c_date, c_desc in certs:
        p_c = doc.add_paragraph()
        p_c.paragraph_format.space_before = Pt(1.0)
        p_c.paragraph_format.space_after = Pt(0.5)
        
        r_ct = p_c.add_run(c_title + " ")
        r_ct.bold = True
        r_ct.font.name = font_family
        r_ct.font.size = Pt(9.2)
        r_ct.font.color.rgb = c_primary
        
        r_ci = p_c.add_run(c_inst)
        r_ci.font.name = font_family
        r_ci.font.size = Pt(9.2)
        r_ci.font.color.rgb = c_primary

        r_cd = p_c.add_run(f"\t{c_date}")
        r_cd.italic = True
        r_cd.font.name = font_family
        r_cd.font.size = Pt(8.6)
        r_cd.font.color.rgb = c_muted

        p_cd = doc.add_paragraph()
        p_cd.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p_cd.paragraph_format.left_indent = Inches(0.18)
        p_cd.paragraph_format.space_before = Pt(0)
        p_cd.paragraph_format.space_after = Pt(1.2)
        p_cd.paragraph_format.line_spacing = 1.15
        r_cd_txt = p_cd.add_run(c_desc)
        r_cd_txt.font.name = font_family
        r_cd_txt.font.size = Pt(8.8)
        r_cd_txt.font.color.rgb = c_body

    # ==========================================
    # 7. KETERAMPILAN
    # ==========================================
    add_section_heading("Keterampilan")

    skills_data = [
        ("Hard Skills", "Software Development, Web Development (Laravel, React.js, Tailwind CSS), Mobile Development (Flutter & Dart), Database Management (MySQL, SQL), Data Analysis (Microsoft Power BI, DAX), RESTful API, Git & GitHub."),
        ("Soft Skills", "Kerja Sama Tim, Komunikasi Efektif, Problem Solving, Kepemimpinan Organisasi, Manajemen Waktu, Kemampuan Beradaptasi."),
        ("Bahasa", "Bahasa Indonesia (Penutur Asli / Native), Bahasa Inggris (Menengah / Intermediate).")
    ]
    for s_label, s_val in skills_data:
        p_s = doc.add_paragraph()
        p_s.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p_s.paragraph_format.left_indent = Inches(0.18)
        p_s.paragraph_format.space_before = Pt(0)
        p_s.paragraph_format.space_after = Pt(1.0)
        p_s.paragraph_format.line_spacing = 1.15
        
        r_s_bullet = p_s.add_run("• ")
        r_s_bullet.font.name = font_family
        r_s_bullet.font.size = Pt(8.8)

        r_s_bold = p_s.add_run(f"{s_label}: ")
        r_s_bold.bold = True
        r_s_bold.font.name = font_family
        r_s_bold.font.size = Pt(8.8)
        r_s_bold.font.color.rgb = c_primary

        r_s_txt = p_s.add_run(s_val)
        r_s_txt.font.name = font_family
        r_s_txt.font.size = Pt(8.8)
        r_s_txt.font.color.rgb = c_body

    # Save to all destination paths
    for p in dest_paths:
        os.makedirs(os.path.dirname(p), exist_ok=True)
        try:
            doc.save(p)
            print(f"File Word CV ATS tersimpan di: {p}")
        except PermissionError:
            print(f"File sedang dibuka di Microsoft Word: {p}")
            alt_path = p.replace(".docx", "_Updated.docx")
            try:
                doc.save(alt_path)
                print(f"Tersimpan sebagai file alternatif di: {alt_path}")
            except Exception as e:
                print(f"Error saving alt: {e}")

if __name__ == "__main__":
    destinations = [
        r"C:\Users\Dimas Wijanarko\Desktop\CV_Dimas_Wijanarko_ATS.docx",
        r"C:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\storage\CV_Dimas_Wijanarko_ATS.docx",
        r"C:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\public\storage\CV_Dimas_Wijanarko_ATS.docx",
        r"C:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\public\CV_Dimas_Wijanarko_ATS.docx",
    ]
    build_docx_cv(destinations)
