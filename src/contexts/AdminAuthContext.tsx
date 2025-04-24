
import React, { createContext, useState, useEffect, useContext } from "react";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  adminEmail: string | null;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check if admin is authenticated from localStorage
    const adminAuth = localStorage.getItem("adminAuthenticated");
    const email = localStorage.getItem("adminEmail");
    
    if (adminAuth === "true") {
      setIsAuthenticated(true);
      setAdminEmail(email);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminEmail");
    setIsAuthenticated(false);
    setAdminEmail(null);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, adminEmail, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
