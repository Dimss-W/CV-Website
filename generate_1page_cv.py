import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, Image, PageBreak
)

def build_ats_cv(output_path):
    # Dimensi A4: 595.27 x 841.89 pt
    # Margin simetris standar Times New Roman: 36 pt (0.5 inch) di seluruh sisi
    usable_w = 595.27 - (36 * 2)  # 523.27 pt
    
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36,
        title="Curriculum Vitae - Dimas Wijanarko",
        author="Dimas Wijanarko",
        subject="CV ATS - Full Stack Web & Mobile Software Engineer",
    )

    styles = getSampleStyleSheet()

    c_primary = colors.HexColor("#0f172a")     # Slate 900 (Hitam Pekat)
    c_body = colors.HexColor("#334155")        # Slate 700 (Teks Isi)
    c_muted = colors.HexColor("#64748b")       # Slate 500 (Tanggal / Keterangan)

    # Header Styles (Times New Roman, Centered, Font Sedikit Lebih Besar)
    name_style = ParagraphStyle(
        'DocNameCenter',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=19.0,
        leading=22.0,
        textColor=c_primary,
        alignment=TA_CENTER,
        spaceAfter=2.0,
    )

    title_style = ParagraphStyle(
        'DocTitleCenter',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=10.2,
        leading=13.0,
        textColor=c_primary,
        alignment=TA_CENTER,
        spaceAfter=2.5,
    )

    contact_style = ParagraphStyle(
        'DocContactCenter',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.8,
        leading=11.5,
        textColor=c_body,
        alignment=TA_CENTER,
        spaceAfter=1.5,
    )

    section_header_style = ParagraphStyle(
        'SectionHeader',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=10.8,
        leading=13.5,
        textColor=c_primary,
        spaceBefore=5.0,
        spaceAfter=1.5,
        keepWithNext=True,
    )

    item_title_style = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=9.6,
        leading=12.5,
        textColor=c_primary,
    )

    item_date_style = ParagraphStyle(
        'ItemDate',
        parent=styles['Normal'],
        fontName='Times-Italic',
        fontSize=9.0,
        leading=12.0,
        textColor=c_muted,
        alignment=2,
    )

    # Body Styles (Times-Roman, Rata Kanan-Kiri / Justify, Bersih Tanpa Bold Acak)
    body_style = ParagraphStyle(
        'DocBodyJustify',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=9.2,
        leading=12.6,
        textColor=c_body,
        alignment=TA_JUSTIFY,
        spaceAfter=0.8,
    )

    bullet_style = ParagraphStyle(
        'DocBulletJustify',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=9.2,
        leading=12.5,
        textColor=c_body,
        alignment=TA_JUSTIFY,
        leftIndent=10,
        firstLineIndent=-7,
        spaceAfter=1.0,
    )

    def section_heading(title_text):
        return [
            Paragraph(title_text.upper(), section_header_style),
            HRFlowable(width="100%", thickness=0.8, color=c_primary, spaceAfter=2.5, spaceBefore=1.0)
        ]

    story = []

    # ==========================================
    # HALAMAN 1
    # ==========================================

    # 1. HEADER: FOTO DI POJOK KIRI, DATA DIRI RATA TENGAH NAIK KE ATAS
    passport_img_path = r"c:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\public\dimas-profile-passport.jpg"
    photo_w = 58
    photo_h = 78
    img_element = Image(passport_img_path, width=photo_w, height=photo_h)
    img_element.hAlign = 'LEFT'

    header_text_cells = [
        Paragraph("DIMAS WIJANARKO", name_style),
        Paragraph("Full Stack Web & Mobile Software Engineer • Mahasiswa S1 Sistem Informasi UBSI", title_style),
        Paragraph(
            "TTL: Jakarta, 21 April 2004 &nbsp;|&nbsp; Alamat: Jl. Kramat Jaya RT.001 RW.01, Johar Baru, Jakarta Pusat, DKI Jakarta",
            contact_style
        ),
        Paragraph(
            "Email: <a href='mailto:dmswijanarko@gmail.com' color='#0f172a'><u>dmswijanarko@gmail.com</u></a> &nbsp;|&nbsp; "
            "LinkedIn: <a href='https://linkedin.com/in/dmswijanarko' color='#0f172a'><u>in/dmswijanarko</u></a> &nbsp;|&nbsp; "
            "GitHub: <a href='https://github.com/Dimss-W' color='#0f172a'><u>github.com/Dimss-W</u></a> &nbsp;|&nbsp; "
            "Web: <a href='https://dimaswijanarko.me' color='#0f172a'><u>dimaswijanarko.me</u></a>",
            contact_style
        ),
    ]

    header_table = Table(
        [[img_element, header_text_cells]],
        colWidths=[66, usable_w - 66]
    )
    header_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (0, 0), 0),
        ('RIGHTPADDING', (0, 0), (0, 0), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ('LEFTPADDING', (1, 0), (1, 0), 2),
        ('RIGHTPADDING', (1, 0), (1, 0), 0),
    ]))

    story.append(header_table)
    story.append(Spacer(1, 2.0))
    story.append(HRFlowable(width="100%", thickness=1.0, color=c_primary, spaceAfter=2.5, spaceBefore=1.0))

    # 2. RINGKASAN PROFESIONAL (MENCERMINKAN IDENTITAS DIRI, JUSTIFIED, ISI BERSIH)
    for elem in section_heading("Ringkasan Profesional"):
        story.append(elem)

    summary_text = (
        "Software Engineer (Web & Mobile) dan mahasiswa S1 Sistem Informasi UBSI dengan fondasi desain visual serta analitik data. "
        "Berfokus pada perancangan aplikasi web modern menggunakan Laravel, aplikasi mobile lintas platform dengan Flutter, dan arsitektur basis data relasional tersertifikasi Database Administrator BNSP. "
        "Memiliki pengalaman industri di PT PGAS Telekomunikasi Nusantara (PGNCOM) dalam membangun sistem monitoring operasional dan dashboard interaktif Power BI. "
        "Memadukan ketelitian kode bersih, kepekaan estetika antarmuka (UI/UX), serta jiwa kepemimpinan aktif sebagai Ketua Umum PRISMA dan instruktur tamu RPL. "
        "Berdedikasi menghadirkan produk digital yang efisien, skalabel, dan memberikan nilai nyata bagi pengguna."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 2.0))

    # 3. KEAHLIAN TEKNIS & KOMPETENSI (SEJAJAR RATA PENUH DENGAN BULLET LAINNYA)
    for elem in section_heading("Keahlian Teknis & Kompetensi"):
        story.append(elem)

    skills_items = [
        ("Bahasa & Framework", "PHP, Laravel, Dart, Flutter, TypeScript, JavaScript, React.js, Next.js, Tailwind CSS, HTML5, CSS3"),
        ("Basis Data & Analitik", "MySQL, PostgreSQL, Supabase Cloud, Microsoft Power BI, Kalkulasi DAX, Optimasi Kueri SQL, Relasi ERD"),
        ("Tools & Arsitektur", "Git, GitHub, RESTful API, Arsitektur MVC, RBAC, Postman, Linux Server, Vercel Cloud"),
    ]
    for cat, items in skills_items:
        story.append(Paragraph(f"• <b>{cat}:</b> {items}", bullet_style))
    story.append(Spacer(1, 2.0))

    # 4. PENDIDIKAN FORMAL (SEJAJAR RATA PENUH PERSIS SEPERTI PENGALAMAN KERJA)
    for elem in section_heading("Pendidikan Formal"):
        story.append(elem)

    # UBSI
    edu1_t = Table([
        [Paragraph("<b>Universitas Bina Sarana Informatika (UBSI)</b> — S1 Sistem Informasi", item_title_style),
         Paragraph("Sep 2023 – Sekarang (Aktif)", item_date_style)],
    ], colWidths=[usable_w - 150, 150])
    edu1_t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('PADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(edu1_t)
    story.append(Paragraph("• Mata Kuliah Relevan: Pemrograman Web (Laravel), Pemrograman Mobile (Flutter & Dart), Rekayasa Perangkat Lunak, Basis Data Relasional & SQL, Sistem Informasi Manajemen.", bullet_style))
    story.append(Spacer(1, 1.8))

    # SMK Negeri 31 Jakarta
    edu2_t = Table([
        [Paragraph("<b>SMK Negeri 31 Jakarta</b> — Kompetensi Keahlian Animasi", item_title_style),
         Paragraph("Juli 2019 – Juli 2022", item_date_style)],
    ], colWidths=[usable_w - 150, 150])
    edu2_t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('PADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(edu2_t)
    story.append(Paragraph("• Fokus Pembelajaran: Desain visual antarmuka pengguna (UI/UX), permodelan grafis digital, animasi komputer, dan komposisi aset multimedia.", bullet_style))
    story.append(Spacer(1, 2.0))

    # 5. PENGALAMAN KERJA & MENGAJAR (ISI TIDAK DI-BOLD)
    for elem in section_heading("Pengalaman Kerja & Mengajar"):
        story.append(elem)

    # Exp 1: PGNCOM
    exp1_t = Table([
        [Paragraph("<b>Web Developer & Data Analytics Intern</b> — PT PGAS Telekomunikasi Nusantara (PGNCOM)", item_title_style),
         Paragraph("Agustus 2026 – November 2026", item_date_style)],
    ], colWidths=[usable_w - 140, 140])
    exp1_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(exp1_t)
    story.append(Paragraph("• Mengembangkan sistem web internal Monitoring Realisasi Biaya & QC BASTO berbasis Laravel dan MySQL untuk mengotomasi alur validasi dokumen Berita Acara Serah Terima Operasional (BASTO) dan kepatuhan anggaran proyek.", bullet_style))
    story.append(Paragraph("• Merancang dan mengintegrasikan dashboard visualisasi interaktif Microsoft Power BI menggunakan pemodelan data relasional dan kalkulasi formula DAX untuk memonitor deviasi realisasi biaya serta performa proyek secara real-time.", bullet_style))
    story.append(Paragraph("• Mengimplementasikan manajemen hak akses berjenjang (RBAC) dan riwayat audit transaksi untuk menjamin integritas data operasional perusahaan.", bullet_style))
    story.append(Spacer(1, 1.5))

    # Exp 2: SMK Muhammadiyah 15
    exp2_t = Table([
        [Paragraph("<b>Pengajar Tamu & Instruktur Rekayasa Perangkat Lunak (RPL)</b> — SMK Muhammadiyah 15 Jakarta", item_title_style),
         Paragraph("2025", item_date_style)],
    ], colWidths=[usable_w - 140, 140])
    exp2_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(exp2_t)
    story.append(Paragraph("• Menjadi instruktur teknis tamu kurikulum web modern: pengenalan Framework Laravel, struktur arsitektur MVC, dan administrasi database MySQL.", bullet_style))
    story.append(Paragraph("• Membimbing praktikum laboratorium komputer mengenai penerapan clean code dan simulasi alur kolaborasi version control Git & GitHub standar industri.", bullet_style))
    story.append(Spacer(1, 1.5))

    # Exp 3: Proyek Mandiri
    exp3_t = Table([
        [Paragraph("<b>Pengembang Perangkat Lunak Web & Mobile (Full Stack)</b> — Proyek Independen & Klien", item_title_style),
         Paragraph("2023", item_date_style)],
    ], colWidths=[usable_w - 140, 140])
    exp3_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(exp3_t)
    story.append(Paragraph("• Merancang dan membangun aplikasi mobile (Flutter & Dart) serta web berskala enterprise terintegrasi RESTful API terstruktur dan database relasional.", bullet_style))

    # ==========================================
    # HALAMAN 2
    # ==========================================
    story.append(PageBreak())

    # 6. PENGALAMAN ORGANISASI (ISI TIDAK DI-BOLD)
    for elem in section_heading("Pengalaman Organisasi"):
        story.append(elem)

    org_t = Table([
        [Paragraph("<b>Ketua Umum</b> — Pengurus Remaja Islam Masjid (PRISMA)", item_title_style),
         Paragraph("2023 – Sekarang (Aktif)", item_date_style)],
    ], colWidths=[usable_w - 140, 140])
    org_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(org_t)
    story.append(Paragraph("• Memimpin organisasi kepemudaan masjid dalam merencanakan program kerja tahunan, memimpin rapat kepengurusan berkala, mengelola transparansi pendanaan kas umat, serta menjalin koordinasi strategis bersama Dewan Kemakmuran Masjid (DKM) dan aparatur wilayah.", bullet_style))
    story.append(Paragraph("• Menginisiasi dan mengeksekusi rangkaian program sosial-keagamaan rutin tahunan setiap bulan Ramadhan berskala ratusan penerima manfaat:", bullet_style))
    story.append(Paragraph("&nbsp;&nbsp;– Pemeriksaan & Pengobatan Medis Gratis: Menyelenggarakan layanan posko kesehatan gratis bagi warga sekitar bekerja sama dengan tenaga medis.", bullet_style))
    story.append(Paragraph("&nbsp;&nbsp;– Tabligh Akbar & Kajian Tematik: Mengoordinasikan acara keagamaan akbar menghadirkan penceramah dan ratusan jamaah.", bullet_style))
    story.append(Paragraph("&nbsp;&nbsp;– Perlombaan Islami Anak & Remaja: Menyelenggarakan kompetisi hafalan, adzan, dan wawasan islami untuk memacu semangat generasi muda.", bullet_style))
    story.append(Paragraph("&nbsp;&nbsp;– Santunan Sosial Anak Yatim, Dhuafa & Marbot: Menggalang dan menyalurkan paket sembako serta dana santunan tepat sasaran.", bullet_style))
    story.append(Spacer(1, 2.5))

    # 7. PROYEK REKAYASA PERANGKAT LUNAK UNGGULAN
    for elem in section_heading("Proyek Rekayasa Perangkat Lunak Unggulan"):
        story.append(elem)

    # Fleedy PGNMAS
    story.append(Paragraph("<b>Fleedy – Sistem Monitoring Kendaraan & GIS Telemetry (PT PGN MAS)</b>", item_title_style))
    story.append(Paragraph("• Membangun sistem komando pemantauan 1.229+ armada kendaraan operasional PT PGN MAS, analisis rasio utilisasi (88.4%), komposisi kepemilikan aset, pemetaan geospasial GIS interaktif (Leaflet) sebaran nasional, serta rekonsiliasi kontrak terintegrasi. (Stack: Laravel, React, Tailwind CSS, Leaflet GIS, MySQL).", bullet_style))
    story.append(Spacer(1, 1.5))

    # Otokeep
    story.append(Paragraph("<b>Otokeep – Platform Servis Kendaraan Cerdas & Manajemen Armada</b>", item_title_style))
    story.append(Paragraph("• Platform pemantauan servis kendaraan & armada cerdas dengan kompresi citra cepat, penjadwalan servis berkala berbasis kalkulasi jarak tempuh, estimasi biaya perawatan, dan pengingat masa aktif STNK. (Stack: Laravel, Tailwind CSS, MySQL, REST API).", bullet_style))
    story.append(Spacer(1, 1.5))

    # FindIt
    story.append(Paragraph("<b>FindIt – Sistem Informasi Barang Hilang & Ditemukan 27 Kampus UBSI</b>", item_title_style))
    story.append(Paragraph("• Sistem informasi pengelolaan barang hilang & penemuan terpadu untuk 27 kampus cabang UBSI se-Indonesia dengan partisi data multi-cabang tanpa benturan ID, pencatatan loker brankas penitipan terpusat, dan verifikasi identitas mahasiswa. (Stack: Laravel, Blade, MySQL, REST API).", bullet_style))
    story.append(Spacer(1, 1.5))

    # CalTrack
    story.append(Paragraph("<b>CalTrack – Aplikasi Mobile Kesehatan & Kalkulator Nutrisi IMT</b>", item_title_style))
    story.append(Paragraph("• Aplikasi mobile Android cross-platform dengan Flutter & MVVM untuk kalkulasi IMT/BMI real-time, panduan rekomendasi nutrisi harian, dan integrasi backend REST API Laravel. (Stack: Flutter, Dart, Laravel REST API, MySQL).", bullet_style))
    story.append(Spacer(1, 1.5))

    # Kastrix POS
    story.append(Paragraph("<b>Kastrix – Platform Kasir Pintar (POS) & Manajemen Multi-Gerai</b>", item_title_style))
    story.append(Paragraph("• Membangun sistem Point of Sale (POS) multi-gerai dengan pembagian peran Super Admin dan Kasir, katalog menu dinamis, pencatatan transaksi kasir kilat, serta visualisasi rekap laba kotor real-time. (Stack: Laravel, React, Tailwind CSS, MySQL, REST API).", bullet_style))
    story.append(Spacer(1, 1.5))

    # Sistem PGNCOM
    story.append(Paragraph("<b>Sistem Monitoring Realisasi Biaya & Dashboard Power BI (PGNCOM)</b>", item_title_style))
    story.append(Paragraph("• Mengembangkan sistem web internal monitoring anggaran dan mengintegrasikan basis data transaksi operasional ke dashboard analitik Microsoft Power BI interaktif menggunakan formula DAX untuk evaluasi deviasi proyek. (Stack: Laravel, Microsoft Power BI, DAX, MySQL).", bullet_style))
    story.append(Spacer(1, 2.5))

    # 8. SERTIFIKASI KOMPETENSI & PENGHARGAAN RESMI
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
            Paragraph("• Lulus uji asesmen 10 unit kompetensi SKKNI: skalabilitas sistem, SQL, algoritma, debugging, profiling, code review, dan pengujian program. (Blangko fisik dalam proses penerbitan BNSP).", bullet_style),
            Paragraph("", item_date_style)
        ],
        [
            Paragraph("<b>Juara 1 IT Bootcamp Software Development</b> — Fakultas Teknologi Informasi (FTI) & Rektorat UBSI", item_title_style),
            Paragraph("2025", item_date_style)
        ],
        [
            Paragraph("• Meraih predikat Juara 1 tingkat nasional mengungguli seluruh perwakilan mahasiswa kampus cabang UBSI se-Indonesia melalui platform Smart Tahfidz School.", bullet_style),
            Paragraph("", item_date_style)
        ],
    ], colWidths=[usable_w - 120, 120])
    cert_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 0.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(cert_table)

    doc.build(story)
    print(f"Times New Roman ATS CV generated successfully at: {output_path}")

if __name__ == "__main__":
    out_dir = r"c:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\public"
    os.makedirs(out_dir, exist_ok=True)
    
    cv_ats_path = os.path.join(out_dir, "CV_Dimas_Wijanarko_ATS.pdf")
    cv_default_path = os.path.join(out_dir, "cv-dimas-wijanarko.pdf")
    
    build_ats_cv(cv_ats_path)
    build_ats_cv(cv_default_path)
