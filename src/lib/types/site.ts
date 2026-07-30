export interface Education {
  school: string;
  logo?: string;
  website?: string;
  degree: string;
  start: string;
  end: string;
  details?: EducationDetails;
  visible?: boolean;
}

export interface Career {
  company: string;
  logo?: string;
  website?: string;
  role: string;
  type?: string;
  start: string;
  end: string;
  about?: string;
  scope?: string;
  visible?: boolean;
}

export interface Project {
  title: string;
  slug: string;
  pinned: boolean;
  description?: string;
  tags: string[];
  url?: string | null;
  repo?: string | null;
  cover?: string | null;
  page?: boolean;
  images?: string[];
  visible?: boolean;
}

export interface EducationDetails {
  grade?: string;
  awards?: string[];
  clubs?: string[];
  honor?: string[];
  description?: string;
}