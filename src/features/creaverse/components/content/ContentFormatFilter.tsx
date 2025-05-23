
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileVideo, FileImage, Play, FileText, Grid2X2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ContentFormatFilterProps {
  activeFormat?: "all" | "video" | "image" | "audio" | "text";
  onFormatChange?: (format: "all" | "video" | "image" | "audio" | "text") => void;
  onChange?: (format: "all" | "video" | "image" | "audio" | "text") => void;
  metrics?: {
    video: number;
    image: number;
    audio: number;
    text: number;
  };
}

const ContentFormatFilter: React.FC<ContentFormatFilterProps> = ({
  activeFormat = "all",
  onFormatChange,
  onChange,
  metrics = { video: 0, image: 0, audio: 0, text: 0 }
}) => {
  // Use either onFormatChange or onChange prop
  const handleFormatChange = (format: "all" | "video" | "image" | "audio" | "text") => {
    if (onFormatChange) onFormatChange(format);
    if (onChange) onChange(format);
  };

  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm pt-2 pb-2">
      <Tabs value={activeFormat} onValueChange={handleFormatChange} className="w-full">
        <TabsList className="w-full overflow-x-auto flex justify-start bg-transparent p-0">
          <TabsTrigger 
            value="all" 
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-sm"
          >
            <Grid2X2 size={16} />
            <span>Tous</span>
            <Badge variant="outline" className="ml-1 bg-background text-foreground">
              {metrics.video + metrics.image + metrics.audio + metrics.text}
            </Badge>
          </TabsTrigger>
          
          <TabsTrigger 
            value="video" 
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-sm"
          >
            <FileVideo size={16} />
            <span>Vidéos</span>
            <Badge variant="outline" className="ml-1 bg-background text-foreground">
              {metrics.video}
            </Badge>
          </TabsTrigger>
          
          <TabsTrigger 
            value="image" 
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-sm"
          >
            <FileImage size={16} />
            <span>Photos</span>
            <Badge variant="outline" className="ml-1 bg-background text-foreground">
              {metrics.image}
            </Badge>
          </TabsTrigger>
          
          <TabsTrigger 
            value="audio" 
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-sm"
          >
            <Play size={16} />
            <span>Audio</span>
            <Badge variant="outline" className="ml-1 bg-background text-foreground">
              {metrics.audio}
            </Badge>
          </TabsTrigger>
          
          <TabsTrigger 
            value="text" 
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-sm"
          >
            <FileText size={16} />
            <span>Textes</span>
            <Badge variant="outline" className="ml-1 bg-background text-foreground">
              {metrics.text}
            </Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ContentFormatFilter;
