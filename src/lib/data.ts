import { supabase } from './supabaseClient';
import { Profile, Experience, Project, Skill, Education, ContactMessage } from '@/types';

// Default mock data jika tabel di Supabase belum terisi data lengkap
export const defaultProfile: Profile = {
  full_name: 'Dimas Wijanarko',
  title: 'Full Stack Web & Mobile Software Engineer',
  bio: 'Mahasiswa Sistem Informasi Universitas Bina Sarana Informatika (2023 - Sekarang) yang berdedikasi membangun solusi digital Web & Mobile berkualitas tinggi. Berpengalaman merancang aplikasi mobile dengan Flutter & Dart terintegrasi backend Laravel, serta membangun website analitik enterprise terintegrasi Microsoft Power BI.',
  email: 'dimaswijanarko111@gmail.com',
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
    title: 'Otokeep - Pemantauan Servis Kendaraan',
    description: 'Sistem web cerdas untuk pelacakan dan pemantauan jadwal servis kendaraan secara berkala, log riwayat perawatan suku cadang, dan estimasi biaya armada atau kendaraan pribadi.',
    tags: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'Responsive UI'],
    demo_url: 'https://github.com/Dimss-W/Otokeep',
    github_url: 'https://github.com/Dimss-W/Otokeep.git',
    image_url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    featured: true,
    display_order: 1,
  },
  {
    title: 'FindIt - Smart Lost & Found Platform',
    description: 'Platform pencarian dan pelaporan barang hilang serta temuan cerdas dengan sistem verifikasi kepemilikan, pencarian real-time berfilter lokasi, dan notifikasi pelaporan aman.',
    tags: ['Laravel', 'Blade', 'Supabase', 'MySQL', 'REST API'],
    demo_url: 'https://github.com/Dimss-W/FindIt',
    github_url: 'https://github.com/Dimss-W/FindIt.git',
    image_url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80',
    featured: true,
    display_order: 2,
  },
  {
    title: 'Sistem Input Realisasi Anggaran & Kinerja',
    description: 'Sistem internal enterprise monitoring realisasi program kerja, input serapan anggaran dinamis, dan integrasi visual reporting dashboard analitik untuk kebutuhan evaluasi manajemen (Projek Magang).',
    tags: ['Laravel', 'Blade', 'Power BI', 'MySQL', 'Enterprise'],
    demo_url: 'https://github.com/Dimss-W/Sistem-Input-Realisasi',
    github_url: 'https://github.com/Dimss-W/Sistem-Input-Realisasi.git',
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
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
    title: 'Enterprise Monitoring & Power BI Dashboard',
    description: 'Website sistem manajemen perusahaan tempat magang yang terintegrasi langsung dengan Microsoft Power BI untuk visualisasi analitik data performa real-time dan monitoring operasional.',
    tags: ['Power BI', 'Laravel', 'React', 'MySQL', 'Tailwind CSS'],
    demo_url: 'https://github.com/Dimss-W',
    github_url: 'https://github.com/Dimss-W',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
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
