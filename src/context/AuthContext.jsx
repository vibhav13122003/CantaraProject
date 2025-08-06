import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
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
    }

    if (userObject) {
      localStorage.setItem("user", JSON.stringify(userObject));
      setUser(userObject);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
