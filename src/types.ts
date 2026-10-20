export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  fullDescription: string;
  image: string;
  colSpan: string;
  aspect: string;
  client: string;
  role: string;
  technologies: string[];
  metrics?: string;
  link?: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  category: string;
  image: string;
  content: string[];
}

export interface ExplorationItem {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  rotation: string;
  yOffset: number;
  image: string;
  tags: string[];
}
