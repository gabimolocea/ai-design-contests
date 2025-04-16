import { ChangelogList } from "@/components/ui/changelog/ChangelogList";
import { getChangelogData } from "@/lib/changelog-data";

export default async function WhatsNewPage() {
  const changelogData = await getChangelogData();

  return (
    <div className="container py-8 px-4 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">What's New</h1>
          <p className="text-muted-foreground mt-2">
            Latest updates and improvements to our platform
          </p>
        </div>
      </div>

      <ChangelogList data={changelogData} />
    </div>
  );
}