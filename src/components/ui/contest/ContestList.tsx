import { ContestCard } from "@/components/ui/contest/ContestCard";
import { Contest } from "@/components/ui/contest/types";

interface ContestListProps {
  contests: Contest[];
}

export function ContestList({ contests }: ContestListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(320px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4">
      {contests.map((contest) => (
        <ContestCard key={contest.id} contest={contest} />
      ))}
    </div>
  );
}