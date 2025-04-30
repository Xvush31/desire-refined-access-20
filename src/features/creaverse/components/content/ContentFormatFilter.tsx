
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileVideo, FileImage, Play, FileText, Grid2X2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ContentFormatFilterProps {
  activeFormat: "all" | "video" | "image" | "audio" | "text";
  onFormatChange: (format: "all" | "video" | "image" | "audio" | "text") => void;
  metrics: {
    video: number;
    image: number;
    audio: number;
    text: number;
  };
}

const ContentFormatFilter: React.FC<ContentFormatFilterProps> = ({
  activeFormat,
  onFormatChange,
  metrics
}) => {
  return (
    <Tabs value={activeFormat} onValueChange={(value) => onFormatChange(value as any)} className="w-full">
      <TabsList className="w-full overflow-x-auto flex justify-start bg-transparent p-0">
        <TabsTrigger 
          value="all" 
          className="flex items-center gap-2 data-[state=active]:bg-muted/80"
        >
          <Grid2X2 size={16} />
          <span>Tous</span>
          <Badge variant="outline" className="ml-1 bg-background">
            {metrics.video + metrics.image + metrics.audio + metrics.text}
          </Badge>
        </TabsTrigger>
        
        <TabsTrigger 
          value="video" 
          className="flex items-center gap-2 data-[state=active]:bg-muted/80"
        >
          <FileVideo size={16} />
          <span>Vidéos</span>
          <Badge variant="outline" className="ml-1 bg-background">
            {metrics.video}
          </Badge>
        </TabsTrigger>
        
        <TabsTrigger 
          value="image" 
          className="flex items-center gap-2 data-[state=active]:bg-muted/80"
        >
          <FileImage size={16} />
          <span>Photos</span>
          <Badge variant="outline" className="ml-1 bg-background">
            {metrics.image}
          </Badge>
        </TabsTrigger>
        
        <TabsTrigger 
          value="audio" 
          className="flex items-center gap-2 data-[state=active]:bg-muted/80"
        >
          <Play size={16} />
          <span>Audio</span>
          <Badge variant="outline" className="ml-1 bg-background">
            {metrics.audio}
          </Badge>
        </TabsTrigger>
        
        <TabsTrigger 
          value="text" 
          className="flex items-center gap-2 data-[state=active]:bg-muted/80"
        >
          <FileText size={16} />
          <span>Textes</span>
          <Badge variant="outline" className="ml-1 bg-background">
            {metrics.text}
          </Badge>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ContentFormatFilter;
