import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated") === "true";
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setIsAuthenticated(storedAuth || !!storedUser);
  }, []);

  // Register function (Sign Up)
  const register = (email, password) => {
    if (!email || !password) return false;
    const user = { email, password };
    localStorage.setItem("user", JSON.stringify(user));
    return true;
  };

  // Login function
  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      return true;
    }
    return false;
  };

  // Google Login function
  const googleLogin = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, register, login, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
