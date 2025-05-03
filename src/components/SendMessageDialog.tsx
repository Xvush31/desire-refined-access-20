
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useTheme } from "@/hooks/use-theme";
import { useIsMobile } from "@/hooks/use-mobile";
import MessagingSystem from "@/features/creaverse/components/messaging/MessagingSystem";

interface SendMessageDialogProps {
  performerName: string;
  performerId: number;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const SendMessageDialog: React.FC<SendMessageDialogProps> = ({
  performerName,
  performerId,
  isOpen,
  onOpenChange
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isOpen !== undefined ? isOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  const mockPerformer = {
    id: performerId,
    username: performerName,
    displayName: performerName,
    image: `https://picsum.photos/seed/${performerId}/150/150`
  };

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="p-0 h-[85vh] max-h-full">
          <MessagingSystem
            performerId={performerId.toString()}
            performerName={performerName}
            performerAvatar={mockPerformer.image}
            onClose={() => setOpen(false)}
          />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 max-h-[85vh]">
        <MessagingSystem
          performerId={performerId.toString()}
          performerName={performerName}
          performerAvatar={mockPerformer.image}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SendMessageDialog;
