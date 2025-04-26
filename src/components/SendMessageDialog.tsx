
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ChatHeader from "./messaging/ChatHeader";
import MessageInput from "./messaging/MessageInput";
import TipDialog from "./messaging/TipDialog";
import { toast } from "sonner";
import { useTheme } from "@/hooks/use-theme";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [isTipDialogOpen, setIsTipDialogOpen] = useState(false);
  const open = isOpen !== undefined ? isOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;
  const { theme } = useTheme();
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-black';
  const isMobile = useIsMobile();

  const handleSendMessage = (message: string) => {
    // TODO: Intégrer avec le backend
    toast.success(`Message envoyé à ${performerName}`);
  };

  const handleSendMedia = (file: File) => {
    // TODO: Intégrer avec le backend
    toast.success(`${file.type.includes('image') ? 'Photo' : 'Vidéo'} envoyée à ${performerName}`);
  };

  const mockPerformer = {
    id: performerId,
    username: performerName,
    displayName: performerName,
    image: `https://picsum.photos/seed/${performerId}/150/150`
  };

  if (isMobile) {
    return (
      <>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="bottom" className={`p-0 ${bgClass} h-full max-h-full`}>
            <ChatHeader performer={mockPerformer} />
            
            <div className="overflow-y-auto flex-1 p-4 mt-16 mb-20">
              {/* Messages will be displayed here */}
              <div className="text-center text-sm text-gray-500 my-4">
                Début de votre conversation avec {performerName}
              </div>
            </div>

            <MessageInput
              onSendMessage={handleSendMessage}
              onSendMedia={handleSendMedia}
              onSendTip={() => setIsTipDialogOpen(true)}
            />
          </SheetContent>
        </Sheet>

        <TipDialog
          isOpen={isTipDialogOpen}
          onClose={() => setIsTipDialogOpen(false)}
          performerName={performerName}
        />
      </>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={`sm:max-w-md h-[90vh] p-0 ${bgClass}`}>
          <ChatHeader performer={mockPerformer} />
          
          <div className="overflow-y-auto flex-1 p-4 mt-16 mb-20">
            {/* Messages will be displayed here */}
            <div className="text-center text-sm text-gray-500 my-4">
              Début de votre conversation avec {performerName}
            </div>
          </div>

          <MessageInput
            onSendMessage={handleSendMessage}
            onSendMedia={handleSendMedia}
            onSendTip={() => setIsTipDialogOpen(true)}
          />
        </DialogContent>
      </Dialog>

      <TipDialog
        isOpen={isTipDialogOpen}
        onClose={() => setIsTipDialogOpen(false)}
        performerName={performerName}
      />
    </>
  );
};

export default SendMessageDialog;
