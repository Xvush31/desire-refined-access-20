
import { toast as sonnerToast } from "sonner";

// Type for toast parameters to ensure proper usage
type ToastProps = {
  description?: string;
  action?: React.ReactNode;
  duration?: number;
  variant?: "default" | "destructive";
};

// Create a properly typed toast function
export const toast = {
  success: (message: string, options?: ToastProps) => 
    sonnerToast.success(message, options),
  error: (message: string, options?: ToastProps) => 
    sonnerToast.error(message, options),
  warning: (message: string, options?: ToastProps) => 
    sonnerToast.warning(message, options),
  info: (message: string, options?: ToastProps) => 
    sonnerToast.info(message, options),
  message: (message: string, options?: ToastProps) => 
    sonnerToast(message, options)
};

// Export the hook for component usage
export const useToast = () => {
  return {
    toast,
    // Adding a toasts array to match the interface used in some components
    toasts: [],
  };
};
