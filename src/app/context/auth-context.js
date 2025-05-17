"use client";

import {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import AuthServices from "../services/authServices";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkLogin = useCallback(() => {
    const auth = AuthServices();
    const result = auth.hasToken();
    setIsLoggedIn(result);
    return result;
  }, []);
  useEffect(() => {
    checkLogin();
    window.addEventListener("focus", checkLogin);
    const handleStorageChange = (e) => {
      if (e.key === "authStateChanged") {
        checkLoginStatus();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("focus", checkLoginStatus);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [checkLogin]);
  const login = () => {
    setIsLoggedIn(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("authStateChanged", Date.now().toString());
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
     if (typeof window !== 'undefined') {
      localStorage.setItem("authStateChanged", Date.now().toString());
    }
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout ,checkLogin}}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
