export interface Education {
  school: string;
  logo?: string;
  website?: string;
  degree: string;
  start: string;
  end: string;
  details?: EducationDetails;
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
}

export interface Project {
  title: string;
  slug: string;
  pinned: boolean;
  description?: string;
  tags: string[];
  url?: string | null;
  repo?: string | null;
}

export interface EducationDetails {
  grade?: string;
  awards?: string[];
  clubs?: string[];
  honor?: string[];
  description?: string;
}