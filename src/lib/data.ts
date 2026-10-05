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
    role: 'Pengembang Perangkat Lunak Web & Mobile (Full Stack)',
    company: 'Proyek Independen & Klien',
    location: 'Jakarta, Indonesia',
    start_date: '2023',
    end_date: 'Sekarang',
    is_current: true,
    description: 'Merancang, membangun, dan merilis berbagai produk digital produksi nyata: Otokeep (Pemantauan Perawatan Kendaraan Cerdas dengan integrasi Gemini Vision AI), FindIt (Sistem Informasi Kehilangan & Penemuan Barang terpadu untuk 27 kampus UBSI se-Indonesia), CalTrack (Aplikasi mobile kesehatan & kalkulasi IMT berbasis Flutter & Laravel API), serta Kastrix (Sistem Kasir & Manajemen Multi-Gerai). Mengimplementasikan arsitektur bersih, RESTful API terstruktur, autentikasi aman, dan antarmuka responsif.',
    technologies: ['Flutter', 'Dart', 'Laravel', 'PHP', 'React', 'Tailwind CSS', 'MySQL', 'Gemini Vision AI', 'REST API'],
    display_order: 1,
  },
  {
    role: 'Pengembang Web & Analitik Data (Intern)',
    company: 'PT PGAS Telekomunikasi Nusantara (PGNCOM)',
    location: 'Jakarta, Indonesia',
    start_date: '2026',
    end_date: '3 Bulan',
    is_current: false,
    description: 'Mengembangkan sistem web operasional perusahaan "Monitoring Realisasi Biaya & Quality Control" untuk pemantauan realisasi anggaran proyek, pengesahan dokumen BASTO, verifikasi mutu QC teknis, dan administrasi penagihan. Merancang dan mengintegrasikan dashboard analitik Microsoft Power BI interaktif untuk pemantauan capaian proyek, evaluasi rasio realisasi terhadap prognosa, dan pelacakan status transaksi secara real-time.',
    technologies: ['Microsoft Power BI', 'DAX', 'Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'REST API', 'Tata Kelola Perusahaan'],
    display_order: 2,
  },
  {
    role: 'Pengajar & Mentor Rekayasa Perangkat Lunak (RPL)',
    company: 'SMK Muhammadiyah 15 Jakarta',
    location: 'Jakarta Selatan, Indonesia',
    start_date: '2025',
    end_date: '2025',
    is_current: false,
    description: 'Menjadi pengajar tamu dan instruktur teknis bagi para siswa jurusan Rekayasa Perangkat Lunak (RPL) di SMK Muhammadiyah 15 Jakarta. Membawakan kurikulum pengembangan web modern dengan pengenalan Framework Laravel, struktur MVC, basis data relasional MySQL, praktik kode bersih, serta simulasi alur kerja kolaborasi Git standar industri.',
    technologies: ['Framework Laravel', 'Pola MVC & PHP', 'Basis Data MySQL', 'Git & GitHub', 'Mentoring Teknis', 'Komunikasi Publik'],
    images: [
      '/documentation/smk-muhammadiyah-pengajar-1.jpg',
      '/documentation/smk-muhammadiyah-pengajar-2.jpg',
      '/documentation/smk-muhammadiyah-pengajar-3.jpg',
    ],
    captions: [
      'Foto Bersama Siswa Kelas Rekayasa Perangkat Lunak (RPL) SMK Muhammadiyah 15 Jakarta',
      'Sesi Pembelajaran Langsung: Pengenalan Framework Laravel & Arsitektur Web MVC',
      'Pendampingan Praktik Pemrograman & Eksplorasi Proyek di Laboratorium Komputer RPL',
    ],
    display_order: 3,
  },
];

