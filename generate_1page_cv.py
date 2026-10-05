import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, Image
)
from reportlab.pdfgen import canvas

def create_single_page_cv(output_path):
    # A4: 595.27 x 841.89 pt.
    # Margins: 24pt left/right, 20pt top/bottom -> Usable width = 547.27 pt, height = 801.89 pt
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=24,
        rightMargin=24,
        topMargin=20,
        bottomMargin=20,
        title="Curriculum Vitae - Dimas Wijanarko",
        author="Dimas Wijanarko",
        subject="CV ATS 1 Halaman - Full Stack Web & Mobile Software Engineer",
    )

    styles = getSampleStyleSheet()

    # Color Palette: Deep Slate Navy, Tech Blue accent, neutral slate
    c_primary = colors.HexColor("#0f172a")     # Slate 900
    c_accent = colors.HexColor("#0284c7")      # Sky 600
    c_body = colors.HexColor("#1e293b")        # Slate 800
    c_muted = colors.HexColor("#475569")       # Slate 600
    c_line = colors.HexColor("#cbd5e1")        # Slate 300

    # Custom Typography Styles optimized for High-Density 1-Page Layout
    name_style = ParagraphStyle(
        'DocName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=17,
        textColor=c_primary,
    )

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=c_accent,
    )

    header_meta_style = ParagraphStyle(
        'HeaderMeta',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.2,
        leading=9.5,
        textColor=c_body,
    )

    section_header_style = ParagraphStyle(
        'SectionHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=10.5,
        textColor=c_primary,
        spaceBefore=3,
        spaceAfter=1.5,
        keepWithNext=True,
    )

    item_title_style = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.8,
        leading=9.8,
        textColor=c_primary,
    )

    item_subtitle_style = ParagraphStyle(
        'ItemSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.2,
        leading=9.2,
        textColor=c_accent,
    )

    item_date_style = ParagraphStyle(
        'ItemDate',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.2,
        leading=9.2,
        textColor=c_muted,
        alignment=2,
    )

    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.3,
        leading=9.5,
        textColor=c_body,
    )

    bullet_style = ParagraphStyle(
        'DocBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.2,
        leading=9.2,
        textColor=c_body,
        leftIndent=8,
        firstLineIndent=-5,
        spaceAfter=1,
    )

    def section_heading(title_text):
        return [
            Paragraph(title_text.upper(), section_header_style),
            HRFlowable(width="100%", thickness=0.6, color=c_accent, spaceAfter=2.5, spaceBefore=0.5)
        ]

    story = []

    # ==========================================
    # 1. HEADER DENGAN FOTO PASPOR & BIODATA LENGKAP
    # ==========================================
    passport_img_path = r"c:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\public\dimas-profile-passport.jpg"
    # Passport image: 56pt width x 74.67pt height
    img_element = Image(passport_img_path, width=56, height=74.67)

    header_text_block = [
        Paragraph("DIMAS WIJANARKO", name_style),
        Paragraph("Full Stack Web & Mobile Software Engineer • Mahasiswa S1 Sistem Informasi UBSI", title_style),
        Spacer(1, 2),
        Paragraph(
            "<b>NIM:</b> 19230181 &nbsp;|&nbsp; "
            "<b>TTL:</b> Jakarta, 21 April 2004 &nbsp;|&nbsp; "
            "<b>Alamat:</b> Jl. Kramat Jaya RT.001 RW.01, Johar Baru, Jakarta Pusat, DKI Jakarta",
            header_meta_style
        ),
        Paragraph(
            "<b>Kontak:</b> +62 857-9477-0824 &nbsp;|&nbsp; "
            "<b>Email:</b> <a href='mailto:dmswijanarko@gmail.com' color='#0284c7'><u>dmswijanarko@gmail.com</u></a> &nbsp;|&nbsp; "
            "<b>GitHub:</b> <a href='https://github.com/Dimss-W' color='#0284c7'><u>github.com/Dimss-W</u></a>",
            header_meta_style
        ),
        Paragraph(
            "<b>LinkedIn:</b> <a href='https://www.linkedin.com/in/dimas-wijanarko-63a5b032a' color='#0284c7'><u>linkedin.com/in/dimas-wijanarko-63a5b032a</u></a> &nbsp;|&nbsp; "
            "<b>Portofolio:</b> <a href='https://portofolio-dimas-kappa.vercel.app/' color='#0284c7'><u>https://portofolio-dimas</u></a>",
            header_meta_style
        ),
    ]

    header_table = Table(
        [[img_element, header_text_block]],
        colWidths=[64, 483]
    )
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 2))
    story.append(HRFlowable(width="100%", thickness=1, color=c_primary, spaceAfter=2.5, spaceBefore=1.5))

    # ==========================================
    # 2. RINGKASAN PROFESIONAL & FOKUS KOMPETENSI
    # ==========================================
    for elem in section_heading("Ringkasan Profesional"):
        story.append(elem)

    summary_text = (
        "Mahasiswa Sistem Informasi Universitas Bina Sarana Informatika (UBSI) dengan spesialisasi rekayasa perangkat lunak web dan mobile. "
        "Tersertifikasi resmi <b>Database Administrator oleh BNSP</b> dan peraih <b>Juara 1 IT Bootcamp Software Development UBSI</b>. "
        "Memiliki rekam jejak mengembangkan sistem operasional korporat di PT PGAS Telekomunikasi Nusantara (PGNCOM) terintegrasi analitik Power BI, "
        "serta merilis sistem produksi nyata: Otokeep (manajemen armada dengan integrasi Google Gemini Vision AI OCR) dan FindIt (sistem informasi terpadu 27 kampus cabang UBSI)."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 2))

    # ==========================================
    # 3. KEAHLIAN TEKNIS
    # ==========================================
    for elem in section_heading("Keahlian Teknis & Kompetensi"):
        story.append(elem)

    skills_data = [
        [
            Paragraph("<b>Bahasa & Framework</b>", item_title_style),
            Paragraph(": PHP, Laravel, Dart, Flutter, TypeScript, JavaScript, React.js, Next.js, Tailwind CSS, HTML5, CSS3", body_style),
        ],
        [
            Paragraph("<b>Basis Data & Analitik</b>", item_title_style),
            Paragraph(": MySQL, PostgreSQL, Supabase Cloud, Microsoft Power BI, Kalkulasi DAX, Optimasi Kueri SQL, Relasi ERD", body_style),
        ],
        [
            Paragraph("<b>Tools, AI & Arsitektur</b>", item_title_style),
            Paragraph(": Git, GitHub, RESTful API, Arsitektur MVC, RBAC, Gemini Vision AI (OCR), Postman, Linux/Vercel Cloud", body_style),
        ],
    ]
    t_skills = Table(skills_data, colWidths=[110, 437])
    t_skills.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 0.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_skills)
    story.append(Spacer(1, 2))

    # ==========================================
    # 4. PENGALAMAN KERJA & PROFESIONAL
    # ==========================================
    for elem in section_heading("Pengalaman Kerja & Mengajar"):
        story.append(elem)

    # Exp 1: PGNCOM
    exp1_t = Table([
        [Paragraph("<b>Web Developer & Data Analytics Intern</b> — PT PGAS Telekomunikasi Nusantara (PGNCOM)", item_title_style),
         Paragraph("Jan 2026 – Mar 2026", item_date_style)],
    ], colWidths=[420, 127])
    exp1_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(exp1_t)
    story.append(Paragraph("• Mengembangkan sistem web internal <i>Monitoring Realisasi Biaya & QC BASTO</i> berbasis Laravel dan MySQL untuk mengotomasi alur validasi dokumen Berita Acara Serah Terima Operasional (BASTO) dan kepatuhan anggaran proyek.", bullet_style))
    story.append(Paragraph("• Merancang dan mengintegrasikan dashboard visualisasi interaktif Microsoft Power BI menggunakan pemodelan data relasional dan kalkulasi formula DAX untuk memonitor deviasi realisasi biaya serta performa proyek secara real-time.", bullet_style))
    story.append(Paragraph("• Mengimplementasikan manajemen hak akses berjenjang (RBAC) dan riwayat audit transaksi untuk menjamin integritas data operasional.", bullet_style))
    story.append(Spacer(1, 1.5))

    # Exp 2: SMK Muhammadiyah 15
    exp2_t = Table([
        [Paragraph("<b>Pengajar Tamu & Instruktur Rekayasa Perangkat Lunak (RPL)</b> — SMK Muhammadiyah 15 Jakarta", item_title_style),
         Paragraph("2025", item_date_style)],
    ], colWidths=[420, 127])
    exp2_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(exp2_t)
    story.append(Paragraph("• Menjadi instruktur teknis tamu kurikulum web modern: pengenalan Framework Laravel, struktur MVC, dan administrasi database MySQL.", bullet_style))
    story.append(Paragraph("• Membimbing praktikum laboratorium komputer mengenai penerapan clean code dan alur kolaborasi version control Git & GitHub standar industri.", bullet_style))
    story.append(Spacer(1, 1.5))

    # Exp 3: Proyek Independen
    exp3_t = Table([
        [Paragraph("<b>Pengembang Perangkat Lunak Web & Mobile (Full Stack)</b> — Proyek Mandiri & Klien", item_title_style),
         Paragraph("2023 – Sekarang", item_date_style)],
    ], colWidths=[420, 127])
    exp3_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(exp3_t)
    story.append(Paragraph("• Merancang dan membangun aplikasi mobile (Flutter & Dart) serta web berskala enterprise terintegrasi RESTful API terstruktur dan database relasional.", bullet_style))
    story.append(Spacer(1, 2))

    # ==========================================
    # 5. PROYEK REKAYASA PERANGKAT LUNAK UNGGULAN
    # ==========================================
    for elem in section_heading("Proyek Rekayasa Perangkat Lunak Unggulan"):
        story.append(elem)

    # Proj 1: Otokeep
    p1_t = Table([
        [Paragraph("<b>Otokeep – Platform Servis Kendaraan Cerdas & Pemindai AI OCR</b>", item_title_style),
         Paragraph("<a href='https://otokeep-rho.vercel.app/' color='#0284c7'><u>otokeep-rho.vercel.app</u></a> &nbsp;|&nbsp; <a href='https://github.com/Dimss-W/Otokeep.git' color='#0284c7'><u>GitHub</u></a>", item_date_style)],
    ], colWidths=[360, 187])
    p1_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(p1_t)
    story.append(Paragraph("• Platform pemantauan servis kendaraan dengan integrasi Google Gemini Vision API OCR untuk deteksi otomatis angka odometer dari foto speedometer secara instan, dilengkapi kompresi citra cepat, penjadwalan servis berkala, dan pengingat pajak STNK. <i>(Stack: Laravel, Tailwind CSS, MySQL, Gemini AI, REST API)</i>.", bullet_style))
    story.append(Spacer(1, 1.5))

    # Proj 2: FindIt
    p2_t = Table([
        [Paragraph("<b>FindIt – Sistem Informasi Barang Hilang & Ditemukan 27 Kampus UBSI</b>", item_title_style),
         Paragraph("<a href='https://findit-git-main-dim-6414.vercel.app/' color='#0284c7'><u>findit-ubsi.vercel.app</u></a> &nbsp;|&nbsp; <a href='https://github.com/Dimss-W/FindIt.git' color='#0284c7'><u>GitHub</u></a>", item_date_style)],
    ], colWidths=[360, 187])
    p2_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(p2_t)
    story.append(Paragraph("• Sistem informasi penemuan dan kehilangan barang terpadu untuk 27 kampus cabang UBSI se-Indonesia dengan partisi data multi-cabang tanpa benturan ID, pencatatan loker brankas penitipan, dan validasi klaim NIM mahasiswa. <i>(Stack: Laravel, Blade, MySQL, REST API)</i>.", bullet_style))
    story.append(Spacer(1, 1.5))

    # Proj 3: CalTrack & Kastrix
    p3_t = Table([
        [Paragraph("<b>CalTrack – Aplikasi Mobile Kesehatan & Kalkulator Nutrisi IMT</b>", item_title_style),
         Paragraph("2024 &nbsp;|&nbsp; <a href='https://github.com/Dimss-W' color='#0284c7'><u>GitHub Profile</u></a>", item_date_style)],
    ], colWidths=[380, 167])
    p3_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(p3_t)
    story.append(Paragraph("• Aplikasi mobile Android cross-platform dengan Flutter & MVVM untuk kalkulasi IMT/BMI real-time, panduan nutrisi harian, dan integrasi REST API Laravel. <i>(Stack: Flutter, Dart, Laravel REST API, MySQL)</i>.", bullet_style))
    story.append(Spacer(1, 1.5))

    p4_t = Table([
        [Paragraph("<b>Kastrix POS & Dashboard Monitoring Realisasi Biaya PGNCOM</b>", item_title_style),
         Paragraph("2024 – 2026 &nbsp;|&nbsp; <a href='https://github.com/Dimss-W' color='#0284c7'><u>GitHub Profile</u></a>", item_date_style)],
    ], colWidths=[380, 167])
    p4_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(p4_t)
    story.append(Paragraph("• Mengembangkan sistem kasir (POS) multi-gerai dengan peran Super Admin & Kasir, serta integrasi dashboard analitik Power BI & formula DAX untuk evaluasi anggaran operasional PGNCOM. <i>(Stack: Laravel, React, Power BI, DAX, MySQL)</i>.", bullet_style))
    story.append(Spacer(1, 2))

    # ==========================================
    # 6. SERTIFIKASI KOMPETENSI & PENGHARGAAN RESMI
    # ==========================================
    for elem in section_heading("Sertifikasi Kompetensi & Penghargaan Resmi"):
        story.append(elem)

    cert_table = Table([
        [
            Paragraph("<b>Sertifikat Kompetensi Database Administrator</b> — Badan Nasional Sertifikasi Profesi (BNSP) & LSP UBSI", item_title_style),
            Paragraph("Mar 2026 – 2029", item_date_style)
        ],
        [
            Paragraph("• No. Reg. DMS.1241.00936 2026 / Sertifikat No. 63120 2521 6 0000936 2026. Dinyatakan Kompeten dalam perancangan database relasional, optimasi kueri SQL, dan keamanan integritas data.", bullet_style),
            Paragraph("", item_date_style)
        ],
        [
            Paragraph("<b>Juara 1 IT Bootcamp Software Development</b> — Fakultas Teknologi Informasi (FTI) & Rektorat UBSI", item_title_style),
            Paragraph("2025", item_date_style)
        ],
        [
            Paragraph("• Meraih predikat JUARA 1 tingkat nasional mengungguli perwakilan mahasiswa dari seluruh kampus cabang UBSI se-Indonesia atas keunggulan arsitektur sistem dan clean code.", bullet_style),
            Paragraph("", item_date_style)
        ],
    ], colWidths=[440, 107])
    cert_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('PADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,1), (-1,1), 1),
        ('BOTTOMPADDING', (0,3), (-1,3), 1),
    ]))
    story.append(cert_table)
    story.append(Spacer(1, 2))

    # ==========================================
    # 7. PENDIDIKAN FORMAL LENGKAP
    # ==========================================
    for elem in section_heading("Pendidikan Formal"):
        story.append(elem)

    edu_table_data = [
        [
            Paragraph("<b>Universitas Bina Sarana Informatika (UBSI)</b> — S1 Sistem Informasi (NIM: 19230181)", item_title_style),
            Paragraph("2023 – Sekarang (Aktif)", item_date_style),
        ],
        [
            Paragraph("<b>SMK Negeri 31 Jakarta</b> — Jurusan Animasi (Tahun Lulus: 2022)", item_title_style),
            Paragraph("2019 – 2022", item_date_style),
        ],
        [
            Paragraph("<b>SMP Negeri 156 Jakarta</b> — Sekolah Menengah Pertama (Tahun Lulus: 2019)", item_title_style),
            Paragraph("2016 – 2019", item_date_style),
        ],
        [
            Paragraph("<b>SD Negeri 17 Pagi Jakarta</b> — Sekolah Dasar (Tahun Lulus: 2016)", item_title_style),
            Paragraph("2010 – 2016", item_date_style),
        ],
    ]
    t_edu = Table(edu_table_data, colWidths=[420, 127])
    t_edu.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 0.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_edu)

    # Footer note at bottom
    story.append(Spacer(1, 3))
    story.append(HRFlowable(width="100%", thickness=0.5, color=c_line, spaceAfter=2, spaceBefore=1))
    footer_p = Paragraph(
        "<i>Berkas CV Resmi Terverifikasi ATS • Portofolio & Kode Sumber: <a href='https://portofolio-dimas-kappa.vercel.app/' color='#0284c7'><u>https://portofolio-dimas</u></a> | <a href='https://www.linkedin.com/in/dimas-wijanarko-63a5b032a' color='#0284c7'><u>LinkedIn Profile</u></a></i>",
        ParagraphStyle('FootNote', parent=styles['Normal'], fontName='Helvetica', fontSize=6.8, leading=8.5, textColor=c_muted, alignment=1)
    )
    story.append(footer_p)

    # Build the document
    doc.build(story)
    print(f"Single-page CV ATS generated successfully at: {output_path}")

if __name__ == "__main__":
    out_dir = r"c:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\public"
    os.makedirs(out_dir, exist_ok=True)
    
    cv_ats_path = os.path.join(out_dir, "CV_Dimas_Wijanarko_ATS.pdf")
    cv_default_path = os.path.join(out_dir, "cv-dimas-wijanarko.pdf")
    
    create_single_page_cv(cv_ats_path)
    create_single_page_cv(cv_default_path)
