
import { useState, useEffect } from "react";
import { getAdminPassword } from "../utils/fileUtils";

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isFirstLogin, setIsFirstLogin] = useState<boolean>(false);
  
  useEffect(() => {
    // Vérifier si c'est la première connexion (mot de passe par défaut)
    const currentPassword = getAdminPassword();
    if (currentPassword === "12345") {
      setIsFirstLogin(true);
    }
  }, []);

  const handleLogin = (password: string) => {
    const currentPassword = getAdminPassword();
    
    if (password === currentPassword) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  return { 
    isAuthenticated, 
    setIsAuthenticated, 
    isFirstLogin, 
    setIsFirstLogin, 
    handleLogin 
  };
};
