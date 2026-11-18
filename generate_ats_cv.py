import os
import shutil
import pymupdf
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Flowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT, TA_RIGHT

# Palette matching the reference image
c_black = colors.HexColor("#0f172a")        # Dark Black / Slate 900 for text
c_blue = colors.HexColor("#1e3a8a")         # Deep Navy Blue for taglines, squares, dates, badges
c_line = colors.HexColor("#94a3b8")         # Slate 400 for thin divider lines
c_badge_bg = colors.HexColor("#eff6ff")     # Light blue background for skills badges (#eff6ff)
c_badge_border = colors.HexColor("#bfdbfe") # Border for skills badges

class TopAccentBar(Flowable):
    def __init__(self, page_width, height=4, color=c_blue):
        Flowable.__init__(self)
        self.page_width = page_width
        self.bar_height = height
        self.color = color
        self.height = height + 4

    def wrap(self, availWidth, availHeight):
        return availWidth, self.height

    def draw(self):
        canv = self.canv
        canv.saveState()
        canv.setFillColor(self.color)
        # Draw full width banner across top margin
        canv.rect(-36, self.height - self.bar_height + 10, A4[0], self.bar_height, fill=1, stroke=0)
        canv.restoreState()

class SectionDivider(Flowable):
    def __init__(self, title, width, font_name="Times-Bold", font_size=9.5, text_color=c_black, accent_color=c_blue, line_color=c_line):
        Flowable.__init__(self)
        self.title = title
        self.width = width
        self.font_name = font_name
        self.font_size = font_size
        self.text_color = text_color
        self.accent_color = accent_color
        self.line_color = line_color
        self.height = font_size + 7

    def wrap(self, availWidth, availHeight):
        return self.width, self.height

    def draw(self):
        canv = self.canv
        canv.saveState()
        
        canv.setFont(self.font_name, self.font_size)
        title_str = self.title.upper()
        text_w = canv.stringWidth(title_str, self.font_name, self.font_size)
        
        mid_x = self.width / 2.0
        y = self.height / 2.0 - 2.5
        
        sq_size = 3.5
        spacing = 5.0
        total_center_w = text_w + (sq_size * 2) + (spacing * 4)
        
        center_start = mid_x - (total_center_w / 2.0)
        center_end = mid_x + (total_center_w / 2.0)
        
        # Left line
        canv.setStrokeColor(self.line_color)
        canv.setLineWidth(0.65)
        canv.line(0, y + (sq_size / 2.0), center_start - spacing, y + (sq_size / 2.0))
        
        # Right line
        canv.line(center_end + spacing, y + (sq_size / 2.0), self.width, y + (sq_size / 2.0))
        
        # Left square
        canv.setFillColor(self.accent_color)
        canv.rect(center_start, y, sq_size, sq_size, fill=1, stroke=0)
        
        # Text
        canv.setFillColor(self.text_color)
        canv.drawString(center_start + sq_size + (spacing * 2), y - 0.5, title_str)
        
        # Right square
        canv.setFillColor(self.accent_color)
        canv.rect(center_end - sq_size, y, sq_size, sq_size, fill=1, stroke=0)
        
        canv.restoreState()

class DoubleHR(Flowable):
    def __init__(self, width, color=colors.HexColor("#0f172a"), space_before=2, space_after=4):
        Flowable.__init__(self)
        self.width = width
        self.color = color
        self.space_before = space_before
        self.space_after = space_after
        self.height = 4 + space_before + space_after

    def wrap(self, availWidth, availHeight):
        return self.width, self.height

    def draw(self):
        canv = self.canv
        canv.saveState()
        canv.setStrokeColor(self.color)
        # Top line: thin 0.5pt
        canv.setLineWidth(0.5)
        canv.line(0, self.space_after + 2.5, self.width, self.space_after + 2.5)
        # Bottom line: solid 1.2pt
        canv.setLineWidth(1.2)
        canv.line(0, self.space_after, self.width, self.space_after)
        canv.restoreState()

