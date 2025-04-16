import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Contest } from "@/components/ui/contest/types";
import { Clock, DollarSign, Award } from "lucide-react";

export function ContestCard({ contest }: { contest: Contest }) {
  return (
    <div className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image Section */}
      <div className="relative aspect-video bg-gray-200 flex items-center justify-center">
        {contest.imageUrl ? (
          <Image
            src={contest.imageUrl}
            alt={contest.title || "Untitled Contest"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="text-gray-500 text-sm">No Image Available</div>
        )}
        {contest.isFeatured && (
          <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title and Category */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-2">
            {contest.title || "Untitled Contest"}
          </h3>
          <Badge variant="outline">{contest.category || "Uncategorized"}</Badge>
        </div>

        {/* Contest Details */}
        <div className="space-y-3 mt-4">
          {/* Prize */}
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-primary" />
            <span>${contest.prize?.toLocaleString() || "0"} prize</span>
            {contest.isGuaranteed && (
              <Badge variant="outline" className="ml-2">
                Guaranteed
              </Badge>
            )}
          </div>

          {/* Entries */}
          <div className="flex items-center gap-2 text-sm">
            <Award className="h-4 w-4 text-primary" />
            <span>{contest.entries || 0} entries</span>
          </div>

          {/* Time Remaining */}
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span>{contest.timeRemaining || "No time left"} remaining</span>
          </div>

          {/* Progress Bar */}
          <Progress
            value={
              contest.entries && contest.entriesGoal
                ? (contest.entries / contest.entriesGoal) * 100
                : 0
            }
            className="h-2"
          />
          <p className="text-xs text-muted-foreground text-right">
            Goal: {contest.entriesGoal || 0} entries
          </p>
        </div>
      </div>
    </div>
  );
}