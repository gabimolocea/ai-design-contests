export interface ChangelogEntry {
    id: string;
    version: string;
    date: string;
    title: string;
    description: string;
    type: "feature" | "improvement" | "fix";
    imageUrl?: string;
  }