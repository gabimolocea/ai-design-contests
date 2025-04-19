import { Design } from "@/app/components/discover/types";
import DesignGrid from "@/app/components/discover/DesignGrid";
import CategoriesCarousel from "@/app/components/discover/CategoriesCarousel";

// Mock data - replace with your actual data source
const getDesigns = async (): Promise<Design[]> => {
  // In a real app, you would fetch this from your API
  return [
    {
      id: "1",
      title: "Modern Logo Design",
      imageUrl: "https://source.unsplash.com/random/600x400/?logo,design",
      designer: {
        id: "user1",
        name: "Sarah Johnson",
        avatarUrl: "https://source.unsplash.com/random/100x100/?portrait"
      },
      category: "logo",
      likes: 124,
    },
    {
      id: "2",
      title: "E-commerce Website",
      imageUrl: "https://source.unsplash.com/random/600x400/?web,design",
      designer: {
        id: "user2",
        name: "Michael Chen",
        avatarUrl: "https://source.unsplash.com/random/100x100/?man"
      },
      category: "web",
      likes: 89,
    },
    {
        id: "3",
        title: "E-commerce Website",
        imageUrl: "https://source.unsplash.com/random/600x400/?web,design",
        designer: {
          id: "user2",
          name: "Michael Chen",
          avatarUrl: "https://source.unsplash.com/random/100x100/?man"
        },
        category: "web",
        likes: 89,
      },
      {
        id: "4",
        title: "E-commerce Website",
        imageUrl: "https://source.unsplash.com/random/600x400/?web,design",
        designer: {
          id: "user2",
          name: "Michael Chen",
          avatarUrl: "https://source.unsplash.com/random/100x100/?man"
        },
        category: "web",
        likes: 89,
      },
      {
        id: "5",
        title: "E-commerce Website",
        imageUrl: "https://source.unsplash.com/random/600x400/?web,design",
        designer: {
          id: "user2",
          name: "Michael Chen",
          avatarUrl: "https://source.unsplash.com/random/100x100/?man"
        },
        category: "web",
        likes: 89,
      },
      {
        id: "6",
        title: "E-commerce Website",
        imageUrl: "https://source.unsplash.com/random/600x400/?web,design",
        designer: {
          id: "user2",
          name: "Michael Chen",
          avatarUrl: "https://source.unsplash.com/random/100x100/?man"
        },
        category: "web",
        likes: 89,
      },
      {
        id: "7",
        title: "E-commerce Website",
        imageUrl: "https://source.unsplash.com/random/600x400/?web,design",
        designer: {
          id: "user2",
          name: "Michael Chen",
          avatarUrl: "https://source.unsplash.com/random/100x100/?man"
        },
        category: "web",
        likes: 89,
      },
      {
        id: "8",
        title: "E-commerce Website",
        imageUrl: "https://source.unsplash.com/random/600x400/?web,design",
        designer: {
          id: "user2",
          name: "Michael Chen",
          avatarUrl: "https://source.unsplash.com/random/100x100/?man"
        },
        category: "web",
        likes: 89,
      },
    // Add more designs...
  ];
};

export default async function DiscoverPage() {
  const designs = await getDesigns();
  const categories = [
    { id: "all", name: "All" },
    { id: "logo", name: "Logo" },
    { id: "web", name: "Web Design" },
    { id: "app", name: "App Design" },
    { id: "branding", name: "Branding" },
    { id: "packaging", name: "Packaging" },
    { id: "illustration", name: "Illustration" },
    { id: "typography", name: "Typography" },
    { id: "print", name: "Print" },
  ];

  return (
    <div className="w-full py-8 px-4 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Discover</h1>
        <p className="text-muted-foreground mt-2">
          Explore inspiring designs from our community
        </p>
      </div>

      <CategoriesCarousel categories={categories} />
      <DesignGrid designs={designs} />
    </div>
  );
}