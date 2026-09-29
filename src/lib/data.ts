import { supabase } from './supabaseClient';
import { Profile, Experience, Project, Skill, Education, Certificate, ContactMessage } from '@/types';

// Default mock data jika tabel di Supabase belum terisi data lengkap
export const defaultProfile: Profile = {
  full_name: 'Dimas Wijanarko',
  title: 'Full Stack Web & Mobile Software Engineer',
  bio: 'Mahasiswa Sistem Informasi Universitas Bina Sarana Informatika (2023 - Sekarang) yang berdedikasi membangun solusi digital Web & Mobile berkualitas tinggi. Berpengalaman merancang aplikasi mobile dengan Flutter & Dart terintegrasi backend Laravel, serta membangun website analitik enterprise terintegrasi Microsoft Power BI.',
  email: 'dmswijanarko@gmail.com',
  phone: '085794770824',
  location: 'Jakarta, Indonesia',
  avatar_url: '/dimas-profile.jpg',
  resume_url: '#contact',
  github_url: 'https://github.com/Dimss-W',
  linkedin_url: 'https://linkedin.com/in/dimas-wijanarko',
  instagram_url: 'https://instagram.com/dimsswijanark_',
};

export const defaultExperiences: Experience[] = [
  {
    role: 'Full Stack & Mobile Software Engineer',
    company: 'Independent & Client Projects',
    location: 'Jakarta, Indonesia',
    start_date: '2023',
    end_date: 'Present',
    is_current: true,
    description: 'Merancang, membangun, dan mendeploy berbagai produk digital produksi nyata: Otokeep (Smart Vehicle Maintenance dengan integrasi Gemini Vision AI), FindIt (Sistem Informasi Lost & Found terpadu untuk 27 kampus UBSI se-Indonesia), CalTrack (Aplikasi mobile kesehatan & kalkulasi BMI berbasis Flutter & Laravel API), serta Kastrix (SaaS POS & manajemen multi-outlet). Mengimplementasikan arsitektur bersih, RESTful API terstruktur, autentikasi aman, dan antarmuka responsif.',
    technologies: ['Flutter', 'Dart', 'Laravel', 'PHP', 'React', 'Tailwind CSS', 'MySQL', 'Gemini Vision AI', 'REST API'],
    display_order: 1,
  },
  {
    role: 'Web Developer & Data Analytics Intern',
    company: 'PT PGAS Telekomunikasi Nusantara (PGNCOM)',
    location: 'Jakarta, Indonesia',
    start_date: '2023',
    end_date: '2024',
    is_current: false,
    description: 'Mengembangkan sistem web operasional enterprise "Monitoring Realisasi Biaya & Quality Control" untuk pemantauan realisasi anggaran proyek, pengesahan dokumen BASTO, verifikasi mutu QC teknis, dan administrasi invoicing. Merancang dan mengintegrasikan dashboard analitik Microsoft Power BI interaktif untuk monitoring 84 kontrak proyek senilai Rp309 Miliar, evaluasi rasio realisasi vs prognosa, dan tracking status transaksi vendor secara real-time.',
    technologies: ['Microsoft Power BI', 'DAX', 'Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'REST API', 'Enterprise Governance'],
    display_order: 2,
  },
  {
    role: 'Pengajar & Mentor Rekayasa Perangkat Lunak (RPL)',
    company: 'SMK Muhammadiyah 15 Jakarta',
    location: 'Jakarta Selatan, Indonesia',
    start_date: '2025',
    end_date: '2025',
    is_current: false,
    description: 'Menjadi pengajar tamu dan instruktur teknis bagi para siswa jurusan Rekayasa Perangkat Lunak (RPL) di SMK Muhammadiyah 15 Jakarta. Membawakan kurikulum pengembangan web modern dengan pengenalan Framework Laravel, struktur MVC, database relasional MySQL, praktik clean code, serta simulasi alur kerja kolaborasi Git developer standar industri.',
    technologies: ['Laravel Framework', 'PHP & MVC Pattern', 'MySQL Database', 'Git & GitHub', 'Technical Mentoring', 'Public Speaking'],
    images: [
      '/documentation/smk-muhammadiyah-pengajar-1.jpg',
      '/documentation/smk-muhammadiyah-pengajar-2.jpg',
      '/documentation/smk-muhammadiyah-pengajar-3.jpg',
    ],
    captions: [
      'Foto Bersama Siswa Kelas Rekayasa Perangkat Lunak (RPL) SMK Muhammadiyah 15 Jakarta',
      'Sesi Pembelajaran Langsung: Pengenalan Framework Laravel & Arsitektur Web MVC',
      'Pendampingan Praktik Coding & Eksplorasi Proyek di Lab Komputer RPL',
    ],
    display_order: 3,
  },
];

export const defaultProjects: Project[] = [
  {
    title: 'Otokeep - Smart Vehicle Maintenance & AI Tracker',
    description: 'Platform cerdas pemantauan servis kendaraan & manajemen armada dengan integrasi AI Speedometer Scanner (Gemini Vision), pengingat servis otomatis, monitoring pajak & STNK berkala, serta log perawatan real-time.',
    tags: ['Laravel', 'Tailwind CSS', 'MySQL', 'Gemini Vision AI', 'REST API'],
    demo_url: 'https://github.com/Dimss-W/Otokeep',
    github_url: 'https://github.com/Dimss-W/Otokeep.git',
    image_url: '/projects/otokeep-landing.png',
    images: [
      '/projects/otokeep-landing.png',
      '/projects/otokeep-dashboard.png',
    ],
    captions: [
      'Landing Page Otokeep • Smart Vehicle Tracker',
      'Dashboard Armada • AI Speedometer Scanner & Real-time Odometer',
    ],
    featured: true,
    display_order: 1,
  },
  {
    title: 'FindIt - Sistem Terpadu Lost & Found UBSI',
    description: 'Sistem informasi pengelolaan barang hilang & ditemukan terpadu untuk 27 kampus Universitas Bina Sarana Informatika se-Indonesia, dilengkapi alur verifikasi temuan, brankas loker, validasi klaim, dan dashboard master admin.',
    tags: ['Laravel', 'Blade', 'MySQL', 'Multi-Campus', 'REST API'],
    demo_url: 'https://github.com/Dimss-W/FindIt',
    github_url: 'https://github.com/Dimss-W/FindIt.git',
    image_url: '/projects/findit-landing.png',
    images: [
      '/projects/findit-landing.png',
      '/projects/findit-dashboard.png',
    ],
    captions: [
      'Landing Page FindIt • Layanan 27 Kampus UBSI Indonesia',
      'Dashboard Administrator FINDIT • Master Control Panel Multi-Kampus',
    ],
    featured: true,
    display_order: 2,
  },
  {
    title: 'Enterprise Monitoring & Power BI Dashboard',
    description: 'Sistem manajemen enterprise terintegrasi untuk pemantauan realisasi anggaran proyek, pengesahan dokumen BASTO, verifikasi mutu QC teknis, dan administrasi invoicing PT PGAS Telekomunikasi Nusantara (PGNCOM) dengan visualisasi analitik Microsoft Power BI interaktif.',
    tags: ['Power BI', 'Laravel', 'Blade', 'MySQL', 'Enterprise'],
    demo_url: 'https://github.com/Dimss-W/Sistem-Input-Realisasi',
    github_url: 'https://github.com/Dimss-W/Sistem-Input-Realisasi.git',
    image_url: '/projects/pgncom-login.png',
    images: [
      '/projects/pgncom-login.png',
      '/projects/pgncom-dashboard.png',
      '/projects/powerbi-dashboard.png',
    ],
    captions: [
      'Portal Operasional PGNCOM • Realisasi Biaya & QC Control',
      'Dashboard Administrator • Manajemen Distribusi Akun & Audit Log',
      'Dashboard Monitoring Power BI • Analitik Kontrak & Realisasi Anggaran',
    ],
    featured: true,
    display_order: 3,
  },
  {
    title: 'CalTrack - Health & Nutrition Mobile App',
    description: 'Aplikasi mobile kesehatan cerdas berbasis Flutter & Dart dengan arsitektur backend RESTful API Laravel & MySQL. Menyediakan fitur kalkulasi IMT/BMI real-time, rekomendasi nutrisi & olahraga personal, konsultasi dokter, manajemen langganan, dan dashboard admin terpusat.',
    tags: ['Flutter', 'Dart', 'Mobile', 'Laravel', 'REST API', 'MySQL'],
    demo_url: 'https://github.com/Dimss-W',
    github_url: 'https://github.com/Dimss-W',
    image_url: '/projects/caltrack-login.png',
    images: [
      '/projects/caltrack-login.png',
      '/projects/caltrack-admin.png',
      '/projects/caltrack-user.png',
    ],
    captions: [
      'Halaman Login • Track Your Health Journey',
      'Halaman Admin • Dashboard Manajemen CalTrack',
      'Halaman User • Beranda & Kalkulator IMT/BMI',
    ],
    is_mobile: true,
    featured: true,
    display_order: 4,
  },
  {
    title: 'Kastrix - Smart Point of Sale & Multi-Outlet System',
    description: 'Platform SaaS Point of Sale (POS) & manajemen inventaris cerdas untuk otomasi kasir, pengelolaan menu gerai, verifikasi akun mitra owner, dan visualisasi laporan omzet real-time dengan role Super Admin & Kasir.',
    tags: ['Laravel', 'React', 'Tailwind CSS', 'MySQL', 'POS System', 'REST API'],
    demo_url: 'https://github.com/Dimss-W',
    github_url: 'https://github.com/Dimss-W',
    image_url: '/projects/kastrix-landing.png',
    images: [
      '/projects/kastrix-landing.png',
      '/projects/kastrix-dashboard.png',
    ],
    captions: [
      'Landing Page Kastrix • Solusi Cerdas Kelola Kasir & Omzet',
      'Dashboard Administrator • Super Admin Panel & Kelola Mitra',
    ],
    featured: true,
    display_order: 5,
  },
  {
    title: 'Personal CV & Portfolio Website',
    description: 'Website portofolio dan CV personal modern bereputasi tinggi berbasis Next.js 13, React, Tailwind CSS, dan BaaS Supabase terinspirasi desain modern Bedimcode Bianca.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Supabase', 'TypeScript'],
    demo_url: 'https://github.com/Dimss-W/CV-Website',
    github_url: 'https://github.com/Dimss-W/CV-Website.git',
    image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    featured: false,
    display_order: 6,
  },
];

