import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  User,
  // GoogleAuthProvider, // Removed
  signInWithEmailAndPassword,
  // signInWithPopup, // Removed
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence, // Corrected: Need this for the custom timeout logic
} from "firebase/auth";
import { useSnackbar } from "notistack"; // Import useSnackbar
import { auth } from "../firebase/config";

const SESSION_TIMEOUT_HOURS = 12;
const LOGIN_TIMESTAMP_KEY = "loginTimestamp";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<User>;
  // loginWithGoogle: () => Promise<User>; // Removed
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar(); // Get the enqueueSnackbar function

  // Set persistence initially. We use local persistence but manage timeout manually.
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence) // Keep local persistence
      .catch((error) => {
        console.error("Error setting auth persistence:", error);
      });
  }, []);

  // Check session timeout and handle auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const loginTimeStr = localStorage.getItem(LOGIN_TIMESTAMP_KEY);
        if (loginTimeStr) {
          const loginTime = parseInt(loginTimeStr, 10);
          const elapsedHours = (Date.now() - loginTime) / (1000 * 60 * 60);

          if (elapsedHours >= SESSION_TIMEOUT_HOURS) {
            console.log(
              `Session timed out after ${SESSION_TIMEOUT_HOURS} hours. Logging out.`
            );
            enqueueSnackbar("Session timed out. Please log in again.", {
              variant: "warning",
            }); // Add notification
            signOut(auth); // This will trigger onAuthStateChanged again with user=null
            localStorage.removeItem(LOGIN_TIMESTAMP_KEY);
            setCurrentUser(null); // Explicitly set user to null immediately
          } else {
            // User is logged in and within the time limit
            setCurrentUser(user);
          }
        } else {
          // User is logged in but no timestamp found (e.g., first login after update)
          // Set timestamp now to start the timer.
          localStorage.setItem(LOGIN_TIMESTAMP_KEY, Date.now().toString());
          setCurrentUser(user);
        }
      } else {
        // User is logged out
        localStorage.removeItem(LOGIN_TIMESTAMP_KEY);
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // Store login timestamp on successful login
      localStorage.setItem(LOGIN_TIMESTAMP_KEY, Date.now().toString());
      enqueueSnackbar("Logged in successfully!", { variant: "success" }); // Add notification
      return result.user;
    } catch (error: any) {
      console.error("Login error:", error);
      enqueueSnackbar(`Login failed: ${error.message}`, { variant: "error" }); // Add error notification
      throw error; // Re-throw the error so the calling component can handle it if needed
    } // Added missing closing brace for catch block
  };

  // Removed loginWithGoogle function

  const logout = async () => {
    // Clear timestamp on manual logout
    localStorage.removeItem(LOGIN_TIMESTAMP_KEY);
    await signOut(auth);
    // Reverted: Removed the sx prop as it's not valid here
    enqueueSnackbar("Logged out successfully.", { variant: "info" });
  };

  const value = {
    currentUser,
    loading,
    loginWithEmail,
    // loginWithGoogle, // Removed
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
