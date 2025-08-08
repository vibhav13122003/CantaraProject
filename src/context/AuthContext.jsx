import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Using sessionStorage to clear on tab close
    const storedUser = sessionStorage.getItem("user");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      return null;
    }
  });

  const login = (role) => {
    let userObject = null;
    if (role === "cantera_admin") {
      userObject = { name: "Cantera Pro Admin", role: "cantera_admin" };
    } else if (role === "club_super_admin") {
      userObject = { name: "Club Super Admin", role: "club_super_admin" };
    } else if (role === "club_admin") {
      userObject = { name: "Club Admin", role: "club_admin" };
    } else if (role === "coach") {
      // --- ADDED THIS BLOCK ---
      userObject = { name: "Coach", role: "coach" };
    } else if (role === "data_analyst") {
      // --- ADDED THIS BLOCK ---
      userObject = { name: "Data Analyst", role: "data_analyst" };
    } else if (role === "scout") {
      // --- ADDED THIS BLOCK ---
      userObject = { name: "Scout", role: "scout" };
    }

    if (userObject) {
      sessionStorage.setItem("user", JSON.stringify(userObject));
      setUser(userObject);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