export const defaultProjects: Project[] = [
  {
    title: 'Otokeep - Manajemen Perawatan Kendaraan & Pemindai AI',
    description: 'Platform cerdas pemantauan servis kendaraan & manajemen armada dengan integrasi Pemindai Speedometer AI (Gemini Vision), pengingat servis otomatis, pemantauan pajak & STNK berkala, serta riwayat perawatan real-time.',
    tags: ['Laravel', 'Tailwind CSS', 'MySQL', 'Gemini Vision AI', 'REST API'],
    category: 'data-ai',
    technical_highlight: 'Kompresi gambar JPEG otomatis dan pipeline Google Gemini Vision OCR untuk ekstraksi angka odometer tanpa latensi server berlebih.',
    demo_credentials: {
      email: 'demo@otokeep.com',
      password: 'password123',
      note: 'Akun Pengujian Demo',
    },
    demo_url: 'https://otokeep-rho.vercel.app/',
    github_url: 'https://github.com/Dimss-W/Otokeep.git',
    image_url: '/projects/otokeep-landing.png',
    images: [
      '/projects/otokeep-landing.png',
      '/projects/otokeep-dashboard.png',
    ],
    captions: [
      'Halaman Utama Otokeep • Pemantau Perawatan Kendaraan Cerdas',
      'Dashboard Armada • Pemindai Speedometer AI & Odometer Real-time',
    ],
    featured: true,
    display_order: 1,
  },
  {
    title: 'FindIt - Sistem Terpadu Kehilangan & Penemuan Barang UBSI',
    description: 'Sistem informasi pengelolaan barang hilang & ditemukan terpadu untuk 27 kampus Universitas Bina Sarana Informatika se-Indonesia, dilengkapi alur verifikasi temuan, brankas loker, validasi klaim, dan dashboard kontrol pusat.',
    tags: ['Laravel', 'Blade', 'MySQL', 'Multi-Kampus', 'REST API'],
    category: 'web',
    technical_highlight: 'Partisi relasi data multi-kampus untuk 27 cabang UBSI dengan penanganan loker penitipan terpusat dan verifikasi identitas mahasiswa.',
    demo_credentials: {
      email: 'admin.demo@ubsi.ac.id',
      password: 'password123',
      note: 'Akun Pengujian Demo',
    },
    demo_url: 'https://findit-git-main-dim-6414.vercel.app/',
    github_url: 'https://github.com/Dimss-W/FindIt.git',
    image_url: '/projects/findit-landing.png',
    images: [
      '/projects/findit-landing.png',
      '/projects/findit-dashboard.png',
    ],
    captions: [
      'Halaman Utama FindIt • Layanan 27 Kampus UBSI Indonesia',
      'Dashboard Administrator FINDIT • Panel Kontrol Pusat Multi-Kampus',
    ],
    featured: true,
    display_order: 2,
  },
  {
    title: 'Sistem Monitoring Realisasi & Dashboard Power BI',
    description: 'Sistem manajemen perusahaan terintegrasi untuk pemantauan realisasi anggaran proyek, pengesahan dokumen BASTO, verifikasi mutu QC teknis, dan administrasi penagihan PT PGAS Telekomunikasi Nusantara (PGNCOM) dengan visualisasi analitik Microsoft Power BI interaktif.',
    tags: ['Power BI', 'Laravel', 'Blade', 'MySQL', 'Sistem Perusahaan'],
    category: 'data-ai',
    technical_highlight: 'Pola arsitektur data relasional MySQL terintegrasi ke dashboard analitik Microsoft Power BI dengan formula DAX pemantauan deviasi anggaran proyek.',
    demo_url: 'https://github.com/Dimss-W/Sistem-Input-Realisasi',
    github_url: 'https://github.com/Dimss-W/Sistem-Input-Realisasi.git',
    image_url: '/projects/pgncom-login.png',
    images: [
      '/projects/pgncom-login.png',
      '/projects/pgncom-dashboard.png',
      '/projects/powerbi-dashboard.png',
    ],
    captions: [
      'Portal Operasional PGNCOM • Realisasi Biaya & Kontrol Kualitas',
      'Dashboard Administrator • Manajemen Distribusi Akun & Riwayat Audit',
      'Dashboard Monitoring Power BI • Analitik Realisasi & Performa Proyek',
    ],
    featured: true,
    display_order: 3,
  },
  {
    title: 'CalTrack - Aplikasi Mobile Kesehatan & Nutrisi',
    description: 'Aplikasi mobile kesehatan cerdas berbasis Flutter & Dart dengan arsitektur backend RESTful API Laravel & MySQL. Menyediakan fitur kalkulasi IMT/BMI real-time, rekomendasi nutrisi & olahraga personal, konsultasi dokter, manajemen langganan, dan dashboard admin terpusat.',
    tags: ['Flutter', 'Dart', 'Aplikasi Mobile', 'Laravel', 'REST API', 'MySQL'],
    category: 'mobile',
    technical_highlight: 'Arsitektur MVVM di Flutter dengan konsumsi RESTful API Laravel, kalkulasi IMT real-time, dan penyimpanan token aman.',
    demo_url: 'https://github.com/Dimss-W',
    github_url: 'https://github.com/Dimss-W',
    image_url: '/projects/caltrack-login.png',
    images: [
      '/projects/caltrack-login.png',
      '/projects/caltrack-admin.png',
      '/projects/caltrack-user.png',
    ],
    captions: [
      'Halaman Masuk • Pemantau Kesehatan Harian',
      'Halaman Admin • Dashboard Manajemen CalTrack',
      'Halaman Pengguna • Beranda & Kalkulator IMT/BMI',
    ],
    is_mobile: true,
    featured: true,
    display_order: 4,
  },
  {
    title: 'Kastrix - Sistem Kasir Pintar & Manajemen Multi-Gerai',
    description: 'Platform Point of Sale (POS) & manajemen inventaris cerdas untuk otomasi kasir, pengelolaan menu gerai, verifikasi akun mitra pemilik, dan visualisasi laporan omzet real-time dengan peran Super Admin & Kasir.',
    tags: ['Laravel', 'React', 'Tailwind CSS', 'MySQL', 'Sistem Kasir', 'REST API'],
    category: 'web',
    technical_highlight: 'Manajemen otentikasi role-based access control (RBAC) untuk super-admin dan multi-outlet kasir secara real-time.',
    demo_url: 'https://github.com/Dimss-W',
    github_url: 'https://github.com/Dimss-W',
    image_url: '/projects/kastrix-landing.png',
    images: [
      '/projects/kastrix-landing.png',
      '/projects/kastrix-dashboard.png',
    ],
    captions: [
      'Halaman Utama Kastrix • Solusi Cerdas Kelola Kasir & Omzet',
      'Dashboard Administrator • Panel Super Admin & Kelola Mitra',
    ],
    featured: true,
    display_order: 5,
  },
  {
    title: 'Website CV & Portofolio Profesional',
    description: 'Website portofolio dan CV personal modern berbasis Next.js 13, React, Tailwind CSS, dan Supabase dengan antarmuka interaktif dan responsif di perangkat web maupun mobile.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Supabase', 'TypeScript'],
    category: 'web',
    technical_highlight: 'Server-side data fetching terintegrasi Supabase Cloud, sistem komponen modular, dan kepatuhan aturan Anti-Slop.',
    demo_url: 'https://github.com/Dimss-W/CV-Website',
    github_url: 'https://github.com/Dimss-W/CV-Website.git',
    image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    featured: false,
    display_order: 6,
  },
];

