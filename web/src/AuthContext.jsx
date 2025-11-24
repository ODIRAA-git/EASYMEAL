import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check current user on refresh
    supabase.auth.getUser()
      .then(({ data, error }) => {
        if (error) {
          // "Auth session missing" is normal when not logged in
          if (error.message !== 'Auth session missing!') {
            console.error('Auth error:', error);
          }
          setUser(null);
        } else {
          setUser(data?.user || null);
        }
      })
      .catch((err) => {
        console.error('Failed to get user:', err);
        setUser(null);
      });

    // Subscribe to auth events
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      if (listener?.subscription) {
        listener.subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

