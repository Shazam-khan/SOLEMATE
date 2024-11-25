import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch user data on app load to validate session
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true, // Send the JWT cookie
        });
        const { userId, isAdmin } = response.data;
        setUserId(userId);
        setIsAdmin(isAdmin);
      } catch (err) {
        console.error("Failed to fetch user", err);
        setUserId(null);
        setIsAdmin(false);
      }
    };

    fetchUser();
  }, []);

  // Authenticate user and set user data
  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true } // Ensure cookies are sent
      );

      const { u_id, is_admin } = response.data.User; // Extract user data from response
      setUserId(u_id);
      setIsAdmin(is_admin);
    } catch (err) {
      console.error("Login failed:", err);
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  // Logout user and clear user data
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/auth/logout",
        {},
        { withCredentials: true } // Ensure cookies are sent
      );
      setUserId(null);
      setIsAdmin(false);
      console.log("Logout successful");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        isAdmin,
        login: handleLogin, // Export handleLogin as login
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);