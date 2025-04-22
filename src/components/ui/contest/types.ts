export interface Contest {
  id: string;
  title: string;
  description: string;
  category: string;
  prize: number;
  entries: number;
  entriesGoal: number;
  timeRemaining: string;
  imageUrl: string;
  isFeatured: boolean;
  isGuaranteed: boolean;
  round: string;
  status: "open" | "closed" | "voting";
  designEntries: {
    id: string;
    designer: string;
    imageUrl: string;
    rating: number;
    declined: boolean;
    createdAt: string;
  }[];
  comments: {
    id: string;
    author: string;
    text: string;
  }[];
}

// Utility function to provide fallbacks
export function createContestWithDefaults(contest: Partial<Contest>): Contest {
  return {
    id: contest.id || "default-id",
    title: contest.title || "Default Title",
    description: contest.description || "Default Description",
    category: contest.category || "Default Category",
    prize: contest.prize ?? 0,
    entries: contest.entries ?? 0,
    entriesGoal: contest.entriesGoal ?? 10,
    timeRemaining: contest.timeRemaining || "00:00:00",
    imageUrl: contest.imageUrl || "default-image-url.jpg",
    isFeatured: contest.isFeatured ?? false,
    isGuaranteed: contest.isGuaranteed ?? false,
    status: contest.status || "open",
    round: contest.round || "Round 1",
    designEntries: contest.designEntries || [],
    comments: contest.comments || [],
  };
}