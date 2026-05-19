export type SiteConfig = {
  firstName: string;
  lastName: string;
  role: string;
  tagline: string;
  summary: string[];
  location: string;
  email: string;
  resume: string;
  logo: string;
  badge: string;
  meta: string[];
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
};

export type ProjectCategory = "agents" | "applied-ml" | "product" | "research";

export type ProjectMetric = {
  value: string;
  label: string;
};

export type Project = {
  slug: string;
  title: string;
  teaser: string;
  date: string;
  category: ProjectCategory;
  featured: boolean;
  tags: string[];
  metrics: ProjectMetric[];
  body: string;
};

export type LogStatus = "shipped" | "studying" | "reading";

export type LearningEntry = {
  slug: string;
  title: string;
  date: string;
  status: LogStatus;
  featured: boolean;
  tags: string[];
  body: string;
};

export type BuildingEntry = {
  slug: string;
  title: string;
  date: string;
  status: LogStatus;
  tags: string[];
  body: string;
};

export type WritingEntry = {
  slug: string;
  title: string;
  date: string;
  body: string;
};

export type ExperienceEntry = {
  slug: string;
  title: string;
  organization: string;
  location: string;
  date: string;
  tags: string[];
  highlights: string[];
};

export type EducationEntry = {
  slug: string;
  school: string;
  credential: string;
  location: string;
  date: string;
  notes: string[];
};
