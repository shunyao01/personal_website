export type SiteConfig = {
  firstName: string;
  lastName: string;
  role: string;
  tagline: string;
  email: string;
  logo: string;
  badge: string;
  meta: string[];
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
};

export type ProjectCategory = "ml-engineering" | "mlops" | "infrastructure" | "research";

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
  body: string;
};

export type BuildingEntry = {
  slug: string;
  title: string;
  date: string;
  status: LogStatus;
  body: string;
};

export type WritingEntry = {
  slug: string;
  title: string;
  date: string;
  body: string;
};
