import { Card } from "@/app/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Heart } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import Image from "next/image";
import { Design } from "./types";

interface DesignCardProps {
  design: Design;
}

export default function DesignCard({ design }: DesignCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-video">
        <Image
          src={design.imageUrl}
          alt={design.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={design.designer.avatarUrl} />
              <AvatarFallback>
                {design.designer.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">
              {design.designer.name}
            </span>
          </div>
          
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Heart className="h-4 w-4 mr-1" />
            <span>{design.likes}</span>
          </Button>
        </div>
        
        <h3 className="font-medium line-clamp-1">{design.title}</h3>
      </div>
    </Card>
  );
}