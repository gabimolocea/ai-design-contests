"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { Check } from "lucide-react";

interface VersionFilterProps {
  versions: string[];
  selectedVersions: string[];
  onVersionChange: (versions: string[]) => void;
}

export function VersionFilter({ 
  versions, 
  selectedVersions, 
  onVersionChange 
}: VersionFilterProps) {
  const [open, setOpen] = useState(false);

  const toggleVersion = (version: string) => {
    onVersionChange(
      selectedVersions.includes(version)
        ? selectedVersions.filter(v => v !== version)
        : [...selectedVersions, version]
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          Filter versions
          <span className="text-muted-foreground">
            {selectedVersions.length === versions.length ? "All" : `${selectedVersions.length} selected`}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <div className="space-y-1">
          {versions.map(version => (
            <Button
              key={version}
              variant="ghost"
              size="sm"
              className="w-full justify-start font-normal"
              onClick={() => toggleVersion(version)}
            >
              <span className="mr-2">
                {selectedVersions.includes(version) && (
                  <Check className="h-4 w-4" />
                )}
              </span>
              {version}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}