export interface Basics {
  name: string;
  avatar: string;
  title: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  summary: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface EducationItem {
  school: string;
  major: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ProjectItem {
  name: string;
  image: string;
  description: string;
  techStack: string[];
  link: string;
  github: string;
}

export interface Resume {
  basics: Basics;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillGroup[];
  projects: ProjectItem[];
}
