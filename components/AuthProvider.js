import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in on component mount
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    // Make an API call to check if the user is logged in
    // Example: fetch('/api/check-login-status')
    // Returns a response indicating if the user is logged in

    // If the response indicates the user is logged in, set isLoggedIn to true
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Make an API call to log out the user
    // Example: fetch('/api/logout')

    // After successful logout, set isLoggedIn to false
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, checkLoginStatus, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
