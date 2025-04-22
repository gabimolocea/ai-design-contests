import { Contest } from "@/components/ui/contest/types";

export async function getContestData(): Promise<Contest[]> {
  // In a real app, fetch from your API
  return [
    {
      id: "1",
      title: "Modern Logo Design for Tech Startup",
      description: "We need a fresh logo for our new SaaS platform.",
      category: "Logo",
      prize: 500,
      entries: 42,
      entriesGoal: 50,
      timeRemaining: "3 days",
      imageUrl: "",
      isFeatured: true,
      isGuaranteed: true,
      status: "open",
      round: "Round 1",
      designEntries: [
        {
          id: "1",
          designer: "Designer A",
          imageUrl: "https://via.placeholder.com/150",
          rating: 4,
          declined: false,
          createdAt: "2025-04-01T10:00:00Z",
        },
        {
          id: "2",
          designer: "Designer B",
          imageUrl: "https://via.placeholder.com/150",
          rating: 5,
          declined: true,
          createdAt: "2025-04-02T12:00:00Z",
        },
        {
          id: "3",
          designer: "Designer C",
          imageUrl: "https://via.placeholder.com/150",
          rating: 3,
          declined: false,
          createdAt: "2025-04-03T14:00:00Z",
        },
      ],
      comments: [
        { id: "1", author: "Customer", text: "Great design concepts!" },
        { id: "2", author: "Designer A", text: "Thank you for the feedback!" },
      ],
    },
    {
      id: "2",
      title: "E-commerce Website Redesign",
      description: "Complete redesign for our online store.",
      category: "Web Design",
      prize: 1200,
      entries: 18,
      entriesGoal: 30,
      timeRemaining: "5 days",
      imageUrl: "",
      isFeatured: false,
      isGuaranteed: true,
      status: "open",
      round: "Round 2",
      designEntries: [
        {
          id: "1",
          designer: "Designer X",
          imageUrl: "https://via.placeholder.com/150",
          rating: 5,
          declined: false,
          createdAt: "2025-04-01T10:00:00Z",
        },
        {
          id: "2",
          designer: "Designer Y",
          imageUrl: "https://via.placeholder.com/150",
          rating: 2,
          declined: true,
          createdAt: "2025-04-02T12:00:00Z",
        },
      ],
      comments: [
        { id: "1", author: "Customer", text: "Looking forward to seeing more!" },
        { id: "2", author: "Designer X", text: "Working on new ideas!" },
      ],
    },
  ];
}