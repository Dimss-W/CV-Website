import os
import shutil
import pymupdf
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT, TA_RIGHT

def build_ats_cv(output_path):
    # Standar A4 dengan margin 40pt horizontal dan 38pt vertikal yang proporsional
    margin_lr = 40
    margin_tb = 38
    usable_w = A4[0] - (margin_lr * 2)

    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=margin_lr,
        rightMargin=margin_lr,
        topMargin=margin_tb,
        bottomMargin=margin_tb
    )

    # Warna teks hitam pekat murni (Pure Black #000000), tanpa warna abu
    c_black = colors.black

    styles = getSampleStyleSheet()

    name_style = ParagraphStyle(
        'HeaderName',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=18.0,
        leading=22.0,
        textColor=c_black,
        alignment=TA_CENTER,
        spaceAfter=3.0,
    )

    tagline_style = ParagraphStyle(
        'HeaderTagline',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=10.5,
        leading=14.0,
        textColor=c_black,
        alignment=TA_CENTER,
        spaceAfter=4.0,
    )

    contact_style = ParagraphStyle(
        'HeaderContact',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=9.5,
        leading=14.0,
        textColor=c_black,
        alignment=TA_CENTER,
        spaceAfter=2.0,
    )

    section_header_style = ParagraphStyle(
        'SectionHeader',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=11.0,
        leading=15.0,
        textColor=c_black,
        spaceBefore=8.0,
        spaceAfter=3.0,
        keepWithNext=True,
    )

    item_title_style = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=10.0,
        leading=14.2,
        textColor=c_black,
        alignment=TA_LEFT,
    )

    item_date_style = ParagraphStyle(
        'ItemDate',
        parent=styles['Normal'],
        fontName='Times-Italic',
        fontSize=9.5,
        leading=14.2,
        textColor=c_black,
        alignment=TA_RIGHT,
    )

    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=9.8,
        leading=14.2,
        textColor=c_black,
        alignment=TA_JUSTIFY,
        spaceAfter=3.5,
    )

    bullet_style = ParagraphStyle(
        'DocBullet',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=9.8,
        leading=14.2,
        textColor=c_black,
        alignment=TA_JUSTIFY,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=2.5,
    )

    sub_bullet_style = ParagraphStyle(
        'DocSubBullet',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=9.5,
        leading=13.8,
        textColor=c_black,
        alignment=TA_JUSTIFY,
        leftIndent=24,
        firstLineIndent=-8,
        spaceAfter=2.2,
    )

    def section_heading(title_text):
        return [
            Paragraph(title_text.upper(), section_header_style),
            HRFlowable(width="100%", thickness=0.8, color=c_black, spaceAfter=5.0, spaceBefore=2.0)
        ]

    story = []

    # ==========================================
    # HALAMAN 1
    # ==========================================

    # 1. HEADER (NO PHOTO, FULL WIDTH CENTERED, CLEAN LINKS, SOLID BLACK)
    story.append(Paragraph("DIMAS WIJANARKO", name_style))
    story.append(Paragraph("Full Stack Web & Mobile Software Engineer • Mahasiswa S1 Sistem Informasi UBSI", tagline_style))
    
    contact_p1 = "Jakarta Pusat &nbsp;•&nbsp; Email: <a href='mailto:dmswijanarko@gmail.com' color='#000000'><u>dmswijanarko@gmail.com</u></a> &nbsp;•&nbsp; Web: <a href='https://dimaswijanarko.me' color='#000000'><u>dimaswijanarko.me</u></a>"
    contact_p2 = "LinkedIn: <a href='https://linkedin.com/in/dmswijanarko' color='#000000'><u>linkedin.com/in/dmswijanarko</u></a> &nbsp;•&nbsp; GitHub: <a href='https://github.com/Dimss-W' color='#000000'><u>github.com/Dimss-W</u></a>"
    story.append(Paragraph(contact_p1, contact_style))
    story.append(Paragraph(contact_p2, contact_style))
    story.append(Spacer(1, 2.0))
    story.append(HRFlowable(width="100%", thickness=1.0, color=c_black, spaceAfter=5.0, spaceBefore=2.0))

    # 2. RINGKASAN PERSONAL
    for elem in section_heading("Ringkasan Personal"):
        story.append(elem)

    p1 = (
        "Mahasiswa S1 Sistem Informasi Universitas Bina Sarana Informatika (UBSI) dengan konsentrasi pada rekayasa perangkat lunak Web & Mobile serta analisis data. "
        "Memiliki pengalaman kerja industri di PT PGAS Telekomunikasi Nusantara (PGNCOM) dalam merancang dan mengembangkan sistem web operasional internal serta implementasi dashboard analitik interaktif berbasis Microsoft Power BI."
    )
    p2 = (
        "Memiliki penguasaan teknis mendalam pada framework Laravel, ekosistem Flutter & Dart untuk aplikasi mobile lintas platform, serta manajemen basis data relasional tersertifikasi Database Administrator BNSP. "
        "Memadukan kedisiplinan penulisan kode bersih, pemahaman arsitektur perangkat lunak, serta kepemimpinan aktif dalam organisasi kemasyarakatan dan pengajaran teknis untuk menghadirkan solusi teknologi yang efisien, aman, dan berdaya guna."
    )
    story.append(Paragraph(p1, body_style))
    story.append(Paragraph(p2, body_style))
    story.append(Spacer(1, 4.0))

    # 3. PENDIDIKAN FORMAL
    for elem in section_heading("Pendidikan Formal"):
        story.append(elem)

    edu1_t = Table([
        [Paragraph("<b>Universitas Bina Sarana Informatika (UBSI)</b> - S1 Sistem Informasi", item_title_style),
         Paragraph("Sep 2023 - Sekarang (Aktif)", item_date_style)],
    ], colWidths=[usable_w - 150, 150])
    edu1_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2.5)]))
    story.append(edu1_t)
    story.append(Paragraph("• Mata Kuliah Relevan: Pemrograman Web (Laravel), Pemrograman Mobile (Flutter & Dart), Rekayasa Perangkat Lunak, Basis Data Relasional & SQL, Sistem Informasi Manajemen.", bullet_style))
    story.append(Spacer(1, 4.0))

    edu2_t = Table([
        [Paragraph("<b>SMK Negeri 31 Jakarta</b> - Kompetensi Keahlian Animasi", item_title_style),
         Paragraph("Juli 2019 - Juli 2022", item_date_style)],
    ], colWidths=[usable_w - 150, 150])
    edu2_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2.5)]))
    story.append(edu2_t)
    story.append(Paragraph("• Fokus Pembelajaran: Desain visual antarmuka pengguna (UI/UX), permodelan grafis digital, animasi komputer, dan komposisi aset multimedia.", bullet_style))
    story.append(Spacer(1, 5.0))

    # 4. PENGALAMAN KERJA & MENGAJAR
    for elem in section_heading("Pengalaman Kerja & Mengajar"):
        story.append(elem)

    exp1_t = Table([
        [Paragraph("<b>Web Developer & Data Analytics Intern</b> - PT PGAS Telekomunikasi Nusantara (PGNCOM)", item_title_style),
         Paragraph("Agustus 2026 - November 2026", item_date_style)],
    ], colWidths=[usable_w - 160, 160])
    exp1_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2.5)]))
    story.append(exp1_t)
    story.append(Paragraph("• Merancang dan mengembangkan sistem web internal <i>Monitoring Realisasi Biaya & QC BASTO</i> berbasis Laravel dan MySQL untuk mengotomasi alur validasi berkas Berita Acara Serah Terima Operasional (BASTO) dan kepatuhan anggaran proyek.", bullet_style))
    story.append(Paragraph("• Membangun dashboard analitik interaktif berbasis Microsoft Power BI menggunakan pemodelan data relasional dan kalkulasi formula DAX untuk memonitor deviasi realisasi biaya serta tren performa operasional proyek secara real-time.", bullet_style))
    story.append(Paragraph("• Mengimplementasikan mekanisme otentikasi Role-Based Access Control (RBAC) dan pencatatan audit log transaksi untuk menjamin integritas data dan kepatuhan tata kelola teknologi informasi perusahaan.", bullet_style))
    story.append(Spacer(1, 4.0))

    exp2_t = Table([
        [Paragraph("<b>Pengajar Tamu & Instruktur Rekayasa Perangkat Lunak (RPL)</b> - SMK Muhammadiyah 15 Jakarta", item_title_style),
         Paragraph("2025", item_date_style)],
    ], colWidths=[usable_w - 150, 150])
    exp2_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2.5)]))
    story.append(exp2_t)
    story.append(Paragraph("• Menjadi instruktur teknis tamu kurikulum RPL, menyampaikan materi fundamental struktur arsitektur MVC, pengembangan web dengan Laravel, dan administrasi database MySQL.", bullet_style))
    story.append(Paragraph("• Membimbing praktikum laboratorium komputer mengenai penerapan clean code, teknik debugging, dan simulasi alur kolaborasi version control Git & GitHub berstandar industri.", bullet_style))
    story.append(Spacer(1, 4.0))

    exp3_t = Table([
        [Paragraph("<b>Pengembang Perangkat Lunak Web & Mobile (Full Stack)</b> - Proyek Independen & Klien", item_title_style),
         Paragraph("2023 - Sekarang", item_date_style)],
    ], colWidths=[usable_w - 150, 150])
    exp3_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2.5)]))
    story.append(exp3_t)
    story.append(Paragraph("• Merancang dan membangun aplikasi mobile lintas platform (Flutter & Dart) serta sistem web responsif yang terintegrasi dengan arsitektur RESTful API terstruktur dan database relasional.", bullet_style))
    story.append(Paragraph("• Menerapkan prinsip rekayasa perangkat lunak modern, optimalisasi performa rendering antarmuka, dan keamanan data pengguna pada setiap produk aplikasi yang dikembangkan.", bullet_style))

    # ==========================================
    # HALAMAN 2
    # ==========================================
    story.append(PageBreak())

    # 5. PENGALAMAN ORGANISASI
    for elem in section_heading("Pengalaman Organisasi"):
        story.append(elem)

    org_t = Table([
        [Paragraph("<b>Ketua Umum</b> - Pengurus Remaja Islam Masjid (PRISMA)", item_title_style),
         Paragraph("2023 - Sekarang (Aktif)", item_date_style)],
    ], colWidths=[usable_w - 150, 150])
    org_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2.5)]))
    story.append(org_t)
    story.append(Paragraph("• Memimpin arah strategis organisasi kepemudaan, mengoordinasikan seluruh jajaran pengurus divisi, menyusun program kerja tahunan, serta memelihara akuntabilitas pengelolaan anggaran kas organisasi.", bullet_style))
    story.append(Paragraph("• Menjalin komunikasi dan koordinasi berkala bersama Dewan Kemakmuran Masjid (DKM), tokoh masyarakat, dan aparatur wilayah dalam rangka sinergi pembinaan pemuda lingkungan.", bullet_style))
    story.append(Paragraph("• Menginisiasi dan memimpin penyelenggaraan rangkaian program sosial-keagamaan tahunan dengan ratusan penerima manfaat:", bullet_style))
    story.append(Paragraph("<b>- Layanan Pemeriksaan Medis Gratis:</b> Menyelenggarakan posko kesehatan cuma-cuma bagi warga lanjut usia dan dhuafa bekerja sama dengan tim tenaga medis profesional.", sub_bullet_style))
    story.append(Paragraph("<b>- Santunan Sosial Yatim & Dhuafa:</b> Menggalang dana donasi umat serta mendistribusikan santunan tunai dan puluhan paket sembako kepada mustahik.", sub_bullet_style))
    story.append(Paragraph("<b>- Syiar Pemuda & Kajian Akbar:</b> Mengoordinasikan kepanitiaan teknis acara tabligh akbar, buka puasa bersama, dan kajian kepemudaan secara tertib dan terjadwal.", sub_bullet_style))
    story.append(Spacer(1, 8.0))

    # 6. SERTIFIKASI KOMPETENSI & PENGHARGAAN RESMI
    for elem in section_heading("Sertifikasi Kompetensi & Penghargaan Resmi"):
        story.append(elem)

    cert_table = Table([
        [
            Paragraph("<b>Sertifikat Kompetensi Database Administrator (DBA)</b><br/><font color='#000000' size='8.8'><i>Badan Nasional Sertifikasi Profesi (BNSP) & Lembaga Sertifikasi Profesi (LSP) UBSI</i></font>", item_title_style),
            Paragraph("Maret 2026 - 2029", item_date_style)
        ],
        [
            Paragraph("• Dinyatakan Kompeten secara nasional dalam perancangan arsitektur basis data relasional, normalisasi skema ERD, optimalisasi kueri SQL lanjutan, indexing performa tinggi, serta pemeliharaan integritas dan keamanan data.", bullet_style),
            Paragraph("", item_date_style)
        ],
        [
            Paragraph("<b>Sertifikasi Kompetensi Analis Program (Program Analyst)</b><br/><font color='#000000' size='8.8'><i>Badan Nasional Sertifikasi Profesi (BNSP) & Lembaga Sertifikasi Profesi (LSP) UBSI</i></font>", item_title_style),
            Paragraph("Agustus 2026 - 2029", item_date_style)
        ],
        [
            Paragraph("• Lulus uji asesmen 10 unit kompetensi standar SKKNI: analisis spesifikasi perangkat lunak, perancangan algoritma efisien, skalabilitas struktur data, teknik debugging, code profiling, dan pengujian program (software testing).", bullet_style),
            Paragraph("", item_date_style)
        ],
        [
            Paragraph("<b>Juara 1 IT Bootcamp Software Development</b><br/><font color='#000000' size='8.8'><i>Fakultas Teknologi Informasi (FTI) & Rektorat Universitas Bina Sarana Informatika</i></font>", item_title_style),
            Paragraph("2025", item_date_style)
        ],
        [
            Paragraph("• Meraih predikat Juara 1 tingkat nasional mengungguli seluruh tim mahasiswa kampus cabang UBSI se-Indonesia melalui inovasi platform Smart Tahfidz School (Nomor Sertifikat e-Sn: 19230181).", bullet_style),
            Paragraph("", item_date_style)
        ],
    ], colWidths=[usable_w - 130, 130])
    cert_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('PADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4.0),
    ]))
    story.append(cert_table)
    story.append(Spacer(1, 8.0))

    # 7. KETERAMPILAN
    for elem in section_heading("Keterampilan"):
        story.append(elem)

    # Postman API, Windows OS, Linux CLI telah dihapus sesuai instruksi pengguna
    skills_data = [
        ("Hard Skills (Teknis)", "Software Development, Web Development (PHP, Laravel, React.js, Next.js, Tailwind CSS), Mobile Development (Dart, Flutter), Database Management (MySQL, PostgreSQL, Optimasi Kueri SQL), Data Analytics (Microsoft Power BI, Formula DAX), Arsitektur RESTful API, Version Control (Git & GitHub)."),
        ("Tools & Lingkungan", "Git, GitHub, Visual Studio Code, Microsoft Power BI Desktop."),
        ("Soft Skills (Interpersonal)", "Kerja Sama Tim (Teamwork), Komunikasi Efektif & Presentasi Teknis, Problem Solving & Berpikir Analitis, Kepemimpinan Organisasi, Manajemen Waktu & Skala Prioritas, Kemampuan Beradaptasi Cepat."),
        ("Kemampuan Bahasa", "Bahasa Indonesia (Penutur Asli / Native), Bahasa Inggris (Tingkat Menengah / Intermediate).")
    ]
    for label, val in skills_data:
        p_txt = f"• <b>{label}:</b> {val}"
        story.append(Paragraph(p_txt, bullet_style))

    doc.build(story)
    print(f"Times New Roman Pure Black ATS CV generated successfully at: {output_path}")

