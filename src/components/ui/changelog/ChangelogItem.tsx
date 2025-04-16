import Image from "next/image";
import { ChangelogEntry } from "@/components/ui/changelog/types";

export function ChangelogItem({  entry = { id: "default-id", title: "", description: "", version: "", date: "", type: "feature", imageUrl: "" },
  showSeparator,
}: {
  entry?: ChangelogEntry; // Make entry optional
  showSeparator?: boolean;
}) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image Section */}
      <div className="relative aspect-video bg-gray-200 flex items-center justify-center">
        {entry.imageUrl ? (
          <Image
            src={entry.imageUrl}
            alt={entry.title || "Untitled Entry"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="text-gray-500 text-sm">No Image Available</div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="font-semibold text-lg">{entry.title || "Untitled Entry"}</h3>
        <p className="text-sm text-muted-foreground">{entry.description}</p>
        <p className="text-xs text-muted-foreground mt-2">
          Version: {entry.version} | Date: {entry.date}
        </p>
      </div>
      {showSeparator && <hr />}
    </div>
  );
}

