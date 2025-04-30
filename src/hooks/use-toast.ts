
import { toast as sonnerToast } from "sonner";

// Export the toast function for direct usage
export const toast = sonnerToast;

// Export the hook for component usage
export const useToast = () => {
  return {
    toast: sonnerToast,
    // Adding a toasts array to match the interface used in some components
    toasts: [],
  };
};