def render_preview_pngs(pdf_path, out_dir):
    doc = pymupdf.open(pdf_path)
    total_pages = len(doc)
    print(f"Total halaman hasil build: {total_pages}")
    
    for i, page in enumerate(doc):
        pix = page.get_pixmap(dpi=200)
        p_path = os.path.join(out_dir, "cv_preview", f"page_{i+1}.png")
        os.makedirs(os.path.dirname(p_path), exist_ok=True)
        pix.save(p_path)
        print(f"Halaman {i+1} tersimpan di: {p_path} ({pix.width}x{pix.height})")

if __name__ == "__main__":
    out_dir = r"c:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\public"
    os.makedirs(out_dir, exist_ok=True)
    
    cv_ats_path = os.path.join(out_dir, "CV_Dimas_Wijanarko_ATS.pdf")
    cv_default_path = os.path.join(out_dir, "cv-dimas-wijanarko.pdf")
    
    build_ats_cv(cv_ats_path)
    build_ats_cv(cv_default_path)

    # Render PNG preview
    render_preview_pngs(cv_ats_path, out_dir)

    # Salin ke Desktop pengguna
    desktop_dir = r"C:\Users\Dimas Wijanarko\Desktop"
    if os.path.exists(desktop_dir):
        desktop_pdf = os.path.join(desktop_dir, "CV_Dimas_Wijanarko_ATS.pdf")
        shutil.copyfile(cv_ats_path, desktop_pdf)
        print(f"Tersalin ke Desktop: {desktop_pdf}")
