
// Import Firebase modules
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  signOut
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

// Helper functions for authentication
export const signInWithGoogle = async () => {
  try {
    // Utilise signInWithPopup au lieu de signInWithRedirect 
    // car le problème était avec le domaine non autorisé pour la redirection
    const result = await signInWithPopup(auth, googleProvider);
    // Get credentials
    const user = result.user;
    const token = await user.getIdToken();
    return { 
      success: true,
      user,
      token
    };
  } catch (error) {
    console.error("Error signing in with Google", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Une erreur s'est produite" 
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
