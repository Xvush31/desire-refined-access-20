
// Import Firebase modules
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAdditionalUserInfo
} from "firebase/auth";

// Firebase configuration using Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google Provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Helper functions for authentication
export const signInWithGoogle = async () => {
  try {
    console.log("Starting Google sign-in process...");
    
    // Clear any previous auth state to avoid conflicts
    await signOut(auth);
    
    console.log("Initiating Google popup...");
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google sign-in successful:", result);
    
    // Check if the sign-in is a new user or existing one
    const additionalInfo = getAdditionalUserInfo(result);
    console.log("Is new user:", additionalInfo?.isNewUser);
    
    // Get user information
    const user = result.user;
    const token = await user.getIdToken();
    console.log("Token obtained successfully");
    
    return { 
      success: true,
      user,
      token,
      isNewUser: additionalInfo?.isNewUser || false
    };
  } catch (error: any) {
    console.error("Error during Google sign-in:", error);
    console.log("Error code:", error.code);
    console.log("Error message:", error.message);
    
    let errorMessage = "Une erreur s'est produite lors de la connexion avec Google";
    if (error.code === 'auth/popup-closed-by-user') {
      errorMessage = "La fenêtre de connexion a été fermée. Veuillez réessayer.";
    } else if (error.code === 'auth/popup-blocked') {
      errorMessage = "Popup bloqué par le navigateur. Veuillez autoriser les popups et réessayer.";
    } else if (error.code === 'auth/unauthorized-domain') {
      errorMessage = "Ce domaine n'est pas autorisé pour l'authentification Google. Veuillez contacter l'administrateur.";
    }
    
    return { 
      success: false, 
      error: errorMessage
    };
  }
};

export const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return {
      user: result.user,
      token: await result.user.getIdToken(),
      success: true
    };
  } catch (error) {
    console.error("Error signing in with email/password", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Email ou mot de passe incorrect" 
    };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error("Error signing out", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Erreur lors de la déconnexion" 
    };
  }
};

// Listen for authentication state changes
export const subscribeToAuthChanges = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
