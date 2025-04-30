import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff } from "lucide-react";
import { ghostMode } from "@/services/ghostMode";
import { toast } from "@/hooks/use-toast";

const GhostModeToggle = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Vérifie l'état actuel du mode fantôme
    setEnabled(ghostMode.isEnabled());
  }, []);

  const handleToggle = () => {
    if (!enabled) {
      // Activation du mode fantôme
      ghostMode.enable();
      setEnabled(true);
      toast.success("Mode Fantôme activé", {
        description: "Votre navigation ne laisse plus de traces sur cet appareil",
      });
    } else {
      // Désactivation du mode fantôme
      ghostMode.disable();
      setEnabled(false);
      toast.success("Mode Fantôme désactivé", {
        description: "Votre navigation laisse des traces normales",
      });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch 
        id="ghost-mode" 
        checked={enabled} 
        onCheckedChange={handleToggle}
      />
      <label 
        htmlFor="ghost-mode" 
        className="text-sm cursor-pointer flex items-center"
      >
        {enabled ? (
          <>
            <EyeOff className="h-4 w-4 mr-1" />
            Mode Fantôme
          </>
        ) : (
          <>
            <Eye className="h-4 w-4 mr-1" />
            Mode Standard
          </>
        )}
      </label>
    </div>
  );
};

export default GhostModeToggle;
