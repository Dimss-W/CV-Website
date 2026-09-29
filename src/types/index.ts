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
  display_order?: number;
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  tags: string[];
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