export const defaultSkills: Skill[] = [
  { name: 'Flutter & Dart (Mobile App)', category: 'Frontend', level: 95 },
  { name: 'Laravel Blade & UI Components', category: 'Frontend', level: 94 },
  { name: 'React.js & Tailwind CSS', category: 'Frontend', level: 92 },
  { name: 'Responsive UI & UX Architecture', category: 'Frontend', level: 91 },
  { name: 'Laravel & PHP (Enterprise MVC)', category: 'Backend', level: 95 },
  { name: 'RESTful API Architecture & JWT', category: 'Backend', level: 93 },
  { name: 'Role-Based Access Control (RBAC)', category: 'Backend', level: 92 },
  { name: 'Gemini Vision AI (OCR Integration)', category: 'Backend', level: 90 },
  { name: 'Microsoft Power BI & DAX Reporting', category: 'Database & Cloud', level: 94 },
  { name: 'MySQL & Relational Data Modeling', category: 'Database & Cloud', level: 93 },
  { name: 'SQL Query Optimization', category: 'Database & Cloud', level: 91 },
  { name: 'PostgreSQL & Supabase Cloud', category: 'Database & Cloud', level: 89 },
  { name: 'Git & GitHub Team Workflow', category: 'Tools & DevOps', level: 93 },
  { name: 'System Analysis & Business Logic', category: 'Tools & DevOps', level: 92 },
  { name: 'Vercel & Web Server Deployment', category: 'Tools & DevOps', level: 90 },
  { name: 'Technical Mentoring & Public Speaking', category: 'Tools & DevOps', level: 92 },
];

