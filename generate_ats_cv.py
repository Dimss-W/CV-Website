import os
import shutil
import pymupdf
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Flowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT, TA_RIGHT

c_black = colors.HexColor("#000000")
c_line = colors.HexColor("#000000")
c_table_border = colors.HexColor("#000000")
c_badge_bg = colors.HexColor("#f8fafc")

class SectionDivider(Flowable):
    def __init__(self, title, width, font_name="Times-Bold", font_size=9.2, text_color=c_black, line_color=c_line):
        Flowable.__init__(self)
        self.title = title
        self.width = width
        self.font_name = font_name
        self.font_size = font_size
        self.text_color = text_color
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
        canv.setFillColor(self.text_color)
        canv.rect(center_start, y, sq_size, sq_size, fill=1, stroke=0)
        
        # Text
        canv.drawString(center_start + sq_size + (spacing * 2), y - 0.5, title_str)
        
        # Right square
        canv.rect(center_end - sq_size, y, sq_size, sq_size, fill=1, stroke=0)
        
        canv.restoreState()

class DoubleHR(Flowable):
    def __init__(self, width, color=colors.HexColor("#000000"), space_before=2, space_after=4):
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
        canv.setLineWidth(0.5)
        canv.line(0, self.space_after + 2.5, self.width, self.space_after + 2.5)
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
        textColor=c_black,
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
        fontName='Times-Roman',
        fontSize=9.0,
        leading=12.0,
        textColor=c_black,
        alignment=TA_LEFT,
    )

    item_date_style = ParagraphStyle(
        'ItemDate',
        parent=styles['Normal'],
        fontName='Times-Italic',
        fontSize=8.5,
        leading=12.0,
        textColor=c_black,
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
        spaceAfter=2.0,
    )

    bullet_style = ParagraphStyle(
        'DocBullet',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.4,
        leading=11.4,
        textColor=c_black,
        alignment=TA_JUSTIFY,
        leftIndent=10,
        firstLineIndent=-7,
        spaceAfter=1.6,
    )

    skill_badge_style = ParagraphStyle(
        'SkillBadge',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=8.4,
        leading=11.0,
        textColor=c_black,
        alignment=TA_CENTER,
    )

    skill_content_style = ParagraphStyle(
        'SkillContent',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.2,
        leading=11.2,
        textColor=c_black,
        alignment=TA_LEFT,
    )

    story = []

    # ==========================================
    # 1. HEADER (HITAM PEKAT, JAKARTA PUSAT, DKI JAKARTA)
    # ==========================================
    story.append(Paragraph("Dimas Wijanarko", name_style))
    story.append(Paragraph("FULL STACK WEB & MOBILE DEVELOPER &nbsp;|&nbsp; DATA ANALYTICS &nbsp;|&nbsp; S1 SISTEM INFORMASI", tagline_style))
    
    contact_txt = (
        "Jakarta Pusat, DKI Jakarta &nbsp;|&nbsp; "
        "dmswijanarko@gmail.com &nbsp;|&nbsp; "
        "<a href='https://dimaswijanarko.me' color='#000000'><u>dimaswijanarko.me</u></a> &nbsp;|&nbsp; "
        "<a href='https://linkedin.com/in/dmswijanarko' color='#000000'><u>linkedin.com/in/dmswijanarko</u></a> &nbsp;|&nbsp; "
        "<a href='https://github.com/Dimss-W' color='#000000'><u>github.com/Dimss-W</u></a>"
    )
    story.append(Paragraph(contact_txt, contact_style))
    story.append(DoubleHR(usable_w, color=c_black, space_before=1, space_after=4))
    story.append(Spacer(1, 3))

    # ==========================================
    # 2. RINGKASAN PERSONAL (ALAMI, RAPI, TANPA BANYAK BOLD)
    # ==========================================
    story.append(SectionDivider("Ringkasan Personal", usable_w, font_size=9.2))
    story.append(Spacer(1, 2.5))
    
    summary_text = (
        "Mahasiswa S1 Sistem Informasi Universitas Bina Sarana Informatika (UBSI) dengan konsentrasi rekayasa perangkat lunak Web & Mobile serta analisis data. "
        "Memiliki pengalaman kerja industri di PT PGAS Telekomunikasi Nusantara (PGNCOM) dalam merancang sistem monitoring biaya dan dashboard analitik Power BI. "
        "Terbiasa membangun aplikasi menggunakan Laravel, Flutter, dan manajemen database MySQL tersertifikasi Database Administrator BNSP, "
        "serta aktif memimpin organisasi kepemudaan PRISMA. Berorientasi pada solusi teknologi yang efisien, terstruktur, dan bernilai guna nyata."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 3.5))

    # ==========================================
    # 3. PENGALAMAN KERJA & MENGAJAR
    # ==========================================
    story.append(SectionDivider("Pengalaman Kerja & Mengajar", usable_w, font_size=9.2))
    story.append(Spacer(1, 2.5))

    # Job 1: PGNCOM
    job1_t = Table([
        [Paragraph("<b>Web Developer & Data Analytics Intern</b> – <i>PT PGAS Telekomunikasi Nusantara (PGNCOM)</i>", item_title_style),
         Paragraph("Agustus 2026 – November 2026", item_date_style)]
    ], colWidths=[usable_w - 140, 140])
    job1_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(job1_t)
    story.append(Paragraph("• Mengembangkan sistem web internal Monitoring Realisasi Biaya & QC BASTO berbasis Laravel & MySQL untuk otomatisasi validasi berkas operasional.", bullet_style))
    story.append(Paragraph("• Merancang dashboard interaktif Microsoft Power BI dengan pemodelan data relasional dan kalkulasi formula DAX untuk memonitor deviasi biaya proyek.", bullet_style))
    story.append(Paragraph("• Mengimplementasikan manajemen hak akses berjenjang (RBAC) dan audit log transaksi untuk menjaga keamanan serta integritas data operasional.", bullet_style))
    story.append(Spacer(1, 3.0))

    # Job 2: SMK Muhammadiyah 15
    job2_t = Table([
        [Paragraph("<b>Pengajar Tamu & Instruktur Rekayasa Perangkat Lunak</b> – <i>SMK Muhammadiyah 15 Jakarta</i>", item_title_style),
         Paragraph("2025", item_date_style)]
    ], colWidths=[usable_w - 140, 140])
    job2_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(job2_t)
    story.append(Paragraph("• Menjadi instruktur kurikulum RPL: menyampaikan materi dasar framework Laravel, struktur arsitektur MVC, dan administrasi database MySQL.", bullet_style))
    story.append(Paragraph("• Membimbing praktikum laboratorium komputer: penerapan clean code, teknik debugging, serta simulasi version control Git & GitHub berstandar industri.", bullet_style))
    story.append(Spacer(1, 3.0))

    # Job 3: Freelance
    job3_t = Table([
        [Paragraph("<b>Pengembang Perangkat Lunak Web & Mobile (Full Stack)</b> – <i>Proyek Independen & Klien</i>", item_title_style),
         Paragraph("2023 – Sekarang", item_date_style)]
    ], colWidths=[usable_w - 140, 140])
    job3_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(job3_t)
    story.append(Paragraph("• Merancang dan membangun aplikasi mobile lintas platform (Flutter & Dart) serta sistem web responsif terintegrasi dengan RESTful API terstruktur.", bullet_style))
    story.append(Spacer(1, 3.5))

    # ==========================================
    # 4. PENGALAMAN ORGANISASI
    # ==========================================
    story.append(SectionDivider("Pengalaman Organisasi", usable_w, font_size=9.2))
    story.append(Spacer(1, 2.5))

    org_t = Table([
        [Paragraph("<b>Ketua Umum</b> – <i>Pengurus Remaja Islam Masjid (PRISMA)</i>", item_title_style),
         Paragraph("2023 – Sekarang (Aktif)", item_date_style)]
    ], colWidths=[usable_w - 140, 140])
    org_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(org_t)
    story.append(Paragraph("• Memimpin arah strategis organisasi kepemudaan, mengoordinasikan jajaran divisi kepengurusan, menyusun program kerja tahunan, serta akuntabilitas kas.", bullet_style))
    story.append(Paragraph("• Menginisiasi program sosial kemanusiaan rutin: layanan pemeriksaan kesehatan gratis, santunan yatim dhuafa, dan tabligh akbar kepemudaan.", bullet_style))
    story.append(Spacer(1, 3.5))

    # ==========================================
    # 5. PENDIDIKAN FORMAL (DENGAN IPK 3.82)
    # ==========================================
    story.append(SectionDivider("Pendidikan Formal", usable_w, font_size=9.2))
    story.append(Spacer(1, 2.5))

    edu1_t = Table([
        [Paragraph("<b>Universitas Bina Sarana Informatika (UBSI)</b> – <i>S1 Sistem Informasi</i>", item_title_style),
         Paragraph("Sep 2023 – Sekarang (Aktif)", item_date_style)]
    ], colWidths=[usable_w - 140, 140])
    edu1_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(edu1_t)
    story.append(Paragraph("• IPK: 3.82 / 4.00", bullet_style))
    story.append(Paragraph("• Mata Kuliah Relevan: Pemrograman Web (Laravel), Pemrograman Mobile (Flutter & Dart), Rekayasa Perangkat Lunak, Basis Data Relasional & SQL.", bullet_style))
    story.append(Spacer(1, 1.5))

    edu2_t = Table([
        [Paragraph("<b>SMK Negeri 31 Jakarta</b> – <i>Kompetensi Keahlian Animasi</i>", item_title_style),
         Paragraph("Juli 2019 – Juli 2022", item_date_style)]
    ], colWidths=[usable_w - 140, 140])
    edu2_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(edu2_t)
    story.append(Paragraph("• Fokus Keahlian: Desain antarmuka pengguna (UI/UX), permodelan grafis digital, animasi komputer, dan komposisi aset multimedia.", bullet_style))
    story.append(Spacer(1, 3.5))

    # ==========================================
    # 6. SERTIFIKASI KOMPETENSI & PENGHARGAAN
    # ==========================================
    story.append(SectionDivider("Sertifikasi Kompetensi & Penghargaan", usable_w, font_size=9.2))
    story.append(Spacer(1, 2.5))

    cert1_t = Table([
        [Paragraph("<b>Sertifikat Kompetensi Database Administrator (DBA)</b> – <i>BNSP & LSP UBSI</i>", item_title_style),
         Paragraph("Mar 2026 – 2029", item_date_style)],
    ], colWidths=[usable_w - 140, 140])
    cert1_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(cert1_t)
    story.append(Paragraph("• Kompeten nasional: perancangan basis data relasional, penulisan kueri SQL lanjutan, optimasi indeks, dan integritas data.", bullet_style))

    cert2_t = Table([
        [Paragraph("<b>Sertifikasi Kompetensi Analis Program (Program Analyst)</b> – <i>BNSP & LSP UBSI</i>", item_title_style),
         Paragraph("Ags 2026 – 2029", item_date_style)],
    ], colWidths=[usable_w - 140, 140])
    cert2_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(cert2_t)
    story.append(Paragraph("• Lulus asesmen 10 unit kompetensi SKKNI: spesifikasi perangkat lunak, algoritma, debugging, profiling, dan software testing.", bullet_style))

    cert3_t = Table([
        [Paragraph("<b>Juara 1 IT Bootcamp Software Development</b> – <i>FTI & Rektorat UBSI</i>", item_title_style),
         Paragraph("2025", item_date_style)],
    ], colWidths=[usable_w - 140, 140])
    cert3_t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(cert3_t)
    story.append(Paragraph("• Juara 1 tingkat nasional se-UBSI melalui platform Smart Tahfidz School (e-Sn: 19230181).", bullet_style))
    story.append(Spacer(1, 3.5))

    # ==========================================
    # 7. CORE SKILLS (SEMUA HITAM & RAPI)
    # ==========================================
    story.append(SectionDivider("Core Skills", usable_w, font_size=9.2))
    story.append(Spacer(1, 2.5))

    skills_table_data = [
        [
            Paragraph("Hard Skills", skill_badge_style),
            Paragraph("Software Development • Web Development (PHP, Laravel, React.js, Next.js, Tailwind CSS) • Mobile Development (Dart, Flutter) • Database Management (MySQL, PostgreSQL, Optimasi SQL) • Data Analytics (Microsoft Power BI, DAX) • RESTful API", skill_content_style)
        ],
        [
            Paragraph("Tools", skill_badge_style),
            Paragraph("Git • GitHub • Visual Studio Code • Microsoft Power BI Desktop", skill_content_style)
        ],
        [
            Paragraph("Soft Skills", skill_badge_style),
            Paragraph("Kerja Sama Tim (Teamwork) • Komunikasi Efektif • Problem Solving & Analitis • Kepemimpinan Organisasi • Manajemen Waktu • Kemampuan Beradaptasi", skill_content_style)
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
        ('BOX', (0,0), (-1,-1), 0.5, c_table_border),
        ('INNERGRID', (0,0), (-1,-1), 0.4, colors.HexColor("#e2e8f0")),
        ('LEFTPADDING', (1,0), (1,-1), 8),
    ]))
    story.append(skills_t)

    doc.build(story)
    print(f"Times New Roman 1-Page All-Black ATS CV generated at: {output_path}")

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
