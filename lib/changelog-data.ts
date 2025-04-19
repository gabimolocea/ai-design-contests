import { ChangelogEntry } from "@/app/components/ui/changelog/types";

export async function getChangelogData(): Promise<ChangelogEntry[]> {
  // In a real app, you would fetch this from your API
  return [
    {
      id: "1",
      version: "v3.2.0",
      date: "2023-11-15",
      title: "New Design System",
      description: "Completely redesigned UI with new components and dark mode support.",
      type: "feature",
      imageUrl: ""
    },
    {
        id: "2",
        version: "v3.2.0",
        date: "2023-11-15",
        title: "New Design System",
        description: "Completely redesigned UI with new components and dark mode support.",
        type: "feature",
        imageUrl: ""
      },
      {
        id: "3",
        version: "v3.2.0",
        date: "2023-11-15",
        title: "New Design System",
        description: "Completely redesigned UI with new components and dark mode support.",
        type: "feature",
        imageUrl: ""
      },
      {
        id: "4",
        version: "v3.2.0",
        date: "2023-11-15",
        title: "New Design System",
        description: "Completely redesigned UI with new components and dark mode support.",
        type: "feature",
        imageUrl: ""
      },
    // More entries...
  ];
}