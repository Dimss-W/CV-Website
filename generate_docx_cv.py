import os
import shutil
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

def build_docx_cv(dest_paths):
    doc = docx.Document()
    
    # Set Document Metadata
    doc.core_properties.title = "CV - Dimas Wijanarko"
    doc.core_properties.author = "Dimas Wijanarko"
    doc.core_properties.subject = "Curriculum Vitae Dimas Wijanarko - Full Stack Web & Mobile Software Engineer"
    doc.core_properties.creator = "Dimas Wijanarko"
    
    # Page Margins - Compact 1-Page Format
    for section in doc.sections:
        section.top_margin = Inches(0.35)
        section.bottom_margin = Inches(0.35)
        section.left_margin = Inches(0.5)
        section.right_margin = Inches(0.5)
        section.page_width = Inches(8.27)   # A4 width
        section.page_height = Inches(11.69) # A4 height

    # Palette: Pure Black #000000 Everywhere
    c_black = RGBColor(0, 0, 0)
    c_badge_bg = "F8FAFC" # Clean neutral light background

    font_family = "Times New Roman"

    normal_style = doc.styles['Normal']
    normal_style.font.name = font_family
    normal_style.font.size = Pt(8.6)
    normal_style.font.color.rgb = c_black

    def add_section_divider(title_text):
        p = doc.add_paragraph()
        p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.space_before = Pt(4.5)
        p.paragraph_format.space_after = Pt(2.0)
        p.paragraph_format.keep_with_next = True
        
        # Format: ────────  ■  TITLE  ■  ────────
        r_line1 = p.add_run("────────  ")
        r_line1.font.name = font_family
        r_line1.font.size = Pt(8.5)
        r_line1.font.color.rgb = c_black
        
        r_sq1 = p.add_run("■  ")
        r_sq1.font.name = font_family
        r_sq1.font.size = Pt(7.5)
        r_sq1.font.color.rgb = c_black
        
        r_title = p.add_run(title_text.upper())
        r_title.bold = True
        r_title.font.name = font_family
        r_title.font.size = Pt(9.0)
        r_title.font.color.rgb = c_black
        
        r_sq2 = p.add_run("  ■")
        r_sq2.font.name = font_family
        r_sq2.font.size = Pt(7.5)
        r_sq2.font.color.rgb = c_black
        
        r_line2 = p.add_run("  ────────")
        r_line2.font.name = font_family
        r_line2.font.size = Pt(8.5)
        r_line2.font.color.rgb = c_black
        return p

    def add_item_row(role_text, comp_text, date_text):
        table = doc.add_table(rows=1, cols=2)
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        table.autofit = False
        
        table.columns[0].width = Inches(5.35)
        table.columns[1].width = Inches(1.92)
        
        for row in table.rows:
            trPr = row._tr.get_or_add_trPr()
            trPr.append(parse_xml(f'<w:cantSplit {nsdecls("w")}/>'))
            for cell in row.cells:
                tcPr = cell._tc.get_or_add_tcPr()
                tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="0" w:type="dxa"/><w:bottom w:w="20" w:type="dxa"/><w:left w:w="0" w:type="dxa"/><w:right w:w="0" w:type="dxa"/></w:tcMar>')
                tcPr.append(tcMar)
        
        c0 = table.cell(0, 0)
        c1 = table.cell(0, 1)
        
        p0 = c0.paragraphs[0]
        p0.paragraph_format.space_before = Pt(0)
        p0.paragraph_format.space_after = Pt(1.0)
        r0 = p0.add_run(role_text)
        r0.bold = True
        r0.font.name = font_family
        r0.font.size = Pt(9.0)
        r0.font.color.rgb = c_black
        
        if comp_text:
            r0_sp = p0.add_run(" – ")
            r0_sp.font.name = font_family
            r0_sp.font.size = Pt(9.0)
            r0_sp.font.color.rgb = c_black
            r0_c = p0.add_run(comp_text)
            r0_c.italic = True
            r0_c.font.name = font_family
            r0_c.font.size = Pt(9.0)
            r0_c.font.color.rgb = c_black
            
        p1 = c1.paragraphs[0]
        p1.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        p1.paragraph_format.space_before = Pt(0)
        p1.paragraph_format.space_after = Pt(1.0)
        r1 = p1.add_run(date_text)
        r1.italic = True
        r1.font.name = font_family
        r1.font.size = Pt(8.5)
        r1.font.color.rgb = c_black

    def add_bullet(text):
        p = doc.add_paragraph()
        p.paragraph_format.left_indent = Inches(0.18)
        p.paragraph_format.first_line_indent = Inches(-0.14)
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(1.5)
        p.paragraph_format.line_spacing = 1.12
        
        r_sym = p.add_run("•  ")
        r_sym.font.name = font_family
        r_sym.font.size = Pt(8.5)
        r_sym.font.color.rgb = c_black
        
        r_rest = p.add_run(text)
        r_rest.font.name = font_family
        r_rest.font.size = Pt(8.5)
        r_rest.font.color.rgb = c_black
        return p

    # ==========================================
    # 1. HEADER (ALL BLACK, JAKARTA PUSAT, DKI JAKARTA)
    # ==========================================
    p_name = doc.add_paragraph()
    p_name.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_name.paragraph_format.space_before = Pt(0)
    p_name.paragraph_format.space_after = Pt(1.5)
    r_name = p_name.add_run("Dimas Wijanarko")
    r_name.bold = True
    r_name.font.name = font_family
    r_name.font.size = Pt(20.0)
    r_name.font.color.rgb = c_black

    p_tag = doc.add_paragraph()
    p_tag.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_tag.paragraph_format.space_before = Pt(0)
    p_tag.paragraph_format.space_after = Pt(2.0)
    r_tag = p_tag.add_run("FULL STACK WEB & MOBILE DEVELOPER  |  DATA ANALYTICS  |  S1 SISTEM INFORMASI")
    r_tag.bold = True
    r_tag.font.name = font_family
    r_tag.font.size = Pt(9.0)
    r_tag.font.color.rgb = c_black

    p_cnt = doc.add_paragraph()
    p_cnt.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_cnt.paragraph_format.space_before = Pt(0)
    p_cnt.paragraph_format.space_after = Pt(2.5)
    r_cnt = p_cnt.add_run("Jakarta Pusat, DKI Jakarta  |  dmswijanarko@gmail.com  |  dimaswijanarko.me  |  linkedin.com/in/dmswijanarko  |  github.com/Dimss-W")
    r_cnt.font.name = font_family
    r_cnt.font.size = Pt(8.2)
    r_cnt.font.color.rgb = c_black

    # Double bottom border on header
    pPr = p_cnt._p.get_or_add_pPr()
    pBdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="double" w:sz="12" w:space="3" w:color="000000"/></w:pBdr>')
    pPr.append(pBdr)

    # ==========================================
    # 2. RINGKASAN PERSONAL
    # ==========================================
    add_section_divider("Ringkasan Personal")
    
    p_sum = doc.add_paragraph()
    p_sum.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_sum.paragraph_format.space_before = Pt(0)
    p_sum.paragraph_format.space_after = Pt(2.5)
    p_sum.paragraph_format.line_spacing = 1.15
    p_sum.add_run(
        "Mahasiswa S1 Sistem Informasi Universitas Bina Sarana Informatika (UBSI) dengan konsentrasi rekayasa perangkat lunak Web & Mobile serta analisis data. "
        "Memiliki pengalaman kerja industri di PT PGAS Telekomunikasi Nusantara (PGNCOM) dalam merancang sistem monitoring biaya dan dashboard analitik Power BI. "
        "Terbiasa membangun aplikasi menggunakan Laravel, Flutter, dan manajemen database MySQL tersertifikasi Database Administrator BNSP, "
        "serta aktif memimpin organisasi kepemudaan PRISMA. Berorientasi pada solusi teknologi yang efisien, terstruktur, dan bernilai guna nyata."
    )

    # ==========================================
    # 3. PENGALAMAN KERJA & MENGAJAR
    # ==========================================
    add_section_divider("Pengalaman Kerja & Mengajar")

    add_item_row("Web Developer & Data Analytics Intern", "PT PGAS Telekomunikasi Nusantara (PGNCOM)", "Agustus 2026 – November 2026")
    add_bullet("Mengembangkan sistem web internal Monitoring Realisasi Biaya & QC BASTO berbasis Laravel & MySQL untuk otomatisasi validasi berkas operasional.")
    add_bullet("Merancang dashboard interaktif Microsoft Power BI dengan pemodelan data relasional dan kalkulasi formula DAX untuk memonitor deviasi biaya proyek.")
    add_bullet("Mengimplementasikan manajemen hak akses berjenjang (RBAC) dan audit log transaksi untuk menjaga keamanan serta integritas data operasional.")

    add_item_row("Pengajar Tamu & Instruktur Rekayasa Perangkat Lunak", "SMK Muhammadiyah 15 Jakarta", "2025")
    add_bullet("Menjadi instruktur kurikulum RPL: menyampaikan materi dasar framework Laravel, struktur arsitektur MVC, dan administrasi database MySQL.")
    add_bullet("Membimbing praktikum laboratorium komputer: penerapan clean code, teknik debugging, serta simulasi version control Git & GitHub berstandar industri.")

    add_item_row("Pengembang Perangkat Lunak Web & Mobile (Full Stack)", "Proyek Independen & Klien", "2023 – Sekarang")
    add_bullet("Merancang dan membangun aplikasi mobile lintas platform (Flutter & Dart) serta sistem web responsif terintegrasi dengan RESTful API terstruktur.")

    # ==========================================
    # 4. PENGALAMAN ORGANISASI
    # ==========================================
    add_section_divider("Pengalaman Organisasi")

    add_item_row("Ketua Umum", "Pengurus Remaja Islam Masjid (PRISMA)", "2023 – Sekarang (Aktif)")
    add_bullet("Memimpin arah strategis organisasi kepemudaan, mengoordinasikan jajaran divisi kepengurusan, menyusun program kerja tahunan, serta akuntabilitas kas.")
    add_bullet("Menginisiasi program sosial kemanusiaan rutin: layanan pemeriksaan kesehatan gratis, santunan yatim dhuafa, dan tabligh akbar kepemudaan.")

    # ==========================================
    # 5. PENDIDIKAN FORMAL (DENGAN IPK 3.82)
    # ==========================================
    add_section_divider("Pendidikan Formal")

    add_item_row("Universitas Bina Sarana Informatika (UBSI)", "S1 Sistem Informasi", "2023 – Sekarang (Aktif)")
    add_bullet("IPK: 3.82 / 4.00")
    add_bullet("Mata Kuliah Relevan: Pemrograman Web (Laravel), Pemrograman Mobile (Flutter & Dart), Rekayasa Perangkat Lunak, Basis Data Relasional & SQL.")

    add_item_row("SMK Negeri 31 Jakarta", "Kompetensi Keahlian Animasi", "2019 – 2022")
    add_bullet("Fokus Keahlian: Desain antarmuka pengguna (UI/UX), permodelan grafis digital, animasi komputer, dan komposisi aset multimedia.")

    # ==========================================
    # 6. SERTIFIKASI KOMPETENSI & PENGHARGAAN
    # ==========================================
    add_section_divider("Sertifikasi Kompetensi & Penghargaan")

    add_item_row("Sertifikat Kompetensi Database Administrator (DBA)", "BNSP & LSP UBSI", "2026 – 2029")
    add_bullet("Kompeten nasional: perancangan basis data relasional, penulisan kueri SQL lanjutan, optimasi indeks, dan integritas data.")

    add_item_row("Sertifikasi Kompetensi Analis Program (Program Analyst)", "BNSP & LSP UBSI", "2026 – 2029")
    add_bullet("Lulus asesmen 10 unit kompetensi SKKNI: spesifikasi perangkat lunak, algoritma, debugging, profiling, dan software testing.")

    add_item_row("Juara 1 IT Bootcamp Software Development", "FTI & Rektorat UBSI", "2025")
    add_bullet("Juara 1 tingkat nasional se-UBSI melalui platform Smart Tahfidz School (e-Sn: 19230181).")

    # ==========================================
    # 7. CORE SKILLS (SEMUA HITAM & RAPI)
    # ==========================================
    add_section_divider("Core Skills")

    skills_data = [
        ("Hard Skills", "Software Development • Web Development (PHP, Laravel, React.js, Next.js, Tailwind CSS) • Mobile Development (Dart, Flutter) • Database Management (MySQL, Optimasi SQL) • Data Analytics (Microsoft Power BI, DAX) • RESTful API"),
        ("Tools", "Git • GitHub • Visual Studio Code • Microsoft Power BI Desktop"),
        ("Soft Skills", "Kerja Sama Tim (Teamwork) • Komunikasi Efektif • Problem Solving & Analitis • Kepemimpinan Organisasi • Manajemen Waktu • Kemampuan Beradaptasi"),
        ("Bahasa", "Bahasa Indonesia (Penutur Asli / Native) • Bahasa Inggris (Tingkat Menengah / Intermediate)")
    ]

    table_s = doc.add_table(rows=len(skills_data), cols=2)
    table_s.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_s.autofit = False
    table_s.columns[0].width = Inches(1.15)
    table_s.columns[1].width = Inches(6.12)

    for i, (cat, items) in enumerate(skills_data):
        row = table_s.rows[i]
        c_badge = row.cells[0]
        c_content = row.cells[1]

        tcPr0 = c_badge._tc.get_or_add_tcPr()
        shd0 = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{c_badge_bg}"/>')
        tcPr0.append(shd0)
        tcMar0 = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="40" w:type="dxa"/><w:bottom w:w="40" w:type="dxa"/><w:left w:w="40" w:type="dxa"/><w:right w:w="40" w:type="dxa"/></w:tcMar>')
        tcPr0.append(tcMar0)

        p_b = c_badge.paragraphs[0]
        p_b.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_b.paragraph_format.space_before = Pt(0)
        p_b.paragraph_format.space_after = Pt(0)
        r_b = p_b.add_run(cat)
        r_b.bold = True
        r_b.font.name = font_family
        r_b.font.size = Pt(8.5)
        r_b.font.color.rgb = c_black

        tcPr1 = c_content._tc.get_or_add_tcPr()
        tcMar1 = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="30" w:type="dxa"/><w:bottom w:w="30" w:type="dxa"/><w:left w:w="80" w:type="dxa"/><w:right w:w="0" w:type="dxa"/></w:tcMar>')
        tcPr1.append(tcMar1)

        p_c = c_content.paragraphs[0]
        p_c.paragraph_format.space_before = Pt(0)
        p_c.paragraph_format.space_after = Pt(0)
        p_c.paragraph_format.line_spacing = 1.12
        r_c = p_c.add_run(items)
        r_c.font.name = font_family
        r_c.font.size = Pt(8.3)
        r_c.font.color.rgb = c_black

    for path in dest_paths:
        try:
            os.makedirs(os.path.dirname(path), exist_ok=True)
            doc.save(path)
            print(f"DOCX Reference Style CV saved at: {path}")
        except Exception as e:
            print(f"Error saving to {path}: {e}")
            alt_path = path.replace(".docx", "_Updated.docx")
            try:
                doc.save(alt_path)
                print(f"Saved alternate DOCX at: {alt_path}")
            except Exception as e2:
                print(f"Failed alternate save: {e2}")

if __name__ == "__main__":
    paths = [
        r"c:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\public\CV_Dimas_Wijanarko_ATS.docx",
        r"c:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\storage\CV_Dimas_Wijanarko_ATS.docx",
        r"C:\Users\Dimas Wijanarko\Desktop\CV_Dimas_Wijanarko_ATS.docx"
    ]
    build_docx_cv(paths)
