import { Contest } from "@/components/ui/contest/types";

export async function getContestData(): Promise<Contest[]> {
  // In a real app, fetch from your API
  return [
    {
      id: "1",
      title: "Modern Logo Design for Tech Startup",
      description: "We need a fresh logo for our new SaaS platform",
      category: "Logo",
      prize: 500,
      entries: 42,
      entriesGoal: 50,
      timeRemaining: "3 days",
      imageUrl: "",
      isFeatured: true,
      isGuaranteed: true,
      status: "open"
    },
    {
      id: "2",
      title: "E-commerce Website Redesign",
      description: "Complete redesign for our online store",
      category: "Web Design",
      prize: 1200,
      entries: 18,
      entriesGoal: 30,
      timeRemaining: "5 days",
      imageUrl: "",
      isFeatured: false,
      isGuaranteed: true,
      status: "open"
    },
    {
      id: "3",
      title: "E-commerce Website Redesign",
      description: "Complete redesign for our online store",
      category: "Web Design",
      prize: 1200,
      entries: 18,
      entriesGoal: 30,
      timeRemaining: "5 days",
      imageUrl: "",
      isFeatured: false,
      isGuaranteed: true,
      status: "open"
    },
    {
      id: "4",
      title: "E-commerce Website Redesign",
      description: "Complete redesign for our online store",
      category: "Web Design",
      prize: 1200,
      entries: 18,
      entriesGoal: 30,
      timeRemaining: "5 days",
      imageUrl: "",
      isFeatured: false,
      isGuaranteed: true,
      status: "open"
    },
    {
      id: "5",
      title: "E-commerce Website Redesign",
      description: "Complete redesign for our online store",
      category: "Web Design",
      prize: 1200,
      entries: 18,
      entriesGoal: 30,
      timeRemaining: "5 days",
      imageUrl: "",
      isFeatured: false,
      isGuaranteed: true,
      status: "open"
    },
    {
      id: "6",
      title: "E-commerce Website Redesign",
      description: "Complete redesign for our online store",
      category: "Web Design",
      prize: 1200,
      entries: 18,
      entriesGoal: 30,
      timeRemaining: "5 days",
      imageUrl: "",
      isFeatured: false,
      isGuaranteed: true,
      status: "open"
    },
    // Add more contests...
  ];
}