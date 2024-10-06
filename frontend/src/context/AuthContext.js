import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (data) => {
    const response = await axios.post("/api/auth/register", data);
    setUser(response.data);
  };

  const login = async (data) => {
    const response = await axios.post("/api/auth/login", data);
    setUser(response.data);
  };

  const logout = () => {
    setUser(null);
    // Implement logout functionality (e.g., clear tokens)
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
