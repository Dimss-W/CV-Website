import { supabase } from './supabaseClient';
import { Profile, Experience, Project, Skill, Education, ContactMessage } from '@/types';

// Default mock data jika tabel di Supabase belum terisi data lengkap
export const defaultProfile: Profile = {
  full_name: 'Dimas Wijanarko',
  title: 'Full Stack Web & Mobile Software Engineer',
  bio: 'Mahasiswa Sistem Informasi Universitas Bina Sarana Informatika (2023 - Sekarang) yang berdedikasi membangun solusi digital Web & Mobile berkualitas tinggi. Berpengalaman merancang aplikasi mobile dengan Flutter & Dart terintegrasi backend Laravel, serta membangun website analitik enterprise terintegrasi Microsoft Power BI.',
  email: 'dmswijanarko@gmail.com',
  phone: '+62 812-3456-7890',
  location: 'Jakarta, Indonesia',
  avatar_url: '/dimas-profile.jpg',
  resume_url: '#contact',
  github_url: 'https://github.com/Dimss-W',
  linkedin_url: 'https://linkedin.com/in/dimas-wijanarko',
};

export const defaultExperiences: Experience[] = [
  {
    role: 'Full Stack & Mobile Engineer',
    company: 'Independent & Client Projects',
    location: 'Jakarta, Indonesia',
    start_date: '2023',
    end_date: 'Present',
    is_current: true,
    description: 'Mengembangkan aplikasi mobile cross-platform menggunakan Flutter & Dart sebagai frontend dengan arsitektur backend REST API berbasis Laravel dan basis data relasional. Mengimplementasikan autentikasi JWT aman, push notifications, dan reactive state management.',
    technologies: ['Flutter', 'Dart', 'Laravel', 'PHP', 'REST API', 'MySQL', 'Supabase'],
    display_order: 1,
  },
  {
    role: 'Web Developer & Data Integration Intern',
    company: 'Corporate Internship Program',
    location: 'Jakarta, Indonesia',
    start_date: '2022',
    end_date: '2023',
    is_current: false,
    description: 'Membangun website platform internal perusahaan tempat magang yang terintegrasi secara dinamis dengan Microsoft Power BI sebagai dashboard monitoring real-time dan KPI reporting. Mengoptimasi query data SQL dan visualisasi analitik eksekutif.',
    technologies: ['Microsoft Power BI', 'Laravel', 'React', 'MySQL', 'Tailwind CSS', 'REST API'],
    display_order: 2,
  },
  {
    role: 'Tech Speaker & Software Mentor',
    company: 'SMK Tech Bootcamp',
    location: 'Indonesia',
    start_date: '2022',
    end_date: '2022',
    is_current: false,
    description: 'Dipercaya menjadi pembicara dan mentor dalam acara bootcamp pengembangan perangkat lunak untuk siswa SMK, membawakan materi fundamental coding, workflow modern developer, dan persiapan karier industri IT.',
    technologies: ['Public Speaking', 'Mentoring', 'Software Development', 'Web & Mobile Tech'],
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
    title: 'Cross-Platform Mobile App (Flutter & Laravel)',
    description: 'Aplikasi mobile cross-platform modern yang dibangun dengan framework Flutter dan bahasa Dart sebagai frontend interaktif, terhubung ke backend RESTful API Laravel dan manajemen basis data MySQL.',
    tags: ['Flutter', 'Dart', 'Laravel', 'PHP', 'REST API', 'MySQL'],
    demo_url: 'https://github.com/Dimss-W',
    github_url: 'https://github.com/Dimss-W',
    image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    featured: true,
    display_order: 4,
  },
  {
    title: 'Personal CV & Portfolio Website',
    description: 'Website portofolio dan CV personal modern bereputasi tinggi berbasis Next.js 13, React, Tailwind CSS, dan BaaS Supabase terinspirasi desain modern Bedimcode Bianca.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Supabase', 'TypeScript'],
    demo_url: 'https://github.com/Dimss-W/CV-Website',
    github_url: 'https://github.com/Dimss-W/CV-Website.git',
    image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    featured: false,
    display_order: 5,
  },
];

export const defaultSkills: Skill[] = [
  { name: 'Flutter & Dart (Mobile & Web)', category: 'Frontend', level: 93 },
  { name: 'React / Next.js', category: 'Frontend', level: 92 },
  { name: 'Tailwind CSS & Modern UI', category: 'Frontend', level: 94 },
  { name: 'Responsive UI/UX Design', category: 'Frontend', level: 90 },
  { name: 'Laravel / PHP', category: 'Backend', level: 94 },
  { name: 'RESTful API Architecture', category: 'Backend', level: 92 },
  { name: 'Node.js / Express', category: 'Backend', level: 85 },
  { name: 'Microsoft Power BI', category: 'Database & Cloud', level: 92 },
  { name: 'MySQL & Relational DB', category: 'Database & Cloud', level: 92 },
  { name: 'PostgreSQL & Supabase', category: 'Database & Cloud', level: 90 },
  { name: 'Git / GitHub Workflow', category: 'Tools & DevOps', level: 92 },
  { name: 'Public Speaking & Mentoring', category: 'Tools & DevOps', level: 90 },
  { name: 'Vercel / Cloud Deployment', category: 'Tools & DevOps', level: 88 },
];

export const defaultEducations: Education[] = [
  {
    degree: 'Sistem Informasi (S.Kom)',
    institution: 'Universitas Bina Sarana Informatika (UBSI)',
    start_year: '2023',
    end_year: 'Sekarang (Mahasiswa Aktif)',
    description: 'Menempuh pendidikan program studi Sistem Informasi dengan fokus pada Analisis & Desain Sistem, Rekayasa Perangkat Lunak, Manajemen Basis Data Relasional, serta Pengembangan Aplikasi Web & Mobile.',
  },
  {
    degree: 'Juara 1 IT Bootcamp Software Development',
    institution: 'Kompetisi Nasional IT Bootcamp',
    start_year: '2025',
    end_year: '2025',
    description: 'Berhasil meraih predikat Juara 1 dalam ajang kompetisi intensif pengembangan perangkat lunak berskala nasional dengan menciptakan solusi aplikasi digital inovatif dan teruji.',
  },
  {
    degree: 'Pembicara Bootcamp Software Development SMK',
    institution: 'Program Bootcamp Sekolah Menengah Kejuruan (SMK)',
    start_year: '2025',
    end_year: '2025',
    description: 'Dipercaya menjadi narasumber/pembicara tamu dan mentor teknis untuk membagikan wawasan industri, praktik terbaik coding, dan motivasi berkarier di dunia software engineering kepada para siswa kejuruan.',
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