export const defaultSkills: Skill[] = [
  { name: 'Flutter & Dart (Aplikasi Mobile)', category: 'Frontend', level: 95 },
  { name: 'Laravel Blade & Komponen Antarmuka', category: 'Frontend', level: 94 },
  { name: 'React.js & Tailwind CSS', category: 'Frontend', level: 92 },
  { name: 'Desain Antarmuka Responsif (UI/UX)', category: 'Frontend', level: 91 },
  { name: 'Laravel & PHP (Arsitektur MVC)', category: 'Backend', level: 95 },
  { name: 'Arsitektur RESTful API & JWT', category: 'Backend', level: 93 },
  { name: 'Manajemen Hak Akses (RBAC)', category: 'Backend', level: 92 },
  { name: 'Integrasi Gemini Vision AI (OCR)', category: 'Backend', level: 90 },
  { name: 'Microsoft Power BI & Analitik DAX', category: 'Database & Cloud', level: 94 },
  { name: 'MySQL & Pemodelan Basis Data Relasional', category: 'Database & Cloud', level: 93 },
  { name: 'Optimalisasi Kueri SQL', category: 'Database & Cloud', level: 91 },
  { name: 'PostgreSQL & Supabase Cloud', category: 'Database & Cloud', level: 89 },
  { name: 'Alur Kerja Tim Git & GitHub', category: 'Tools & DevOps', level: 93 },
  { name: 'Analisis Sistem & Proses Bisnis', category: 'Tools & DevOps', level: 92 },
  { name: 'Rilis Aplikasi & Konfigurasi Server', category: 'Tools & DevOps', level: 90 },
  { name: 'Mentoring Teknis & Komunikasi Publik', category: 'Tools & DevOps', level: 92 },
];

