/*import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Fetch the initial session
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session);
    };
    getSession();

    // Subscribe to auth changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_, session) => setSession(session)
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={session}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
*/