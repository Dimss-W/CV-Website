import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, Image
)
import pymupdf

def build_executive_1page_cv(output_path):
    # Dimensi A4: 595.27 x 841.89 pt
    # Margin simetris dan presisi: 32pt kiri/kanan, 16pt atas/bawah agar presisi pas 1 halaman penuh
    usable_w = 595.27 - (32 * 2)  # 531.27 pt
    
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=32,
        rightMargin=32,
        topMargin=15,
        bottomMargin=15,
        title="Curriculum Vitae - Dimas Wijanarko",
        author="Dimas Wijanarko",
        subject="CV ATS - Full Stack Web & Mobile Software Engineer",
    )

    styles = getSampleStyleSheet()

    c_primary = colors.HexColor("#0f172a")     # Slate 900
    c_accent = colors.HexColor("#0369a1")      # Sky 700 (Clean Blue)
    c_body = colors.HexColor("#334155")        # Slate 700
    c_muted = colors.HexColor("#64748b")       # Slate 500

    name_style = ParagraphStyle(
        'DocName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=16.5,
        leading=18.5,
        textColor=c_primary,
        spaceAfter=1,
    )

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.0,
        leading=11.0,
        textColor=c_accent,
        spaceAfter=2,
    )

    contact_style = ParagraphStyle(
        'DocContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.9,
        leading=9.9,
        textColor=c_body,
    )

    section_header_style = ParagraphStyle(
        'SectionHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.9,
        leading=10.8,
        textColor=c_primary,
        spaceBefore=2.2,
        spaceAfter=0.6,
        keepWithNext=True,
    )

    item_title_style = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.2,
        leading=10.0,
        textColor=c_primary,
    )

    item_date_style = ParagraphStyle(
        'ItemDate',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=9.8,
        textColor=c_muted,
        alignment=2,
    )

    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=9.8,
        textColor=c_body,
        spaceAfter=0.4,
    )

    bullet_style = ParagraphStyle(
        'DocBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=9.8,
        textColor=c_body,
        leftIndent=8,
        firstLineIndent=-5,
        spaceAfter=0.4,
    )

    def section_heading(title_text):
        return [
            Paragraph(title_text.upper(), section_header_style),
            HRFlowable(width="100%", thickness=0.8, color=c_accent, spaceAfter=1.8, spaceBefore=0.4)
        ]

    story = []

    # ==========================================
    # 1. HEADER: FOTO PROFIL, IDENTITAS & KONTAK
    # ==========================================
    passport_img_path = r"c:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\public\dimas-profile-passport.jpg"
    photo_w = 52
    photo_h = 69.33
    img_element = Image(passport_img_path, width=photo_w, height=photo_h)

    photo_col_w = 60
    meta_col_w = usable_w - photo_col_w

    header_text_block = [
        Paragraph("DIMAS WIJANARKO", name_style),
        Paragraph("Full Stack Web & Mobile Software Engineer • Mahasiswa S1 Sistem Informasi UBSI", title_style),
        Paragraph(
            "TTL: Jakarta, 21 April 2004 &nbsp;|&nbsp; Alamat: Jl. Kramat Jaya RT.001 RW.01, Johar Baru, Jakarta Pusat, DKI Jakarta",
            contact_style
        ),
        Spacer(1, 0.5),
        Paragraph(
            "Email: <a href='mailto:dmswijanarko@gmail.com' color='#0369a1'><u>dmswijanarko@gmail.com</u></a> &nbsp;|&nbsp; "
            "LinkedIn: <a href='https://linkedin.com/in/dimas-wijanarko' color='#0369a1'><u>in/dimas-wijanarko</u></a> &nbsp;|&nbsp; "
            "GitHub: <a href='https://github.com/Dimss-W' color='#0369a1'><u>github.com/Dimss-W</u></a>",
            contact_style
        ),
    ]

    header_table = Table([[img_element, header_text_block]], colWidths=[photo_col_w, meta_col_w])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 1.2))
    story.append(HRFlowable(width="100%", thickness=1.0, color=c_primary, spaceAfter=1.8, spaceBefore=0.4))

    # ==========================================
    # 2. RINGKASAN PROFESIONAL
    # ==========================================
    for elem in section_heading("Ringkasan Profesional"):
        story.append(elem)

    summary_text = (
        "Mahasiswa aktif S1 Sistem Informasi Universitas Bina Sarana Informatika (UBSI) Semester 7 dengan IPK 3.82 yang berfokus pada rekayasa perangkat lunak Web & Mobile (Full Stack) serta Analisis Data. "
        "Tersertifikasi resmi <b>Database Administrator oleh BNSP</b>, lulus asesmen <b>Analis Program BNSP</b>, dan peraih predikat <b>Juara 1 IT Bootcamp Software Development UBSI</b>. "
        "Berpengalaman 4 bulan mengembangkan sistem operasional korporat internal monitoring realisasi biaya dan dashboard Microsoft Power BI di <b>PT PGAS Telekomunikasi Nusantara (PGNCOM)</b>, "
        "menjadi pengajar tamu RPL di SMK Muhammadiyah 15 Jakarta, serta merilis sistem informasi terpadu FindIt untuk 27 kampus cabang UBSI."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 0.8))

    # ==========================================
    # 3. KEAHLIAN TEKNIS & KOMPETENSI
    # ==========================================
    for elem in section_heading("Keahlian Teknis & Kompetensi"):
        story.append(elem)

    skills_data = [
        [
            Paragraph("<b>Bahasa & Framework</b>", item_title_style),
            Paragraph(":", item_title_style),
            Paragraph("PHP, Laravel, Dart, Flutter, TypeScript, JavaScript, React.js, Next.js, Tailwind CSS, HTML5, CSS3", body_style),
        ],
        [
            Paragraph("<b>Basis Data & Analitik</b>", item_title_style),
            Paragraph(":", item_title_style),
            Paragraph("MySQL, PostgreSQL, Supabase Cloud, Microsoft Power BI, Kalkulasi DAX, Optimasi Kueri SQL, Relasi ERD", body_style),
        ],
        [
            Paragraph("<b>Tools & Arsitektur</b>", item_title_style),
            Paragraph(":", item_title_style),
            Paragraph("Git, GitHub, RESTful API, Arsitektur MVC, RBAC, Postman, Linux Server, Vercel Cloud", body_style),
        ],
    ]
    t_skills = Table(skills_data, colWidths=[96, 6, usable_w - 102])
    t_skills.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 0.1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.1),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_skills)
    story.append(Spacer(1, 0.8))

    # ==========================================
    # 4. PENDIDIKAN FORMAL (SETELAH KEAHLIAN TEKNIS)
    # ==========================================
    for elem in section_heading("Pendidikan Formal"):
        story.append(elem)

    edu_table_data = [
        [
            Paragraph("<b>Universitas Bina Sarana Informatika (UBSI)</b> — S1 Sistem Informasi", item_title_style),
            Paragraph("September 2023 – Sekarang (Mahasiswa Aktif)", item_date_style),
        ],
        [
            Paragraph("• IPK: <b>3.82</b> (Semester 7) &nbsp;|&nbsp; <b>Mata Kuliah Relevan:</b> Pemrograman Web (Laravel), Pemrograman Mobile (Flutter & Dart), Rekayasa Perangkat Lunak, Basis Data Relasional & SQL, Sistem Informasi Manajemen.", bullet_style),
            Paragraph("", item_date_style),
        ],
        [
            Paragraph("<b>SMK Negeri 31 Jakarta</b> — Kompetensi Keahlian Animasi", item_title_style),
            Paragraph("Juli 2019 – Juli 2022", item_date_style),
        ],
        [
            Paragraph("• Nilai rata-rata: <b>84</b> &nbsp;|&nbsp; <b>Fokus:</b> Desain antarmuka visual UI/UX, permodelan grafis digital, animasi komputer, dan komposisi aset multimedia.", bullet_style),
            Paragraph("", item_date_style),
        ],
    ]
    t_edu = Table(edu_table_data, colWidths=[usable_w - 150, 150])
    t_edu.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 0.1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.2),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_edu)
    story.append(Spacer(1, 0.8))

    # ==========================================
    # 5. PENGALAMAN KERJA & MENGAJAR
    # ==========================================
    for elem in section_heading("Pengalaman Kerja & Mengajar"):
        story.append(elem)

    # 1. PGNCOM (Agustus 2026 – November 2026)
    exp1_t = Table([
        [Paragraph("<b>Web Developer & Data Analytics Intern</b> — PT PGAS Telekomunikasi Nusantara (PGNCOM)", item_title_style),
         Paragraph("Agustus 2026 – November 2026", item_date_style)],
    ], colWidths=[usable_w - 130, 130])
    exp1_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(exp1_t)
    story.append(Paragraph("• Mengembangkan sistem web internal <i>Monitoring Realisasi Biaya & QC BASTO</i> berbasis Laravel dan MySQL untuk mengotomasi alur validasi dokumen Berita Acara Serah Terima Operasional (BASTO) dan kepatuhan anggaran proyek.", bullet_style))
    story.append(Paragraph("• Merancang dan mengintegrasikan dashboard visualisasi interaktif Microsoft Power BI menggunakan pemodelan data relasional dan kalkulasi formula DAX untuk memonitor deviasi realisasi biaya serta performa proyek secara real-time.", bullet_style))
    story.append(Paragraph("• Mengimplementasikan manajemen hak akses berjenjang (RBAC) dan riwayat audit transaksi untuk menjamin integritas data operasional.", bullet_style))
    story.append(Spacer(1, 0.4))

    # 2. SMK Muhammadiyah 15
    exp2_t = Table([
        [Paragraph("<b>Pengajar Tamu & Instruktur Rekayasa Perangkat Lunak (RPL)</b> — SMK Muhammadiyah 15 Jakarta", item_title_style),
         Paragraph("2025", item_date_style)],
    ], colWidths=[usable_w - 130, 130])
    exp2_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(exp2_t)
    story.append(Paragraph("• Menjadi instruktur teknis tamu kurikulum web modern: pengenalan Framework Laravel, struktur MVC, dan administrasi database MySQL.", bullet_style))
    story.append(Paragraph("• Membimbing praktikum laboratorium komputer mengenai penerapan clean code dan alur kolaborasi version control Git & GitHub standar industri.", bullet_style))
    story.append(Spacer(1, 0.4))

    # 3. Proyek Mandiri
    exp3_t = Table([
        [Paragraph("<b>Pengembang Perangkat Lunak Web & Mobile (Full Stack)</b> — Proyek Mandiri & Klien", item_title_style),
         Paragraph("2023", item_date_style)],
    ], colWidths=[usable_w - 130, 130])
    exp3_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(exp3_t)
    story.append(Paragraph("• Merancang dan membangun aplikasi mobile (Flutter & Dart) serta web berskala enterprise terintegrasi RESTful API terstruktur dan database relasional.", bullet_style))
    story.append(Spacer(1, 0.8))

    # ==========================================
    # 6. PROYEK REKAYASA PERANGKAT LUNAK UNGGULAN
    # ==========================================
    for elem in section_heading("Proyek Rekayasa Perangkat Lunak Unggulan"):
        story.append(elem)

    # Otokeep
    story.append(Paragraph("<b>Otokeep – Platform Servis Kendaraan Cerdas & Manajemen Armada</b>", item_title_style))
    story.append(Paragraph("• Platform pemantauan servis kendaraan & manajemen armada cerdas dengan kompresi citra cepat, penjadwalan servis berkala berbasis kalkulasi jarak tempuh, dan pengingat pajak STNK. <i>(Stack: Laravel, Tailwind CSS, MySQL, REST API)</i>.", bullet_style))
    story.append(Spacer(1, 0.3))

    # FindIt
    story.append(Paragraph("<b>FindIt – Sistem Informasi Barang Hilang & Ditemukan 27 Kampus UBSI</b>", item_title_style))
    story.append(Paragraph("• Sistem informasi penemuan dan kehilangan barang terpadu untuk 27 kampus cabang UBSI se-Indonesia dengan partisi data multi-cabang tanpa benturan ID, pencatatan loker brankas penitipan, dan validasi klaim identitas mahasiswa. <i>(Stack: Laravel, Blade, MySQL, REST API)</i>.", bullet_style))
    story.append(Spacer(1, 0.3))

    # CalTrack
    story.append(Paragraph("<b>CalTrack – Aplikasi Mobile Kesehatan & Kalkulator Nutrisi IMT</b>", item_title_style))
    story.append(Paragraph("• Aplikasi mobile Android cross-platform dengan Flutter & MVVM untuk kalkulasi IMT/BMI real-time, panduan nutrisi harian, dan integrasi backend REST API Laravel. <i>(Stack: Flutter, Dart, Laravel REST API, MySQL)</i>.", bullet_style))
    story.append(Spacer(1, 0.3))

    # Kastrix POS
    story.append(Paragraph("<b>Kastrix – Platform Kasir Pintar (POS) & Manajemen Multi-Gerai</b>", item_title_style))
    story.append(Paragraph("• Membangun sistem Point of Sale (POS) multi-gerai dengan pembagian peran Super Admin dan Kasir, katalog menu dinamis, pencatatan transaksi kasir kilat, serta visualisasi rekap laba kotor real-time. <i>(Stack: Laravel, React, Tailwind CSS, MySQL, REST API)</i>.", bullet_style))
    story.append(Spacer(1, 0.3))

    # Sistem PGNCOM
    story.append(Paragraph("<b>Sistem Monitoring Realisasi Biaya & Dashboard Power BI (PGNCOM)</b>", item_title_style))
    story.append(Paragraph("• Mengembangkan sistem web internal monitoring anggaran dan mengintegrasikan basis data transaksi operasional ke dashboard analitik Microsoft Power BI interaktif menggunakan formula DAX untuk evaluasi deviasi proyek. <i>(Stack: Laravel, Microsoft Power BI, DAX, MySQL)</i>.", bullet_style))
    story.append(Spacer(1, 0.8))

    # ==========================================
    # 7. SERTIFIKASI KOMPETENSI & PENGHARGAAN RESMI
    # ==========================================
    for elem in section_heading("Sertifikasi Kompetensi & Penghargaan Resmi"):
        story.append(elem)

    cert_table = Table([
        [
            Paragraph("<b>Sertifikat Kompetensi Database Administrator</b> — Badan Nasional Sertifikasi Profesi (BNSP) & LSP UBSI", item_title_style),
            Paragraph("Mar 2026 – 2029", item_date_style)
        ],
        [
            Paragraph("• Dinyatakan Kompeten secara nasional dalam perancangan basis data relasional, penulisan kueri SQL tingkat lanjut, pengoptimalan indeks, dan integritas data.", bullet_style),
            Paragraph("", item_date_style)
        ],
        [
            Paragraph("<b>Sertifikasi Kompetensi Analis Program (Program Analyst)</b> — BNSP & LSP UBSI", item_title_style),
            Paragraph("Agustus 2026 – 2029", item_date_style)
        ],
        [
            Paragraph("• Lulus uji asesmen 10 unit kompetensi SKKNI: skalabilitas sistem, SQL, algoritma, debugging, profiling, code review, dan pengujian program. <i>(Blangko fisik dalam proses penerbitan BNSP)</i>.", bullet_style),
            Paragraph("", item_date_style)
        ],
        [
            Paragraph("<b>Juara 1 IT Bootcamp Software Development</b> — Fakultas Teknologi Informasi (FTI) & Rektorat UBSI", item_title_style),
            Paragraph("2025", item_date_style)
        ],
        [
            Paragraph("• Meraih predikat JUARA 1 tingkat nasional mengungguli perwakilan mahasiswa dari seluruh kampus cabang UBSI se-Indonesia atas keunggulan arsitektur sistem dan mutu kode.", bullet_style),
            Paragraph("", item_date_style)
        ],
    ], colWidths=[usable_w - 110, 110])
    cert_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('PADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,1), (-1,1), 0.3),
        ('BOTTOMPADDING', (0,3), (-1,3), 0.3),
        ('BOTTOMPADDING', (0,5), (-1,5), 0.3),
    ]))
    story.append(cert_table)

    doc.build(story)
    print(f"Executive 1-page CV ATS generated successfully at: {output_path}")

def render_preview_png(pdf_path, png_path):
    doc = pymupdf.open(pdf_path)
    print(f"Total halaman hasil build: {len(doc)}")
    page = doc[0]
    pix = page.get_pixmap(dpi=200)
    os.makedirs(os.path.dirname(png_path), exist_ok=True)
    pix.save(png_path)
    print(f"Preview PNG tersimpan di: {png_path} ({pix.width}x{pix.height})")

if __name__ == "__main__":
    out_dir = r"c:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\public"
    os.makedirs(out_dir, exist_ok=True)
    
    cv_ats_path = os.path.join(out_dir, "CV_Dimas_Wijanarko_ATS.pdf")
    cv_default_path = os.path.join(out_dir, "cv-dimas-wijanarko.pdf")
    
    build_executive_1page_cv(cv_ats_path)
    build_executive_1page_cv(cv_default_path)

    preview_png_path = os.path.join(out_dir, "cv_preview", "1page_clean_1.png")
    render_preview_png(cv_ats_path, preview_png_path)
