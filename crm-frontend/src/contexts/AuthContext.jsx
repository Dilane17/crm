import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Vérifier le token ou récupérer l'utilisateur
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const { access_token } = response.data;
      localStorage.setItem("token", access_token);
      setUser({ token: access_token });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Erreur de connexion",
      };
    }
  };

  const register = async (nom, email, password) => {
    try {
      await authAPI.register({ nom, email, password });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Erreur d'inscription",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