export const defaultCertificates: Certificate[] = [
  {
    id: 'serkom-database-administrator',
    title: 'Sertifikat Kompetensi Database Administrator',
    subtitle: 'Certificate of Competence in Data Management',
    issuer: 'Badan Nasional Sertifikasi Profesi (BNSP) & LSP Universitas Bina Sarana Informatika',
    credential_id: 'No. 63120 2521 6 0000936 2026',
    reg_number: 'No. Reg. DMS.1241.00936 2026',
    issue_date: '06 Maret 2026',
    valid_until: '06 Maret 2029 (Berlaku 3 Tahun)',
    field: 'Data Management - Database Administrator',
    category: 'Certification',
    badge: 'BNSP & LSP RI Certified',
    images: [
      {
        title: 'Halaman 1: Sertifikat Kompetensi Resmi BNSP',
        url: '/certificates/serkom-database-administrator.png',
      },
      {
        title: 'Halaman 2: Daftar 7 Unit Kompetensi Standar Nasional (SKKNI)',
        url: '/certificates/serkom-database-administrator-units.png',
      },
    ],
    pdf_url: '/certificates/sertifikat-bnsp-database-administrator.pdf',
    description: 'Dinyatakan KOMPETEN secara nasional oleh Badan Nasional Sertifikasi Profesi (BNSP) dan Lembaga Sertifikasi Profesi (LSP) UBSI pada skema Database Administrator. Menguasai arsitektur basis data, integrasi data, optimalisasi query SQL, pemeliharaan kualitas data, serta tata kelola keamanan dan hak akses database.',
    skills: [
      'SQL Query Optimization',
      'Database Design & ERD Modeling',
      'Data Integration & Migration',
      'Data Quality & Consistency',
      'Database Security & Access Control',
      'Document & Content Management',
    ],
    competency_units: [
      { code: 'J.62DMS00.006.1', title: 'Mendesain basis data (Designing databases)' },
      { code: 'J.62DMS00.010.1', title: 'Membuat basis data (Creating databases)' },
      { code: 'J.62DMS00.011.1', title: 'Membuat integrasi data (Creating data integrations)' },
      { code: 'J.62DMS00.012.1', title: 'Mengelola kualitas data (Managing data quality)' },
      { code: 'J.62DMS00.016.1', title: 'Mengelola dokumen dan konten (Managing documents and content)' },
      { code: 'J.620100.020.02', title: 'Menggunakan SQL (Using SQL)' },
      { code: 'J.620100.021.02', title: 'Menerapkan akses basis data (Implementing database access)' },
    ],
  },
  {
    id: 'juara-1-it-bootcamp',
    title: 'Juara 1 IT Bootcamp Software Development (Seluruh Kampus UBSI)',
    subtitle: 'Pengembangan Website Madrasah Aliyah Smart Tahfidz School',
    issuer: 'Fakultas Teknik & Informatika (FTI) Universitas Bina Sarana Informatika',
    credential_id: 'e-Sn : 19230181',
    reg_number: 'Penghargaan Rektor UBSI',
    issue_date: '02 Juli 2025',
    field: 'Software Engineering & Full Stack Web Development',
    category: 'Award',
    badge: 'Juara 1 Se-Kampus UBSI',
    images: [
      {
        title: 'Sertifikat Apresiasi & Penghargaan Juara 1 Rektor UBSI',
        url: '/certificates/juara1-it-bootcamp.png',
      },
      {
        title: 'Penyerahan Piala Juara 1 Bersama Pimpinan / Rektorat UBSI',
        url: '/documentation/juara-1-bootcamp-penyerahan-piala.jpg',
      },
      {
        title: 'Dokumentasi Tim Pemenang Juara 1 IT Bootcamp Se-Kampus UBSI',
        url: '/documentation/juara-1-bootcamp-tim-outdoor.jpg',
      },
    ],
    pdf_url: '/certificates/sertifikat-juara1-it-bootcamp.pdf',
    description: 'Meraih predikat JUARA 1 mengungguli seluruh perwakilan mahasiswa dari seluruh kampus Universitas Bina Sarana Informatika (UBSI) se-Indonesia dalam ajang kompetisi intensif IT Bootcamp "Software Development for Industry" di Hotel Asyana Sentul - Bogor. Diberikan apresiasi langsung oleh Rektor UBSI atas keunggulan aplikasi web "Website Madrasah Aliyah Smart Tahfidz School".',
    skills: [
      'Full Stack Software Development',
      'Web Application Architecture',
      'Clean Code & Agile Workflow',
      'Modern UI/UX Responsive Design',
      'Product Presentation & Demo',
    ],
  },
];