export const defaultCertificates: Certificate[] = [
  {
    id: 'serkom-database-administrator',
    title: 'Sertifikat Kompetensi Database Administrator',
    subtitle: 'Sertifikasi Kompetensi Nasional Pengelolaan Basis Data',
    issuer: 'Badan Nasional Sertifikasi Profesi (BNSP) & LSP Universitas Bina Sarana Informatika',
    credential_id: 'No. 63120 2521 6 0000936 2026',
    reg_number: 'No. Reg. DMS.1241.00936 2026',
    issue_date: '06 Maret 2026',
    valid_until: '06 Maret 2029 (Berlaku 3 Tahun)',
    field: 'Pengelolaan Data - Database Administrator',
    category: 'Certification',
    badge: 'Tersertifikasi BNSP & LSP RI',
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
    description: 'Dinyatakan KOMPETEN secara nasional oleh Badan Nasional Sertifikasi Profesi (BNSP) dan Lembaga Sertifikasi Profesi (LSP) UBSI pada skema Database Administrator. Menguasai arsitektur basis data, integrasi data, optimalisasi kueri SQL, pemeliharaan kualitas data, serta tata kelola keamanan dan hak akses basis data.',
    skills: [
      'Optimalisasi Kueri SQL',
      'Perancangan Basis Data & ERD',
      'Integrasi & Migrasi Data',
      'Kualitas & Konsistensi Data',
      'Keamanan & Hak Akses Basis Data',
      'Pengelolaan Dokumen & Konten',
    ],
  },
  {
    id: 'juara-1-it-bootcamp',
    title: 'Juara 1 IT Bootcamp Software Development (Seluruh Kampus Cabang UBSI)',
    subtitle: 'Pengembangan Website Madrasah Aliyah Smart Tahfidz School',
    issuer: 'Fakultas Teknik & Informatika (FTI) Universitas Bina Sarana Informatika',
    credential_id: 'e-Sn : 19230181',
    reg_number: 'Penghargaan Rektor UBSI',
    issue_date: '02 Juli 2025',
    field: 'Rekayasa Perangkat Lunak & Pengembangan Web Full Stack',
    category: 'Award',
    badge: 'Juara 1 Seluruh Kampus Cabang UBSI',
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
        title: 'Dokumentasi Tim Pemenang Juara 1 IT Bootcamp',
        url: '/documentation/juara-1-bootcamp-tim-outdoor.jpg',
      },
    ],
    pdf_url: '',
    description: 'Meraih predikat JUARA 1 mengungguli seluruh perwakilan mahasiswa dari seluruh kampus cabang Universitas Bina Sarana Informatika (UBSI) se-Indonesia dalam ajang kompetisi intensif IT Bootcamp "Software Development for Industry" di Hotel Asyana Sentul - Bogor. Diberikan apresiasi langsung oleh Rektor UBSI atas keunggulan aplikasi web "Website Madrasah Aliyah Smart Tahfidz School".',
    skills: [
      'Pengembangan Perangkat Lunak Full Stack',
      'Arsitektur Aplikasi Web',
      'Kode Bersih & Kolaborasi Tim',
      'Desain Antarmuka Responsif',
      'Presentasi & Demonstrasi Produk',
    ],
  },
];

export const defaultEducations: Education[] = [
  {
    degree: 'S1 Sistem Informasi (S.Kom)',
    institution: 'Universitas Bina Sarana Informatika (UBSI)',
    start_year: '2023',
    end_year: 'Sekarang (Mahasiswa Aktif)',
    description: 'Menempuh pendidikan program studi Sistem Informasi (Fakultas Teknik & Informatika) dengan fokus pada Analisis & Desain Sistem, Rekayasa Perangkat Lunak, Arsitektur Basis Data Relasional, serta Pengembangan Aplikasi Web & Mobile berskala industri.',
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
