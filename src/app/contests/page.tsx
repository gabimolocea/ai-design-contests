import { ContestList } from "@/app/components/ui/contest/ContestList";
import { ContestTabs } from "@/app/components/ui/contest/ContestTabs";
import { getContestData } from "lib/contest-data";

export default async function ContestsPage() {
  const contests = await getContestData();

  return (
    <div className="mx-auto max-w-[1080] px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Design Contests</h1>
        <p className="text-muted-foreground mt-2">
          Join active contests and showcase your creativity
        </p>
      </div>

      <ContestTabs />
      <ContestList contests={contests} />
    </div>
  );
}

