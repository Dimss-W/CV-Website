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
    
    # Page Margins - Standard 0.55 in (40 pt) ATS friendly
    for section in doc.sections:
        section.top_margin = Inches(0.5)
        section.bottom_margin = Inches(0.5)
        section.left_margin = Inches(0.55)
        section.right_margin = Inches(0.55)
        section.page_width = Inches(8.27)   # A4 width
        section.page_height = Inches(11.69) # A4 height

    # Palette: Pure Black (Hitam Pekat Murni #000000), tanpa warna abu
    c_black = RGBColor(0, 0, 0)

    font_family = "Times New Roman"

    # Set normal style font
    normal_style = doc.styles['Normal']
    normal_style.font.name = font_family
    normal_style.font.size = Pt(9.8)
    normal_style.font.color.rgb = c_black

    def add_section_heading(title_text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(8.0)
        p.paragraph_format.space_after = Pt(3.0)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(title_text.upper())
        run.bold = True
        run.font.name = font_family
        run.font.size = Pt(11.0)
        run.font.color.rgb = c_black

        pPr = p._p.get_or_add_pPr()
        pBdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="8" w:space="1" w:color="000000"/></w:pBdr>')
        pPr.append(pBdr)
        return p

    def add_bullet(text_runs, is_sub=False):
        p = doc.add_paragraph()
        p.paragraph_format.left_indent = Inches(0.35 if is_sub else 0.2)
        p.paragraph_format.first_line_indent = Inches(-0.15)
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(2.2 if is_sub else 2.5)
        p.paragraph_format.line_spacing = 1.15
        
        # Bullet symbol
        r_sym = p.add_run("•  " if not is_sub else "-  ")
        r_sym.font.name = font_family
        r_sym.font.size = Pt(9.5 if is_sub else 9.8)
        r_sym.font.color.rgb = c_black
        
        for item in text_runs:
            if isinstance(item, str):
                r = p.add_run(item)
                r.font.name = font_family
                r.font.size = Pt(9.5 if is_sub else 9.8)
                r.font.color.rgb = c_black
            elif isinstance(item, tuple):
                # (text, is_bold, is_italic)
                txt = item[0]
                is_bold = item[1] if len(item) > 1 else False
                is_italic = item[2] if len(item) > 2 else False
                
                r = p.add_run(txt)
                r.font.name = font_family
                r.font.size = Pt(9.5 if is_sub else 9.8)
                r.bold = is_bold
                r.italic = is_italic
                r.font.color.rgb = c_black
        return p

    def add_table_item(left_title, right_date, sub_label=None):
        table = doc.add_table(rows=1, cols=2)
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        table.autofit = False
        
        table.columns[0].width = Inches(5.3)
        table.columns[1].width = Inches(1.87)
        
        for row in table.rows:
            trPr = row._tr.get_or_add_trPr()
            trPr.append(parse_xml(f'<w:cantSplit {nsdecls("w")}/>'))
            for cell in row.cells:
                tcPr = cell._tc.get_or_add_tcPr()
                tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="0" w:type="dxa"/><w:bottom w:w="40" w:type="dxa"/><w:left w:w="0" w:type="dxa"/><w:right w:w="0" w:type="dxa"/></w:tcMar>')
                tcPr.append(tcMar)
        
        c0 = table.cell(0, 0)
        c1 = table.cell(0, 1)
        
        p0 = c0.paragraphs[0]
        p0.paragraph_format.space_before = Pt(0)
        p0.paragraph_format.space_after = Pt(1.0)
        r0 = p0.add_run(left_title[0])
        r0.bold = True
        r0.font.name = font_family
        r0.font.size = Pt(10.0)
        r0.font.color.rgb = c_black
        
        if len(left_title) > 1:
            r0_sub = p0.add_run(left_title[1])
            r0_sub.font.name = font_family
            r0_sub.font.size = Pt(10.0)
            r0_sub.font.color.rgb = c_black
            
        if sub_label:
            p_sub = c0.add_paragraph()
            p_sub.paragraph_format.space_before = Pt(0)
            p_sub.paragraph_format.space_after = Pt(1.0)
            r_sub = p_sub.add_run(sub_label)
            r_sub.font.name = font_family
            r_sub.font.size = Pt(8.8)
            r_sub.italic = True
            r_sub.font.color.rgb = c_black
            
        p1 = c1.paragraphs[0]
        p1.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        p1.paragraph_format.space_before = Pt(0)
        p1.paragraph_format.space_after = Pt(1.0)
        r1 = p1.add_run(right_date)
        r1.italic = True
        r1.font.name = font_family
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = c_black

    # ==========================================
    # HALAMAN 1
    # ==========================================

    # 1. HEADER (NO PHOTO, SOLID BLACK)
    p_name = doc.add_paragraph()
    p_name.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_name.paragraph_format.space_before = Pt(0)
    p_name.paragraph_format.space_after = Pt(2.0)
    r_name = p_name.add_run("DIMAS WIJANARKO")
    r_name.bold = True
    r_name.font.name = font_family
    r_name.font.size = Pt(18.0)
    r_name.font.color.rgb = c_black

    p_title = doc.add_paragraph()
    p_title.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(3.0)
    r_title = p_title.add_run("Full Stack Web & Mobile Software Engineer • Mahasiswa S1 Sistem Informasi UBSI")
    r_title.bold = True
    r_title.font.name = font_family
    r_title.font.size = Pt(10.5)
    r_title.font.color.rgb = c_black

    # Baris Kontak 1
    p_c1 = doc.add_paragraph()
    p_c1.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_c1.paragraph_format.space_before = Pt(0)
    p_c1.paragraph_format.space_after = Pt(1.5)
    
    r1 = p_c1.add_run("Jakarta Pusat  •  Email: ")
    r1.font.size = Pt(9.5)
    r1.font.color.rgb = c_black
    r1_em = p_c1.add_run("dmswijanarko@gmail.com")
    r1_em.font.size = Pt(9.5)
    r1_em.underline = True
    r1_em.font.color.rgb = c_black
    r1_sep = p_c1.add_run("  •  Web: ")
    r1_sep.font.size = Pt(9.5)
    r1_sep.font.color.rgb = c_black
    r1_w = p_c1.add_run("dimaswijanarko.me")
    r1_w.font.size = Pt(9.5)
    r1_w.underline = True
    r1_w.font.color.rgb = c_black

    # Baris Kontak 2
    p_c2 = doc.add_paragraph()
    p_c2.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_c2.paragraph_format.space_before = Pt(0)
    p_c2.paragraph_format.space_after = Pt(4.0)

    r2 = p_c2.add_run("LinkedIn: ")
    r2.font.size = Pt(9.5)
    r2.font.color.rgb = c_black
    r2_li = p_c2.add_run("linkedin.com/in/dmswijanarko")
    r2_li.font.size = Pt(9.5)
    r2_li.underline = True
    r2_li.font.color.rgb = c_black
    r2_sep = p_c2.add_run("  •  GitHub: ")
    r2_sep.font.size = Pt(9.5)
    r2_sep.font.color.rgb = c_black
    r2_gh = p_c2.add_run("github.com/Dimss-W")
    r2_gh.font.size = Pt(9.5)
    r2_gh.underline = True
    r2_gh.font.color.rgb = c_black

    # Bottom border line for header
    pPr = p_c2._p.get_or_add_pPr()
    pBdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="12" w:space="2" w:color="000000"/></w:pBdr>')
    pPr.append(pBdr)

    # 2. RINGKASAN PERSONAL
    add_section_heading("Ringkasan Personal")
    
    p_sum1 = doc.add_paragraph()
    p_sum1.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_sum1.paragraph_format.space_before = Pt(0)
    p_sum1.paragraph_format.space_after = Pt(3.5)
    p_sum1.paragraph_format.line_spacing = 1.15
    p_sum1.add_run(
        "Mahasiswa S1 Sistem Informasi Universitas Bina Sarana Informatika (UBSI) dengan konsentrasi pada rekayasa perangkat lunak Web & Mobile serta analisis data. "
        "Memiliki pengalaman kerja industri di PT PGAS Telekomunikasi Nusantara (PGNCOM) dalam merancang dan mengembangkan sistem web operasional internal serta implementasi dashboard analitik interaktif berbasis Microsoft Power BI."
    )

    p_sum2 = doc.add_paragraph()
    p_sum2.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_sum2.paragraph_format.space_before = Pt(0)
    p_sum2.paragraph_format.space_after = Pt(4.0)
    p_sum2.paragraph_format.line_spacing = 1.15
    p_sum2.add_run(
        "Memiliki penguasaan teknis mendalam pada framework Laravel, ekosistem Flutter & Dart untuk aplikasi mobile lintas platform, serta manajemen basis data relasional tersertifikasi Database Administrator BNSP. "
        "Memadukan kedisiplinan penulisan kode bersih, pemahaman arsitektur perangkat lunak, serta kepemimpinan aktif dalam organisasi kemasyarakatan dan pengajaran teknis untuk menghadirkan solusi teknologi yang efisien, aman, dan berdaya guna."
    )

    # 3. PENDIDIKAN FORMAL
    add_section_heading("Pendidikan Formal")
    
    add_table_item(["Universitas Bina Sarana Informatika (UBSI)", " - S1 Sistem Informasi"], "Sep 2023 - Sekarang (Aktif)")
    add_bullet([
        "Mata Kuliah Relevan: Pemrograman Web (Laravel), Pemrograman Mobile (Flutter & Dart), Rekayasa Perangkat Lunak, Basis Data Relasional & SQL, Sistem Informasi Manajemen."
    ])
    
    add_table_item(["SMK Negeri 31 Jakarta", " - Kompetensi Keahlian Animasi"], "Juli 2019 - Juli 2022")
    add_bullet([
        "Fokus Pembelajaran: Desain visual antarmuka pengguna (UI/UX), permodelan grafis digital, animasi komputer, dan komposisi aset multimedia."
    ])

    # 4. PENGALAMAN KERJA & MENGAJAR
    add_section_heading("Pengalaman Kerja & Mengajar")

    add_table_item(["Web Developer & Data Analytics Intern", " - PT PGAS Telekomunikasi Nusantara (PGNCOM)"], "Agustus 2026 - November 2026")
    add_bullet([
        "Merancang dan mengembangkan sistem web internal ",
        ("Monitoring Realisasi Biaya & QC BASTO", False, True),
        " berbasis Laravel dan MySQL untuk mengotomasi alur validasi berkas Berita Acara Serah Terima Operasional (BASTO) dan kepatuhan anggaran proyek."
    ])
    add_bullet([
        "Membangun dashboard analitik interaktif berbasis Microsoft Power BI menggunakan pemodelan data relasional dan kalkulasi formula DAX untuk memonitor deviasi realisasi biaya serta tren performa operasional proyek secara real-time."
    ])
    add_bullet([
        "Mengimplementasikan mekanisme otentikasi Role-Based Access Control (RBAC) dan pencatatan audit log transaksi untuk menjamin integritas data dan kepatuhan tata kelola teknologi informasi perusahaan."
    ])

    add_table_item(["Pengajar Tamu & Instruktur Rekayasa Perangkat Lunak (RPL)", " - SMK Muhammadiyah 15 Jakarta"], "2025")
    add_bullet([
        "Menjadi instruktur teknis tamu kurikulum RPL, menyampaikan materi fundamental struktur arsitektur MVC, pengembangan web dengan Laravel, dan administrasi database MySQL."
    ])
    add_bullet([
        "Membimbing praktikum laboratorium komputer mengenai penerapan clean code, teknik debugging, dan simulasi alur kolaborasi version control Git & GitHub berstandar industri."
    ])

    add_table_item(["Pengembang Perangkat Lunak Web & Mobile (Full Stack)", " - Proyek Independen & Klien"], "2023 - Sekarang")
    add_bullet([
        "Merancang dan membangun aplikasi mobile lintas platform (Flutter & Dart) serta sistem web responsif yang terintegrasi dengan arsitektur RESTful API terstruktur dan database relasional."
    ])
    add_bullet([
        "Menerapkan prinsip rekayasa perangkat lunak modern, optimalisasi performa rendering antarmuka, dan keamanan data pengguna pada setiap produk aplikasi yang dikembangkan."
    ])

    # ==========================================
    # HALAMAN 2
    # ==========================================
    doc.add_page_break()

    # 5. PENGALAMAN ORGANISASI
    add_section_heading("Pengalaman Organisasi")

    add_table_item(["Ketua Umum", " - Pengurus Remaja Islam Masjid (PRISMA)"], "2023 - Sekarang (Aktif)")
    add_bullet([
        "Memimpin arah strategis organisasi kepemudaan, mengoordinasikan seluruh jajaran pengurus divisi, menyusun program kerja tahunan, serta memelihara akuntabilitas pengelolaan anggaran kas organisasi."
    ])
    add_bullet([
        "Menjalin komunikasi dan koordinasi berkala bersama Dewan Kemakmuran Masjid (DKM), tokoh masyarakat, dan aparatur wilayah dalam rangka sinergi pembinaan pemuda lingkungan."
    ])
    add_bullet([
        "Menginisiasi dan memimpin penyelenggaraan rangkaian program sosial-keagamaan tahunan dengan ratusan penerima manfaat:"
    ])
    add_bullet([
        ("Layanan Pemeriksaan Medis Gratis: ", True),
        "Menyelenggarakan posko kesehatan cuma-cuma bagi warga lanjut usia dan dhuafa bekerja sama dengan tim tenaga medis profesional."
    ], is_sub=True)
    add_bullet([
        ("Santunan Sosial Yatim & Dhuafa: ", True),
        "Menggalang dana donasi umat serta mendistribusikan santunan tunai dan puluhan paket sembako kepada mustahik."
    ], is_sub=True)
    add_bullet([
        ("Syiar Pemuda & Kajian Akbar: ", True),
        "Mengoordinasikan kepanitiaan teknis acara tabligh akbar, buka puasa bersama, dan kajian kepemudaan secara tertib dan terjadwal."
    ], is_sub=True)

    # 6. SERTIFIKASI KOMPETENSI & PENGHARGAAN RESMI
    add_section_heading("Sertifikasi Kompetensi & Penghargaan Resmi")

    add_table_item(
        ["Sertifikat Kompetensi Database Administrator (DBA)"],
        "Maret 2026 - 2029",
        sub_label="Badan Nasional Sertifikasi Profesi (BNSP) & Lembaga Sertifikasi Profesi (LSP) UBSI"
    )
    add_bullet([
        "Dinyatakan Kompeten secara nasional dalam perancangan arsitektur basis data relasional, normalisasi skema ERD, optimalisasi kueri SQL lanjutan, indexing performa tinggi, serta pemeliharaan integritas dan keamanan data."
    ])

    add_table_item(
        ["Sertifikasi Kompetensi Analis Program (Program Analyst)"],
        "Agustus 2026 - 2029",
        sub_label="Badan Nasional Sertifikasi Profesi (BNSP) & Lembaga Sertifikasi Profesi (LSP) UBSI"
    )
    add_bullet([
        "Lulus uji asesmen 10 unit kompetensi standar SKKNI: analisis spesifikasi perangkat lunak, perancangan algoritma efisien, skalabilitas struktur data, teknik debugging, code profiling, dan pengujian program (software testing)."
    ])

    add_table_item(
        ["Juara 1 IT Bootcamp Software Development"],
        "2025",
        sub_label="Fakultas Teknologi Informasi (FTI) & Rektorat Universitas Bina Sarana Informatika"
    )
    add_bullet([
        "Meraih predikat Juara 1 tingkat nasional mengungguli seluruh tim mahasiswa kampus cabang UBSI se-Indonesia melalui inovasi platform Smart Tahfidz School (Nomor Sertifikat e-Sn: 19230181)."
    ])

    # 7. KETERAMPILAN
    add_section_heading("Keterampilan")

    # Postman API, Windows OS, Linux CLI telah dihapus
    skills_data = [
        ("Hard Skills (Teknis)", "Software Development, Web Development (PHP, Laravel, React.js, Next.js, Tailwind CSS), Mobile Development (Dart, Flutter), Database Management (MySQL, PostgreSQL, Optimasi Kueri SQL), Data Analytics (Microsoft Power BI, Formula DAX), Arsitektur RESTful API, Version Control (Git & GitHub)."),
        ("Tools & Lingkungan", "Git, GitHub, Visual Studio Code, Microsoft Power BI Desktop."),
        ("Soft Skills (Interpersonal)", "Kerja Sama Tim (Teamwork), Komunikasi Efektif & Presentasi Teknis, Problem Solving & Berpikir Analitis, Kepemimpinan Organisasi, Manajemen Waktu & Skala Prioritas, Kemampuan Beradaptasi Cepat."),
        ("Kemampuan Bahasa", "Bahasa Indonesia (Penutur Asli / Native), Bahasa Inggris (Tingkat Menengah / Intermediate).")
    ]
    for label, val in skills_data:
        add_bullet([
            (f"{label}: ", True),
            val
        ])

    for path in dest_paths:
        try:
            os.makedirs(os.path.dirname(path), exist_ok=True)
            doc.save(path)
            print(f"DOCX CV Pure Black saved successfully at: {path}")
        except Exception as e:
            print(f"Error saving to {path}: {e}")
            alt_path = path.replace(".docx", "_Updated.docx")
            try:
                doc.save(alt_path)
                print(f"DOCX CV saved to alternate path: {alt_path}")
            except Exception as e2:
                print(f"Failed alternate save: {e2}")

if __name__ == "__main__":
    paths = [
        r"c:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\public\CV_Dimas_Wijanarko_ATS.docx",
        r"c:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\storage\CV_Dimas_Wijanarko_ATS.docx",
        r"C:\Users\Dimas Wijanarko\Desktop\CV_Dimas_Wijanarko_ATS.docx"
    ]
    build_docx_cv(paths)
