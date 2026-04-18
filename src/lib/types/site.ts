export interface Education {
  school: string;
  logo?: string;
  degree: string;
  start: string;
  end: string;
  details?: EducationDetails;
}

export interface EducationDetails {
  grade?: string;
  awards?: string[];
  clubs?: string[];
  honor?: string[];
  description?: string;
}

export interface Career {
  company: string;
  logo?: string;
  role: string;
  type?: string;
  start: string;
  end: string;
}