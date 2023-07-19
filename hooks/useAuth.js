import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, removeCookie] = useCookies([]);

  // Function to check token presence in the cookie and update isLoggedIn state
  const checkTokenPresence = () => {
    // const decodedToken = jwt.decode(cookies.token); // Decode the token
    // setIsLoggedIn(
    //   decodedToken && decodedToken.tokenUser && decodedToken.tokenUser.name
    //     ? true
    //     : false
    // );
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

  const getUser = () => {
    const token = Cookies.set("token", token);
    const { name, id } = jwt.decode(token);
    checkTokenPresence();
  };

  const handleLogout = () => {
    removeCookie("token");
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