export const defaultEducations: Education[] = [
  {
    degree: 'S1 Sistem Informasi (S.Kom)',
    institution: 'Universitas Bina Sarana Informatika (UBSI)',
    start_year: '2023',
    end_year: 'Sekarang (Mahasiswa Aktif)',
    description: 'Menempuh pendidikan program studi Sistem Informasi dengan fokus pada Analisis & Desain Sistem, Rekayasa Perangkat Lunak, Manajemen Basis Data Relasional, serta Pengembangan Aplikasi Web & Mobile.',
  },
  {
    degree: 'Peminatan Rekayasa Perangkat Lunak & Basis Data',
    institution: 'Universitas Bina Sarana Informatika (UBSI)',
    start_year: '2023',
    end_year: 'Sekarang',
    description: 'Fokus pendalaman akademis pada perancangan database enterprise, metodologi agile software engineering, optimasi struktur data, dan arsitektur aplikasi berskala industri.',
  },
];

// Resilient fetch wrapper with strict timeout to prevent SSR network hanging
function withTimeout<T>(promise: Promise<T>, fallback: T, ms = 2500): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<T>((resolve) => {
    timer = setTimeout(() => resolve(fallback), ms);
  });

  return Promise.race([promise, timeoutPromise])
    .then((result) => {
      clearTimeout(timer);
      return result;
    })
    .catch((err) => {
      clearTimeout(timer);
      console.warn('Supabase fetch fallback triggered:', err?.message || err);
      return fallback;
    });
}

