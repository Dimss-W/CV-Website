import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, PageBreak
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_footer(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_footer(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        footer_text = f"Curriculum Vitae — Dimas Wijanarko | Halaman {self._pageNumber} dari {page_count}"
        self.drawRightString(A4[0] - 36, 18, footer_text)
        self.drawString(36, 18, "Terverifikasi Sistem ATS • Standar Profesional Rekayasa Perangkat Lunak")
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(36, 28, A4[0] - 36, 28)
        self.restoreState()

def create_ats_cv(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=32,
        bottomMargin=34,
        title="Curriculum Vitae - Dimas Wijanarko",
        author="Dimas Wijanarko",
        subject="CV ATS - Full Stack Web & Mobile Software Engineer",
    )

    styles = getSampleStyleSheet()

    primary_color = colors.HexColor("#0f172a")     # Slate 900
    accent_color = colors.HexColor("#0369a1")      # Sky 700
    body_color = colors.HexColor("#1e293b")        # Slate 800
    muted_color = colors.HexColor("#475569")       # Slate 600

    name_style = ParagraphStyle(
        'DocName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=19,
        leading=22,
        textColor=primary_color,
        spaceAfter=2,
    )

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=accent_color,
        spaceAfter=3,
    )

    contact_style = ParagraphStyle(
        'DocContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=11.5,
        textColor=body_color,
    )

    section_header_style = ParagraphStyle(
        'SectionHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=primary_color,
        spaceBefore=6,
        spaceAfter=2,
        keepWithNext=True,
    )

    item_title_style = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.8,
        leading=11.8,
        textColor=primary_color,
    )

    item_subtitle_style = ParagraphStyle(
        'ItemSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=11.2,
        textColor=accent_color,
    )

    item_date_style = ParagraphStyle(
        'ItemDate',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11.2,
        textColor=muted_color,
        alignment=2,
    )

    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=11.2,
        textColor=body_color,
        spaceAfter=1.5,
    )

    bullet_style = ParagraphStyle(
        'DocBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=11.4,
        textColor=body_color,
        leftIndent=11,
        firstLineIndent=-7,
        spaceAfter=2,
    )

    def section_heading(title_text):
        return [
            Paragraph(title_text.upper(), section_header_style),
            HRFlowable(width="100%", thickness=0.6, color=accent_color, spaceAfter=3, spaceBefore=1)
        ]

    story = []

    # ==========================================
    # HALAMAN 1: IDENTITAS, BIODATA, PENDIDIKAN, KEAHLIAN & PENGALAMAN KERJA
    # ==========================================
    
    # 1. HEADER
    story.append(Paragraph("DIMAS WIJANARKO", name_style))
    story.append(Paragraph("Full Stack Web & Mobile Software Engineer • Mahasiswa Sistem Informasi UBSI", title_style))

    contact_text = (
        "Jl. Kramat Jaya RT.001 RW.01, Johar Baru, Jakarta Pusat, DKI Jakarta 10560 &nbsp;|&nbsp; "
        "+62 857-9477-0824 &nbsp;|&nbsp; "
        "<a href='mailto:dmswijanarko@gmail.com' color='#0369a1'><u>dmswijanarko@gmail.com</u></a>"
    )
    story.append(Paragraph(contact_text, contact_style))

    links_text = (
        "LinkedIn: <a href='https://linkedin.com/in/dimas-wijanarko' color='#0369a1'><u>linkedin.com/in/dimas-wijanarko</u></a> &nbsp;|&nbsp; "
        "GitHub: <a href='https://github.com/Dimss-W' color='#0369a1'><u>github.com/Dimss-W</u></a> &nbsp;|&nbsp; "
        "Portofolio: <a href='https://github.com/Dimss-W/CV-Website' color='#0369a1'><u>github.com/Dimss-W/CV-Website</u></a>"
    )
    story.append(Paragraph(links_text, contact_style))
    story.append(Spacer(1, 3))
    story.append(HRFlowable(width="100%", thickness=1.2, color=primary_color, spaceAfter=4, spaceBefore=1))

    # 2. BIODATA MAHASISWA & PROFIL RINGKAS
    for elem in section_heading("Biodata Mahasiswa & Profil Profesional"):
        story.append(elem)

    biodata_data = [
        [
            Paragraph("<b>NIM</b>", body_style),
            Paragraph(": 19230181", body_style),
            Paragraph("<b>Program Studi</b>", body_style),
            Paragraph(": S1 Sistem Informasi", body_style),
        ],
        [
            Paragraph("<b>Nama Lengkap</b>", body_style),
            Paragraph(": Dimas Wijanarko", body_style),
            Paragraph("<b>Institusi</b>", body_style),
            Paragraph(": Universitas Bina Sarana Informatika (UBSI)", body_style),
        ],
        [
            Paragraph("<b>Tempat, Tanggal Lahir</b>", body_style),
            Paragraph(": Jakarta, 21 April 2004", body_style),
            Paragraph("<b>Status Akademik</b>", body_style),
            Paragraph(": Mahasiswa Aktif (2023 - Sekarang)", body_style),
        ],
        [
            Paragraph("<b>Alamat Lengkap</b>", body_style),
            Paragraph(": Jl. Kramat Jaya RT.001 RW.01, Johar Baru, Jakarta Pusat", body_style),
            Paragraph("<b>Fokus Keahlian</b>", body_style),
            Paragraph(": Full Stack Web, Mobile Flutter & Power BI", body_style),
        ],
    ]

    t_biodata = Table(biodata_data, colWidths=[120, 160, 95, 148])
    t_biodata.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_biodata)
    story.append(Spacer(1, 2))

    summary_p = (
        "Mahasiswa Sistem Informasi Universitas Bina Sarana Informatika dengan keahlian mendalam pada rekayasa perangkat lunak web dan mobile. "
        "Memegang sertifikasi resmi <b>Database Administrator oleh BNSP</b> serta peraih <b>Juara 1 IT Bootcamp Software Development UBSI</b>. "
        "Berpengalaman membangun sistem operasional korporat di PT PGAS Telekomunikasi Nusantara (PGNCOM) terintegrasi analitik Power BI, "
        "serta merilis sistem produksi nyata seperti Otokeep (manajemen armada dengan integrasi Google Gemini Vision AI OCR) dan FindIt (sistem terpadu 27 kampus cabang UBSI)."
    )
    story.append(Paragraph(summary_p, body_style))
    story.append(Spacer(1, 3))

    # 3. PENDIDIKAN FORMAL (Lengkap sesuai berkas asli)
    for elem in section_heading("Pendidikan Formal"):
        story.append(elem)

    edu_table_data = [
        [
            Paragraph("<b>Universitas Bina Sarana Informatika (UBSI)</b>", item_title_style),
            Paragraph("2023 – Sekarang", item_date_style),
        ],
        [
            Paragraph("S1 Sistem Informasi &nbsp;|&nbsp; NIM: 19230181 &nbsp;|&nbsp; Mahasiswa Aktif", body_style),
            Paragraph("Jakarta, Indonesia", item_date_style),
        ],
        [
            Paragraph("<b>SMK Negeri 31 Jakarta</b>", item_title_style),
            Paragraph("2019 – 2022", item_date_style),
        ],
        [
            Paragraph("Jurusan Animasi &nbsp;|&nbsp; Tahun Lulus: 2022", body_style),
            Paragraph("Jakarta Pusat, Indonesia", item_date_style),
        ],
        [
            Paragraph("<b>SMP Negeri 156 Jakarta</b>", item_title_style),
            Paragraph("2016 – 2019", item_date_style),
        ],
        [
            Paragraph("Pendidikan Sekolah Menengah Pertama &nbsp;|&nbsp; Tahun Lulus: 2019", body_style),
            Paragraph("Jakarta Pusat, Indonesia", item_date_style),
        ],
        [
            Paragraph("<b>SD Negeri 17 Pagi Jakarta</b>", item_title_style),
            Paragraph("2010 – 2016", item_date_style),
        ],
        [
            Paragraph("Pendidikan Sekolah Dasar &nbsp;|&nbsp; Tahun Lulus: 2016", body_style),
            Paragraph("Jakarta Pusat, Indonesia", item_date_style),
        ],
    ]
    t_edu = Table(edu_table_data, colWidths=[380, 143])
    t_edu.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 0.8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.2),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_edu)
    story.append(Spacer(1, 3))

    # 4. KEAHLIAN TEKNIS
    for elem in section_heading("Keahlian Teknis & Kompetensi"):
        story.append(elem)

    skills_data = [
        [
            Paragraph("<b>Bahasa Pemrograman</b>", item_title_style),
            Paragraph(": PHP, Dart, TypeScript, JavaScript, SQL, HTML5, CSS3", body_style),
        ],
        [
            Paragraph("<b>Framework & Library</b>", item_title_style),
            Paragraph(": Laravel, Flutter, React.js, Next.js 13+, Tailwind CSS, Blade", body_style),
        ],
        [
            Paragraph("<b>Basis Data & Analitik</b>", item_title_style),
            Paragraph(": MySQL, PostgreSQL, Supabase Cloud, Microsoft Power BI, DAX, Optimasi Kueri SQL", body_style),
        ],
        [
            Paragraph("<b>Arsitektur & Konsep</b>", item_title_style),
            Paragraph(": Arsitektur MVC, RESTful API, Autentikasi JWT, Role-Based Access Control (RBAC)", body_style),
        ],
        [
            Paragraph("<b>Tools, AI & DevOps</b>", item_title_style),
            Paragraph(": Git, GitHub, Gemini Vision AI (OCR), Postman, Figma, Linux/Vercel Deployment", body_style),
        ],
    ]
    t_skills = Table(skills_data, colWidths=[130, 393])
    t_skills.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 0.8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.8),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_skills)
    story.append(Spacer(1, 3))

    # 5. PENGALAMAN KERJA (PGNCOM & SMK Muhammadiyah 15)
    for elem in section_heading("Pengalaman Kerja & Profesional"):
        story.append(elem)

    # Experience 1: PGNCOM
    exp1_header = [
        [
            Paragraph("<b>Web Developer & Data Analytics Intern</b>", item_title_style),
            Paragraph("Januari 2026 – Maret 2026", item_date_style),
        ],
        [
            Paragraph("<b>PT PGAS Telekomunikasi Nusantara (PGNCOM)</b> — Subholding Gas Pertamina", item_subtitle_style),
            Paragraph("Jakarta, Indonesia", item_date_style),
        ]
    ]
    t_exp1 = Table(exp1_header, colWidths=[380, 143])
    t_exp1.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,1), (-1,1), 1.5)]))
    story.append(t_exp1)
    story.append(Paragraph("• Membangun portal web internal <i>Monitoring Realisasi Biaya & QC BASTO</i> berbasis Laravel dan MySQL untuk mengotomasi alur validasi dokumen Berita Acara Serah Terima Operasional (BASTO) dan kepatuhan anggaran proyek.", bullet_style))
    story.append(Paragraph("• Merancang dan mengintegrasikan dashboard visualisasi interaktif Microsoft Power BI menggunakan pemodelan data relasional dan kalkulasi formula DAX untuk memonitor deviasi realisasi biaya serta performa proyek secara real-time.", bullet_style))
    story.append(Paragraph("• Mengimplementasikan sistem manajemen hak akses multi-level pengguna (RBAC) dan riwayat audit transaksi untuk memastikan keamanan serta akuntabilitas data operasional perusahaan.", bullet_style))
    story.append(Spacer(1, 3))

    # Experience 2: SMK Muhammadiyah 15
    exp2_header = [
        [
            Paragraph("<b>Pengajar Tamu & Instruktur Rekayasa Perangkat Lunak (RPL)</b>", item_title_style),
            Paragraph("2025", item_date_style),
        ],
        [
            Paragraph("<b>SMK Muhammadiyah 15 Jakarta</b> — Jurusan Rekayasa Perangkat Lunak", item_subtitle_style),
            Paragraph("Jakarta Selatan, Indonesia", item_date_style),
        ]
    ]
    t_exp2 = Table(exp2_header, colWidths=[380, 143])
    t_exp2.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,1), (-1,1), 1.5)]))
    story.append(t_exp2)
    story.append(Paragraph("• Menjadi instruktur teknis tamu yang membawakan kurikulum pengembangan web modern: pengenalan Framework Laravel, struktur MVC, dan administrasi database relasional MySQL kepada siswa kejuruan RPL.", bullet_style))
    story.append(Paragraph("• Membimbing sesi praktikum laboratorium komputer mengenai penerapan kode bersih (clean code) dan alur kerja kolaborasi version control berbasis Git & GitHub standar industri perangkat lunak.", bullet_style))

    # ==========================================
    # HALAMAN 2: PROYEK REKAYASA SISTEM & SERTIFIKASI
    # ==========================================
    story.append(PageBreak())

    # Experience 3: Proyek Independen
    for elem in section_heading("Pengalaman Rekayasa Perangkat Lunak Mandiri"):
        story.append(elem)

    exp3_header = [
        [
            Paragraph("<b>Pengembang Perangkat Lunak Web & Mobile (Full Stack)</b>", item_title_style),
            Paragraph("2023 – Sekarang", item_date_style),
        ],
        [
            Paragraph("<b>Proyek Mandiri & Klien Independen</b>", item_subtitle_style),
            Paragraph("Jakarta, Indonesia", item_date_style),
        ]
    ]
    t_exp3 = Table(exp3_header, colWidths=[380, 143])
    t_exp3.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,1), (-1,1), 1.5)]))
    story.append(t_exp3)
    story.append(Paragraph("• Merancang, membangun, dan merilis aplikasi mobile berbasis Flutter & Dart serta aplikasi web berskala enterprise terintegrasi backend RESTful API terstruktur dan basis data relasional.", bullet_style))
    story.append(Paragraph("• Mengelola siklus hidup pengembangan perangkat lunak (SDLC) end-to-end: analisis kebutuhan sistem bisnis, perancangan skema database, pembuatan antarmuka responsif, pengujian fungsionalitas, hingga rilis produksi.", bullet_style))
    story.append(Spacer(1, 4))

    for elem in section_heading("Proyek Rekayasa Perangkat Lunak Unggulan"):
        story.append(elem)

    # Project 1: Otokeep
    p1_head = [
        [
            Paragraph("<b>Otokeep – Platform Servis Kendaraan Cerdas & Pemindai AI OCR</b>", item_title_style),
            Paragraph("<a href='https://otokeep-rho.vercel.app/' color='#0369a1'><u>otokeep-rho.vercel.app</u></a>", item_date_style),
        ],
        [
            Paragraph("<i>Teknologi: Laravel, Tailwind CSS, MySQL, Google Gemini Vision AI, REST API</i>", item_subtitle_style),
            Paragraph("<a href='https://github.com/Dimss-W/Otokeep.git' color='#0369a1'><u>GitHub Repository</u></a>", item_date_style),
        ]
    ]
    t_p1 = Table(p1_head, colWidths=[380, 143])
    t_p1.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,1), (-1,1), 1.5)]))
    story.append(t_p1)
    story.append(Paragraph("• Mengembangkan platform cerdas pemantauan perawatan kendaraan dan manajemen armada dengan integrasi Google Gemini Vision API untuk mendeteksi serta mengekstraksi angka odometer dari foto speedometer secara instan.", bullet_style))
    story.append(Paragraph("• Mengimplementasikan kompresi citra JPEG sisi klien untuk memangkas latensi upload di bawah 1,5 detik serta fitur penjadwalan servis berkala, estimasi biaya suku cadang, dan pengingat pajak STNK.", bullet_style))
    story.append(Paragraph("• Menyediakan panel login kredensial tamu untuk memudahkan verifikasi dan pengujian fungsionalitas sistem secara live.", bullet_style))
    story.append(Spacer(1, 3.5))

    # Project 2: FindIt
    p2_head = [
        [
            Paragraph("<b>FindIt – Sistem Terpadu Kehilangan & Penemuan Barang 27 Kampus UBSI</b>", item_title_style),
            Paragraph("<a href='https://findit-git-main-dim-6414.vercel.app/' color='#0369a1'><u>findit-ubsi.vercel.app</u></a>", item_date_style),
        ],
        [
            Paragraph("<i>Teknologi: Laravel, Blade, MySQL, REST API, Multi-Campus Tenant</i>", item_subtitle_style),
            Paragraph("<a href='https://github.com/Dimss-W/FindIt.git' color='#0369a1'><u>GitHub Repository</u></a>", item_date_style),
        ]
    ]
    t_p2 = Table(p2_head, colWidths=[380, 143])
    t_p2.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,1), (-1,1), 1.5)]))
    story.append(t_p2)
    story.append(Paragraph("• Membangun sistem informasi pengelolaan barang hilang dan temuan terpusat yang melayani civitas akademika di 27 kampus cabang Universitas Bina Sarana Informatika se-Indonesia.", bullet_style))
    story.append(Paragraph("• Merancang arsitektur relasi database multi-cabang tanpa tabrakan ID, alur pengesahan loker brankas penitipan, serta verifikasi klaim kepemilikan berbasis nomor induk mahasiswa (NIM).", bullet_style))
    story.append(Paragraph("• Melengkapi alur moderasi laporan barang bagi staf kampus dan dashboard kontrol rekapitulasi status temuan barang.", bullet_style))
    story.append(Spacer(1, 3.5))

    # Project 3: CalTrack
    p3_head = [
        [
            Paragraph("<b>CalTrack – Aplikasi Mobile Kesehatan & Kalkulator Nutrisi IMT</b>", item_title_style),
            Paragraph("2024", item_date_style),
        ],
        [
            Paragraph("<i>Teknologi: Flutter, Dart, Laravel REST API, MySQL, Android Mobile App</i>", item_subtitle_style),
            Paragraph("<a href='https://github.com/Dimss-W' color='#0369a1'><u>GitHub Profile</u></a>", item_date_style),
        ]
    ]
    t_p3 = Table(p3_head, colWidths=[380, 143])
    t_p3.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,1), (-1,1), 1.5)]))
    story.append(t_p3)
    story.append(Paragraph("• Mengembangkan aplikasi mobile Android cross-platform menggunakan Flutter dengan arsitektur MVVM dan konsumsi REST API Laravel untuk kalkulasi Indeks Massa Tubuh (IMT/BMI) real-time.", bullet_style))
    story.append(Paragraph("• Menyediakan personalisasi panduan asupan kalori harian, riwayat aktivitas olahraga, dan modul konsultasi kesehatan dengan penyimpanan token autentikasi terenkripsi.", bullet_style))
    story.append(Spacer(1, 3.5))

    # Project 4: Kastrix POS
    p4_head = [
        [
            Paragraph("<b>Kastrix – Platform Kasir Pintar (POS) & Manajemen Multi-Gerai</b>", item_title_style),
            Paragraph("2024", item_date_style),
        ],
        [
            Paragraph("<i>Teknologi: Laravel, React, Tailwind CSS, MySQL, REST API</i>", item_subtitle_style),
            Paragraph("<a href='https://github.com/Dimss-W' color='#0369a1'><u>GitHub Profile</u></a>", item_date_style),
        ]
    ]
    t_p4 = Table(p4_head, colWidths=[380, 143])
    t_p4.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,1), (-1,1), 1.5)]))
    story.append(t_p4)
    story.append(Paragraph("• Membangun sistem Point of Sale (POS) multi-gerai dengan pembagian peran Super Admin dan Kasir, katalog menu dinamis, pencatatan transaksi kasir kilat, serta visualisasi rekap laba kotor real-time.", bullet_style))
    story.append(Spacer(1, 4))

    # Project 5: PGNCOM
    p5_head = [
        [
            Paragraph("<b>Sistem Monitoring Realisasi Biaya & Dashboard Power BI PGNCOM</b>", item_title_style),
            Paragraph("2026", item_date_style),
        ],
        [
            Paragraph("<i>Teknologi: Microsoft Power BI, DAX, Laravel, MySQL, Corporate Architecture</i>", item_subtitle_style),
            Paragraph("<a href='https://github.com/Dimss-W/Sistem-Input-Realisasi.git' color='#0369a1'><u>GitHub Repo</u></a>", item_date_style),
        ]
    ]
    t_p5 = Table(p5_head, colWidths=[380, 143])
    t_p5.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,1), (-1,1), 1.5)]))
    story.append(t_p5)
    story.append(Paragraph("• Mengintegrasikan basis data transaksi operasional ke visualisasi analitik Microsoft Power BI interaktif untuk memudahkan evaluasi deviasi anggaran proyek dan status dokumen BASTO.", bullet_style))
    story.append(Spacer(1, 4))

    # SERTIFIKASI & LISENSI
    for elem in section_heading("Sertifikasi Kompetensi & Penghargaan Resmi"):
        story.append(elem)

    cert_data = [
        [
            Paragraph("<b>Sertifikat Kompetensi Database Administrator</b>", item_title_style),
            Paragraph("Maret 2026 – Maret 2029", item_date_style),
        ],
        [
            Paragraph("Badan Nasional Sertifikasi Profesi (BNSP) & LSP Universitas Bina Sarana Informatika", item_subtitle_style),
            Paragraph("No. Reg. DMS.1241.00936 2026", item_date_style),
        ],
    ]
    t_c1 = Table(cert_data, colWidths=[370, 153])
    t_c1.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,1), (-1,1), 1.5)]))
    story.append(t_c1)
    story.append(Paragraph("• Dinyatakan Kompeten secara nasional (No. Sertifikat: 63120 2521 6 0000936 2026) dalam unit kompetensi: merancang arsitektur basis data konseptual dan logikal, menulis kueri SQL tingkat lanjut, mengoptimalkan indeks tabel, dan mengimplementasikan kebijakan integritas keamanan data.", bullet_style))
    story.append(Spacer(1, 3.5))

    award_data = [
        [
            Paragraph("<b>Juara 1 IT Bootcamp Software Development</b>", item_title_style),
            Paragraph("2025", item_date_style),
        ],
        [
            Paragraph("Fakultas Teknologi Informasi (FTI) & Rektorat Universitas Bina Sarana Informatika", item_subtitle_style),
            Paragraph("Tingkat Nasional Se-UBSI", item_date_style),
        ],
    ]
    t_a1 = Table(award_data, colWidths=[370, 153])
    t_a1.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,1), (-1,1), 1.5)]))
    story.append(t_a1)
    story.append(Paragraph("• Meraih penghargaan peringkat pertama dalam kompetisi pengembangan sistem web intensif, mengungguli perwakilan mahasiswa dari seluruh kampus cabang UBSI di Indonesia dengan penilaian mutu arsitektur, clean code, dan fungsionalitas aplikasi.", bullet_style))

    # Build PDF
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"CV ATS generated successfully at: {output_path}")

if __name__ == "__main__":
    out_dir = r"c:\Users\Dimas Wijanarko\.gemini\antigravity-ide\scratch\personal-cv-web\public"
    os.makedirs(out_dir, exist_ok=True)
    
    cv_ats_path = os.path.join(out_dir, "CV_Dimas_Wijanarko_ATS.pdf")
    cv_default_path = os.path.join(out_dir, "cv-dimas-wijanarko.pdf")
    
    create_ats_cv(cv_ats_path)
    create_ats_cv(cv_default_path)
