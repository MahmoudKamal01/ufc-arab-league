import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to check token presence in the cookie and update isLoggedIn state
  const checkTokenPresence = () => {
    const authToken = Cookies.get("token");
    setIsLoggedIn(authToken ? true : false);
  };

  // Check token presence during initialization
  useEffect(() => {
    checkTokenPresence();
  }, []);

  const handleLogin = (token) => {
    Cookies.set("token", token);
    checkTokenPresence();
  };

  const handleLogout = () => {
    Cookies.remove("token");
    checkTokenPresence();
    toast.success("Logged out successfully ✔ Redirecting to home page");
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
}