// Fast & resilient data getters (Instant load with zero SSR fetch timeouts)
export async function getProfileData(): Promise<Profile> {
  return defaultProfile;
}

export async function getExperiencesData(): Promise<Experience[]> {
  return defaultExperiences;
}

export async function getProjectsData(): Promise<Project[]> {
  return defaultProjects;
}

export async function getSkillsData(): Promise<Skill[]> {
  return defaultSkills;
}

export async function getEducationsData(): Promise<Education[]> {
  return defaultEducations;
}

export async function getCertificatesData(): Promise<Certificate[]> {
  return defaultCertificates;
}

export async function submitContactMessage(message: ContactMessage): Promise<{ success: boolean; message: string }> {
  if (!supabase) {
    return { success: true, message: 'Pesan berhasil disimulasikan (Supabase belum dihubungkan).' };
  }
  try {
    const { error } = await supabase.from('messages').insert([
      {
        sender_name: message.sender_name,
        sender_email: message.sender_email,
        subject: message.subject || 'Pesan dari Form Website CV',
        message: message.message,
      },
    ]);
    if (error) {
      console.error('Supabase insert message error:', error);
      return { success: false, message: 'Gagal mengirim pesan: ' + error.message };
    }
    return { success: true, message: 'Pesan Anda berhasil dikirim langsung ke database!' };
  } catch (err: unknown) {
    const errMessage = err instanceof Error ? err.message : 'Terjadi kesalahan tidak terduga.';
    return { success: false, message: errMessage };
  }
}
