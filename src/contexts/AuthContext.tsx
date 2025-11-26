import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  name: string;
  email: string;
  usn?: string;
  course?: string;
  branch?: string;
  semester?: number;
  section?: string;
  photo?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      try {
        setUserState(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
      }
    }
  }, []);

  const setUser = (userData: User) => {
    setUserState(userData);
    localStorage.setItem("authUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUserState(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