def build_ats_cv(output_path):
    margin_lr = 36
    margin_tb = 24
    usable_w = A4[0] - (margin_lr * 2) # 523.27 pt

    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=margin_lr,
        rightMargin=margin_lr,
        topMargin=margin_tb,
        bottomMargin=margin_tb
    )

    styles = getSampleStyleSheet()

    name_style = ParagraphStyle(
        'HeaderName',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=20.0,
        leading=23.0,
        textColor=c_black,
        alignment=TA_CENTER,
        spaceAfter=3.0,
    )

    tagline_style = ParagraphStyle(
        'HeaderTagline',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=9.2,
        leading=12.0,
        textColor=c_blue,
        alignment=TA_CENTER,
        spaceAfter=3.0,
    )

    contact_style = ParagraphStyle(
        'HeaderContact',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.2,
        leading=11.0,
        textColor=c_black,
        alignment=TA_CENTER,
        spaceAfter=2.0,
    )

    item_title_style = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=9.2,
        leading=12.0,
        textColor=c_black,
        alignment=TA_LEFT,
    )

    item_date_style = ParagraphStyle(
        'ItemDate',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=8.6,
        leading=12.0,
        textColor=c_blue,
        alignment=TA_RIGHT,
    )

    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.6,
        leading=11.8,
        textColor=c_black,
        alignment=TA_JUSTIFY,
        spaceAfter=2.5,
    )

    bullet_style = ParagraphStyle(
        'DocBullet',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.5,
        leading=11.5,
        textColor=c_black,
        alignment=TA_JUSTIFY,
        leftIndent=10,
        firstLineIndent=-7,
        spaceAfter=1.8,
    )

    skill_badge_style = ParagraphStyle(
        'SkillBadge',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=8.5,
        leading=11.0,
        textColor=c_blue,
        alignment=TA_CENTER,
    )

    skill_content_style = ParagraphStyle(
        'SkillContent',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.3,
        leading=11.4,
        textColor=c_black,
        alignment=TA_LEFT,
    )

    story = []

    # 0. TOP ACCENT BAR
    story.append(TopAccentBar(usable_w, height=4, color=c_blue))
    story.append(Spacer(1, 2))

    # ==========================================
    # 1. HEADER (PERSIS REFERENSI)
    # ==========================================
    story.append(Paragraph("Dimas Wijanarko", name_style))
    story.append(Paragraph("FULL STACK WEB & MOBILE DEVELOPER &nbsp;|&nbsp; DATA ANALYTICS &nbsp;|&nbsp; S1 SISTEM INFORMASI", tagline_style))
    
    contact_txt = (
        "Jakarta Pusat &nbsp;|&nbsp; "
        "dmswijanarko@gmail.com &nbsp;|&nbsp; "
        "<a href='https://dimaswijanarko.me' color='#0f172a'><u>dimaswijanarko.me</u></a> &nbsp;|&nbsp; "
        "<a href='https://linkedin.com/in/dmswijanarko' color='#0f172a'><u>linkedin.com/in/dmswijanarko</u></a> &nbsp;|&nbsp; "
        "<a href='https://github.com/Dimss-W' color='#0f172a'><u>github.com/Dimss-W</u></a>"
    )
    story.append(Paragraph(contact_txt, contact_style))
    story.append(DoubleHR(usable_w, color=c_black, space_before=1, space_after=4))
    story.append(Spacer(1, 3))

    # ==========================================
    # 2. RINGKASAN PERSONAL (PROFESSIONAL SUMMARY)
    # ==========================================
    story.append(SectionDivider("Ringkasan Personal", usable_w, font_size=9.2))
    story.append(Spacer(1, 2.5))
    
    summary_text = (
        "<b>Mahasiswa S1 Sistem Informasi UBSI</b> dengan konsentrasi rekayasa perangkat lunak <b>Web & Mobile</b> serta analisis data. "
        "Berpengalaman industri di <b>PT PGAS Telekomunikasi Nusantara (PGNCOM)</b> mengembangkan sistem monitoring biaya dan dashboard analitik Power BI. "
        "Menguasai framework <b>Laravel</b>, <b>Flutter & Dart</b>, basis data <b>MySQL</b> tersertifikasi <b>Database Administrator BNSP</b>, "
        "serta aktif memimpin organisasi kepemudaan <b>PRISMA</b>. Berorientasi pada solusi teknologi yang efisien, skalabel, dan berdampak nyata."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 3.5))

    # ==========================================
    # 3. PENGALAMAN KERJA & MENGAJAR (CAREER JOURNEY)
    # ==========================================
    story.append(SectionDivider("Pengalaman Kerja & Mengajar", usable_w, font_size=9.2))
    story.append(Spacer(1, 2.5))

    # Job 1: PGNCOM
    job1_t = Table([
        [Paragraph("Web Developer & Data Analytics Intern <font color='#1e3a8a'><i>PT PGAS Telekomunikasi Nusantara (PGNCOM)</i></font>", item_title_style),
         Paragraph("Agustus 2026 – November 2026", item_date_style)]
    ], colWidths=[usable_w - 140, 140])
    job1_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(job1_t)
    story.append(Paragraph("• <b>Mengembangkan sistem web internal</b> <i>Monitoring Realisasi Biaya & QC BASTO</i> berbasis Laravel & MySQL untuk otomatisasi validasi berkas operasional.", bullet_style))
    story.append(Paragraph("• <b>Merancang dashboard interaktif Microsoft Power BI</b> dengan pemodelan data relasional dan kalkulasi formula DAX untuk memonitor deviasi biaya secara real-time.", bullet_style))
    story.append(Paragraph("• <b>Mengimplementasikan manajemen hak akses berjenjang (RBAC)</b> dan audit log transaksi untuk menjaga keamanan data operasional.", bullet_style))
    story.append(Spacer(1, 3.0))

    # Job 2: SMK Muhammadiyah 15
    job2_t = Table([
        [Paragraph("Pengajar Tamu & Instruktur Rekayasa Perangkat Lunak <font color='#1e3a8a'><i>SMK Muhammadiyah 15 Jakarta</i></font>", item_title_style),
         Paragraph("2025", item_date_style)]
    ], colWidths=[usable_w - 140, 140])
    job2_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(job2_t)
    story.append(Paragraph("• <b>Menjadi instruktur kurikulum RPL</b>: materi framework Laravel, struktur arsitektur MVC, dan administrasi database MySQL.", bullet_style))
    story.append(Paragraph("• <b>Membimbing praktikum pemrograman</b>: penerapan clean code, debugging, serta simulasi version control Git & GitHub berstandar industri.", bullet_style))
    story.append(Spacer(1, 3.0))

    # Job 3: Freelance
    job3_t = Table([
        [Paragraph("Pengembang Perangkat Lunak Web & Mobile (Full Stack) <font color='#1e3a8a'><i>Proyek Independen & Klien</i></font>", item_title_style),
         Paragraph("2023 – Sekarang", item_date_style)]
    ], colWidths=[usable_w - 140, 140])
    job3_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(job3_t)
    story.append(Paragraph("• <b>Merancang dan membangun aplikasi mobile</b> (Flutter & Dart) dan web responsif berskala produksi terintegrasi RESTful API terstruktur.", bullet_style))
    story.append(Spacer(1, 3.5))

    # ==========================================
    # 4. PENGALAMAN ORGANISASI
    # ==========================================
    story.append(SectionDivider("Pengalaman Organisasi", usable_w, font_size=9.2))
    story.append(Spacer(1, 2.5))

    org_t = Table([
        [Paragraph("Ketua Umum <font color='#1e3a8a'><i>Pengurus Remaja Islam Masjid (PRISMA)</i></font>", item_title_style),
         Paragraph("2023 – Sekarang (Aktif)", item_date_style)]
    ], colWidths=[usable_w - 140, 140])
    org_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(org_t)
    story.append(Paragraph("• <b>Memimpin arah strategis organisasi</b>, mengoordinasikan jajaran divisi kepengurusan, menyusun program kerja tahunan, serta transparansi kas.", bullet_style))
    story.append(Paragraph("• <b>Menginisiasi program sosial kemanusiaan rutin</b>: layanan pemeriksaan kesehatan gratis, santunan yatim dhuafa, dan tabligh akbar pemuda.", bullet_style))
    story.append(Spacer(1, 3.5))

    # ==========================================
    # 5. PENDIDIKAN FORMAL (ACADEMIC JOURNEY)
    # ==========================================
    story.append(SectionDivider("Pendidikan Formal", usable_w, font_size=9.2))
    story.append(Spacer(1, 2.5))

    edu1_t = Table([
        [Paragraph("Universitas Bina Sarana Informatika (UBSI) <font color='#1e3a8a'><i>S1 Sistem Informasi</i></font>", item_title_style),
         Paragraph("Sep 2023 – Sekarang (Aktif)", item_date_style)]
    ], colWidths=[usable_w - 140, 140])
    edu1_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(edu1_t)
    story.append(Paragraph("• Mata Kuliah Relevan: Pemrograman Web (Laravel), Mobile (Flutter & Dart), Rekayasa Perangkat Lunak, Basis Data Relasional & SQL.", bullet_style))

    edu2_t = Table([
        [Paragraph("SMK Negeri 31 Jakarta <font color='#1e3a8a'><i>Kompetensi Keahlian Animasi</i></font>", item_title_style),
         Paragraph("Juli 2019 – Juli 2022", item_date_style)]
    ], colWidths=[usable_w - 140, 140])
    edu2_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(edu2_t)
    story.append(Paragraph("• Fokus Keahlian: Desain antarmuka pengguna (UI/UX), grafis visual digital, animasi komputer, dan komposisi aset multimedia.", bullet_style))
    story.append(Spacer(1, 3.5))

    # ==========================================
    # 6. SERTIFIKASI & PENGHARGAAN
    # ==========================================
    story.append(SectionDivider("Sertifikasi Kompetensi & Penghargaan", usable_w, font_size=9.2))
    story.append(Spacer(1, 2.5))

    cert1_t = Table([
        [Paragraph("Sertifikat Kompetensi Database Administrator (DBA) <font color='#1e3a8a'><i>BNSP & LSP UBSI</i></font>", item_title_style),
         Paragraph("Mar 2026 – 2029", item_date_style)],
    ], colWidths=[usable_w - 140, 140])
    cert1_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(cert1_t)
    story.append(Paragraph("• Kompeten nasional: perancangan basis data relasional, penulisan kueri SQL lanjutan, optimasi indeks, dan integritas data.", bullet_style))

    cert2_t = Table([
        [Paragraph("Sertifikasi Kompetensi Analis Program (Program Analyst) <font color='#1e3a8a'><i>BNSP & LSP UBSI</i></font>", item_title_style),
         Paragraph("Ags 2026 – 2029", item_date_style)],
    ], colWidths=[usable_w - 140, 140])
    cert2_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(cert2_t)
    story.append(Paragraph("• Lulus asesmen 10 unit kompetensi SKKNI: spesifikasi perangkat lunak, algoritma, debugging, profiling, dan software testing.", bullet_style))

    cert3_t = Table([
        [Paragraph("Juara 1 IT Bootcamp Software Development <font color='#1e3a8a'><i>FTI & Rektorat UBSI</i></font>", item_title_style),
         Paragraph("2025", item_date_style)],
    ], colWidths=[usable_w - 140, 140])
    cert3_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(cert3_t)
    story.append(Paragraph("• Juara 1 nasional se-UBSI melalui platform Smart Tahfidz School (e-Sn: 19230181).", bullet_style))
    story.append(Spacer(1, 3.5))

    # ==========================================
    # 7. CORE SKILLS (TABEL DENGAN BADGE PERSIS GAMBAR CONTOH)
    # ==========================================
    story.append(SectionDivider("Core Skills", usable_w, font_size=9.2))
    story.append(Spacer(1, 2.5))

    skills_table_data = [
        [
            Paragraph("Hard Skills", skill_badge_style),
            Paragraph("Software Development • Web Development (PHP, Laravel, React.js, Next.js, Tailwind CSS) • Mobile Development (Dart, Flutter) • Database Management (MySQL, PostgreSQL, SQL Optimization) • Data Analytics (Microsoft Power BI, DAX) • RESTful API", skill_content_style)
        ],
        [
            Paragraph("Tools", skill_badge_style),
            Paragraph("Git • GitHub • Visual Studio Code • Microsoft Power BI Desktop", skill_content_style)
        ],
        [
            Paragraph("Soft Skills", skill_badge_style),
            Paragraph("Kerja Sama Tim (Teamwork) • Komunikasi Efektif • Problem Solving & Analitis • Kepemimpinan Organisasi • Manajemen Waktu • Adaptabilitas Cepat", skill_content_style)
        ],
        [
            Paragraph("Bahasa", skill_badge_style),
            Paragraph("Bahasa Indonesia (Penutur Asli / Native) • Bahasa Inggris (Tingkat Menengah / Intermediate)", skill_content_style)
        ]
    ]

    badge_w = 75
    skills_t = Table(skills_table_data, colWidths=[badge_w, usable_w - badge_w])
    skills_t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('PADDING', (0,0), (-1,-1), 2.5),
        ('BACKGROUND', (0,0), (0,-1), c_badge_bg),
        ('BOX', (0,0), (0,-1), 0.5, c_badge_border),
        ('LINEBELOW', (0,0), (-1,-2), 0.4, colors.HexColor("#f1f5f9")),
        ('LEFTPADDING', (1,0), (1,-1), 8),
    ]))
    story.append(skills_t)

    doc.build(story)
    print(f"Times New Roman 1-Page Reference Style CV generated at: {output_path}")

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
