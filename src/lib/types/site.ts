export interface Education {
  school: string;
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
