"use client";

import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";

export function ContestTabs() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { value: "all", label: "All Contests" },
    { value: "open", label: "Open" },
    { value: "guaranteed", label: "Guaranteed" },
    { value: "featured", label: "Featured" },
  ];

  return (
    <Tabs 
      defaultValue="all"
      className="mb-8"
      onValueChange={(value) => router.push(`${pathname}?filter=${value}`)}
    >
      <TabsList className="grid w-full grid-cols-4">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}