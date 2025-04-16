
import DesignCard from "./DesignCard";
import { Design } from "./types";

interface DesignGridProps {
  designs: Design[];
}

export default function DesignGrid({ designs }: DesignGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(320px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4">
      {designs.map((design) => (
        <DesignCard key={design.id} design={design} />
      ))}
    </div>
  );
}