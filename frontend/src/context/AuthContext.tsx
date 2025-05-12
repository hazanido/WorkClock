import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  userName: string | null;
  token: string | null;
  role: string | null;
  login: (token: string, role: string, userName: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [userName, setUserName] = useState<string | null>(localStorage.getItem("userName"));
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

  const login = (newToken: string, newRole: string, newUserName: string) => {
    console.log(newUserName)
    localStorage.setItem("userName", newUserName);
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
    setUserName(newUserName);
    setToken(newToken);
    setRole(newRole);
  };

  const logout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUserName(null)
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{userName, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
