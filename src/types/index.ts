export interface Profile {
  id?: string;
  full_name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  avatar_url?: string;
  resume_url?: string;
  github_url?: string;
  linkedin_url?: string;
  instagram_url?: string;
}

export interface Experience {
  id?: string;
  role: string;
  company: string;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description: string;
  technologies?: string[];
  images?: string[];
  captions?: string[];
  display_order?: number;
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  tags: string[];
  category?: 'web' | 'mobile' | 'data-ai';
  technical_highlight?: string;
  demo_credentials?: {
    email?: string;
    password?: string;
    note?: string;
  };
  demo_url?: string;
  github_url?: string;
  image_url?: string;
  images?: string[];
  captions?: string[];
  is_mobile?: boolean;
  featured?: boolean;
  display_order?: number;
}

export interface Skill {
  id?: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database & Cloud' | 'Tools & DevOps';
  level?: number;
  display_order?: number;
}

export interface Certificate {
  id: string;
  title: string;
  subtitle: string;
  issuer: string;
  credential_id: string;
  reg_number?: string;
  issue_date: string;
  valid_until?: string;
  field: string;
  category: 'Certification' | 'Award';
  badge: string;
  images: { title: string; url: string }[];
  pdf_url: string;
  description: string;
  skills: string[];
  competency_units?: { code: string; title: string }[];
}

export interface Education {
  id?: string;
  degree: string;
  institution: string;
  field_of_study?: string;
  start_year: string;
  end_year?: string;
  description?: string;
  display_order?: number;
}

export interface ContactMessage {
  sender_name: string;
  sender_email: string;
  subject?: string;
  message: string;
}
