
import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import MessagingSystem from "./MessagingSystem";
import { useIsMobile } from "@/hooks/use-mobile";

interface MessagingButtonProps {
  performerId: string;
  performerName: string;
  performerAvatar: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
}

const MessagingButton: React.FC<MessagingButtonProps> = ({
  performerId,
  performerName,
  performerAvatar,
  variant = "default"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant={variant} className="flex gap-2 items-center">
            <MessageCircle className="h-4 w-4" />
            Message
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[85vh] p-0">
          <MessagingSystem
            performerId={performerId}
            performerName={performerName}
            performerAvatar={performerAvatar}
            onClose={() => setIsOpen(false)}
          />
        </SheetContent>
      </Sheet>
    );
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} className="flex gap-2 items-center">
          <MessageCircle className="h-4 w-4" />
          Message
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0 max-h-[85vh]">
        <MessagingSystem
          performerId={performerId}
          performerName={performerName}
          performerAvatar={performerAvatar}
          onClose={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default MessagingButton;
