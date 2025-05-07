// types/citizenProjects.ts
export interface ProjectAuthor {
  name: string;
  avatar: string;
}

export interface PopularProject {
  id: number;
  title: string;
  category: string;
  votes: number;
  progress: number;
  daysLeft: number;
  author: ProjectAuthor;
}

export interface RecentProject {
  id: number;
  title: string;
  category: string;
  createdAt: string;
  status: string;
}

export interface ProjectStats {
  total: number;
  approved: number;
  inProgress: number;
  completed: number;
  budget: number;
}