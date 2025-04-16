"use client";

import { ChangelogItem } from "@/components/ui/changelog/ChangelogItem";
import { VersionFilter } from "@/components/ui/changelog/VersionFilter";
import { ChangelogEntry } from "@/components/ui/changelog/types";
import { useState } from "react";

export function ChangelogList({ data }: { data: ChangelogEntry[] }) {
  const [filteredVersions, setFilteredVersions] = useState<string[]>(
    Array.from(new Set(data.map((item) => item.version)))
  );

  const filteredData = data.filter((item) =>
    filteredVersions.includes(item.version)
  );

  return (
    <div className="space-y-8">
      <VersionFilter
        versions={Array.from(new Set(data.map((item) => item.version)))}
        selectedVersions={filteredVersions}
        onVersionChange={setFilteredVersions}
      />

      {filteredData.map((item, index) => (
        <ChangelogItem
        key={item.id}
        entry={item}
        showSeparator={index < filteredData.length - 1}
      />
      ))}
    </div>
  );
}