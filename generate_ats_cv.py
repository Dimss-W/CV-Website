import os
import pymupdf
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT, TA_RIGHT

def build_ats_cv(output_path):
    usable_w = A4[0] - 64  # 32pt margins left & right -> 531.27 pt width

    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=32,
        rightMargin=32,
        topMargin=20,
        bottomMargin=20
    )

    c_primary = colors.HexColor("#0f172a") # Slate 900
    c_body = colors.HexColor("#334155")    # Slate 700
    c_muted = colors.HexColor("#64748b")   # Slate 500

    styles = getSampleStyleSheet()

    name_style = ParagraphStyle(
        'HeaderName',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=15.0,
        leading=17.5,
        textColor=c_primary,
        alignment=TA_CENTER,
        spaceAfter=1.5,
    )

    tagline_style = ParagraphStyle(
        'HeaderTagline',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=9.5,
        leading=12.2,
        textColor=c_primary,
        alignment=TA_CENTER,
        spaceAfter=2.0,
    )

    contact_style = ParagraphStyle(
        'HeaderContact',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.5,
        leading=11.2,
        textColor=c_body,
        alignment=TA_CENTER,
        spaceAfter=1.0,
    )

    section_header_style = ParagraphStyle(
        'SectionHeader',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=9.6,
        leading=12.0,
        textColor=c_primary,
        spaceBefore=2.5,
        spaceAfter=1.0,
        keepWithNext=True,
    )

    item_title_style = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.8,
        leading=11.2,
        textColor=c_primary,
        alignment=TA_LEFT,
    )

    item_date_style = ParagraphStyle(
        'ItemDate',
        parent=styles['Normal'],
        fontName='Times-Italic',
        fontSize=8.4,
        leading=11.2,
        textColor=c_muted,
        alignment=TA_RIGHT,
    )

    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.6,
        leading=11.2,
        textColor=c_body,
        alignment=TA_JUSTIFY,
        spaceAfter=1.2,
    )

    bullet_style = ParagraphStyle(
        'DocBullet',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.6,
        leading=11.0,
        textColor=c_body,
        alignment=TA_JUSTIFY,
        leftIndent=8,
        firstLineIndent=-6,
        spaceAfter=0.6,
    )

    def section_heading(title_text):
        return [
            Paragraph(title_text.upper(), section_header_style),
            HRFlowable(width="100%", thickness=0.8, color=c_primary, spaceAfter=1.8, spaceBefore=0.8)
        ]

    story = []

    # 1. HEADER (NO PHOTO, CLEAN CENTERED ATS FORMAT)
    story.append(Paragraph("DIMAS WIJANARKO", name_style))
    story.append(Paragraph("Full Stack Web & Mobile Software Engineer • Mahasiswa S1 Sistem Informasi UBSI", tagline_style))
    contact_line = (
        "Jakarta Pusat &nbsp;|&nbsp; "
        "Email: <a href='mailto:dmswijanarko@gmail.com' color='#0f172a'><u>dmswijanarko@gmail.com</u></a> &nbsp;|&nbsp; "
        "LinkedIn: <a href='https://linkedin.com/in/dmswijanarko' color='#0f172a'><u>in/dmswijanarko</u></a> &nbsp;|&nbsp; "
        "GitHub: <a href='https://github.com/Dimss-W' color='#0f172a'><u>github.com/Dimss-W</u></a> &nbsp;|&nbsp; "
        "Web: <a href='https://dimaswijanarko.me' color='#0f172a'><u>dimaswijanarko.me</u></a>"
    )
    story.append(Paragraph(contact_line, contact_style))
    story.append(HRFlowable(width="100%", thickness=1.0, color=c_primary, spaceAfter=2.0, spaceBefore=1.0))

    # 2. RINGKASAN PERSONAL
    for elem in section_heading("Ringkasan Personal"):
        story.append(elem)

    summary_text = (
        "Mahasiswa S1 Sistem Informasi Universitas Bina Sarana Informatika (UBSI) dengan fondasi rekayasa perangkat lunak Web & Mobile serta analitik data. "
        "Berfokus pada perancangan aplikasi web modern menggunakan Laravel, aplikasi mobile lintas platform dengan Flutter, dan arsitektur basis data relasional tersertifikasi Database Administrator BNSP. "
        "Memiliki pengalaman industri di PT PGAS Telekomunikasi Nusantara (PGNCOM) dalam membangun sistem monitoring operasional dan dashboard interaktif Power BI. "
        "Memadukan ketelitian kode bersih, kepekaan estetika antarmuka (UI/UX), serta jiwa kepemimpinan aktif sebagai Ketua Umum PRISMA dan instruktur tamu RPL. "
        "Berdedikasi menghadirkan solusi teknologi yang efisien, skalabel, dan bernilai nyata bagi organisasi."
    )
    story.append(Paragraph(summary_text, body_style))

    # 3. PENDIDIKAN FORMAL
    for elem in section_heading("Pendidikan Formal"):
        story.append(elem)

    edu1_t = Table([
        [Paragraph("<b>Universitas Bina Sarana Informatika (UBSI)</b> - S1 Sistem Informasi", item_title_style),
         Paragraph("Sep 2023 - Sekarang (Aktif)", item_date_style)],
    ], colWidths=[usable_w - 140, 140])
    edu1_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(edu1_t)
    story.append(Paragraph("• Mata Kuliah Relevan: Pemrograman Web (Laravel), Pemrograman Mobile (Flutter & Dart), Rekayasa Perangkat Lunak, Basis Data Relasional & SQL, Sistem Informasi Manajemen.", bullet_style))

    edu2_t = Table([
        [Paragraph("<b>SMK Negeri 31 Jakarta</b> - Kompetensi Keahlian Animasi", item_title_style),
         Paragraph("Juli 2019 - Juli 2022", item_date_style)],
    ], colWidths=[usable_w - 140, 140])
    edu2_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(edu2_t)
    story.append(Paragraph("• Fokus Pembelajaran: Desain visual antarmuka pengguna (UI/UX), permodelan grafis digital, animasi komputer, dan komposisi aset multimedia.", bullet_style))

    # 4. PENGALAMAN KERJA & MENGAJAR
    for elem in section_heading("Pengalaman Kerja & Mengajar"):
        story.append(elem)

    exp1_t = Table([
        [Paragraph("<b>Web Developer & Data Analytics Intern</b> - PT PGAS Telekomunikasi Nusantara (PGNCOM)", item_title_style),
         Paragraph("Agustus 2026 - November 2026", item_date_style)],
    ], colWidths=[usable_w - 140, 140])
    exp1_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(exp1_t)
    story.append(Paragraph("• Mengembangkan sistem web internal Monitoring Realisasi Biaya & QC BASTO berbasis Laravel dan MySQL untuk mengotomasi alur validasi dokumen Berita Acara Serah Terima Operasional (BASTO) dan kepatuhan anggaran proyek.", bullet_style))
    story.append(Paragraph("• Merancang dan mengintegrasikan dashboard visualisasi interaktif Microsoft Power BI menggunakan pemodelan data relasional dan kalkulasi formula DAX untuk memonitor deviasi realisasi biaya serta performa proyek secara real-time.", bullet_style))
    story.append(Paragraph("• Mengimplementasikan manajemen hak akses berjenjang (RBAC) dan riwayat audit transaksi untuk menjamin integritas data operasional perusahaan.", bullet_style))

    exp2_t = Table([
        [Paragraph("<b>Pengajar Tamu & Instruktur Rekayasa Perangkat Lunak (RPL)</b> - SMK Muhammadiyah 15 Jakarta", item_title_style),
         Paragraph("2025", item_date_style)],
    ], colWidths=[usable_w - 140, 140])
    exp2_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(exp2_t)
    story.append(Paragraph("• Menjadi instruktur teknis tamu kurikulum web modern: pengenalan Framework Laravel, struktur arsitektur MVC, dan administrasi database MySQL.", bullet_style))
    story.append(Paragraph("• Membimbing praktikum laboratorium komputer mengenai penerapan clean code dan simulasi alur kolaborasi version control Git & GitHub standar industri.", bullet_style))

    exp3_t = Table([
        [Paragraph("<b>Pengembang Perangkat Lunak Web & Mobile (Full Stack)</b> - Proyek Independen & Klien", item_title_style),
         Paragraph("2023", item_date_style)],
    ], colWidths=[usable_w - 140, 140])
    exp3_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(exp3_t)
    story.append(Paragraph("• Merancang dan membangun aplikasi mobile (Flutter & Dart) serta web berskala enterprise terintegrasi RESTful API terstruktur dan database relasional.", bullet_style))

    # 5. PENGALAMAN ORGANISASI
    for elem in section_heading("Pengalaman Organisasi"):
        story.append(elem)

    org_t = Table([
        [Paragraph("<b>Ketua Umum</b> - Pengurus Remaja Islam Masjid (PRISMA)", item_title_style),
         Paragraph("2023 - Sekarang (Aktif)", item_date_style)],
    ], colWidths=[usable_w - 140, 140])
    org_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(org_t)
    story.append(Paragraph("• Memimpin organisasi kepemudaan masjid dalam merencanakan program kerja tahunan, rapat kepengurusan berkala, transparansi dana kas umat, serta koordinasi strategis DKM.", bullet_style))
    story.append(Paragraph("• Menginisiasi dan mengeksekusi program sosial tahunan bulan Ramadhan: posko pemeriksaan medis gratis, santunan yatim dhuafa, dan buka puasa bersama ratusan jamaah.", bullet_style))

    # 6. SERTIFIKASI KOMPETENSI & PENGHARGAAN RESMI
    for elem in section_heading("Sertifikasi Kompetensi & Penghargaan Resmi"):
        story.append(elem)

    cert_table = Table([
        [Paragraph("<b>Sertifikat Kompetensi Database Administrator</b> - BNSP & LSP UBSI", item_title_style),
         Paragraph("Mar 2026 - 2029", item_date_style)],
        [Paragraph("• Dinyatakan Kompeten nasional dalam perancangan basis data relasional, kueri SQL lanjutan, indeks, dan integritas data.", bullet_style),
         Paragraph("", item_date_style)],
        [Paragraph("<b>Sertifikasi Kompetensi Analis Program (Program Analyst)</b> - BNSP & LSP UBSI", item_title_style),
         Paragraph("Agustus 2026 - 2029", item_date_style)],
        [Paragraph("• Lulus asesmen 10 unit kompetensi SKKNI: skalabilitas sistem, SQL, algoritma, debugging, profiling, dan code review.", bullet_style),
         Paragraph("", item_date_style)],
        [Paragraph("<b>Juara 1 IT Bootcamp Software Development</b> - FTI & Rektorat UBSI", item_title_style),
         Paragraph("2025", item_date_style)],
        [Paragraph("• Meraih Juara 1 tingkat nasional se-UBSI melalui platform Smart Tahfidz School (e-Sn: 19230181).", bullet_style),
         Paragraph("", item_date_style)],
    ], colWidths=[usable_w - 110, 110])
    cert_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('PADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(cert_table)

    # 7. KETERAMPILAN
    for elem in section_heading("Keterampilan"):
        story.append(elem)

    story.append(Paragraph("• <b>Hard Skills:</b> Software Development, Web Development (Laravel, React.js, Tailwind CSS), Mobile Development (Flutter & Dart), Database Management (MySQL, SQL), Data Analysis (Microsoft Power BI, DAX), RESTful API, Git & GitHub.", bullet_style))
    story.append(Paragraph("• <b>Soft Skills:</b> Kerja Sama Tim, Komunikasi Efektif, Problem Solving, Kepemimpinan Organisasi, Manajemen Waktu, Kemampuan Beradaptasi.", bullet_style))
    story.append(Paragraph("• <b>Bahasa:</b> Bahasa Indonesia (Penutur Asli / Native), Bahasa Inggris (Menengah / Intermediate).", bullet_style))

    doc.build(story)
    print(f"Times New Roman ATS CV generated successfully at: {output_path}")

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
        
        clean_path = os.path.join(out_dir, "cv_preview", f"1page_clean_{i+1}.png")
        pix.save(clean_path)

if __name__ == "__main__":
    out_dir = r"c:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\public"
    os.makedirs(out_dir, exist_ok=True)
    
    cv_ats_path = os.path.join(out_dir, "CV_Dimas_Wijanarko_ATS.pdf")
    cv_default_path = os.path.join(out_dir, "cv-dimas-wijanarko.pdf")
    
    build_ats_cv(cv_ats_path)
    build_ats_cv(cv_default_path)

    render_preview_pngs(cv_ats_path, out_dir)
