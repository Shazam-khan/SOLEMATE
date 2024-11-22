import React, { createContext, useState, useContext } from 'react';

// Create context
const UserContext = createContext();

// Custom hook to access user context
export const useUser = () => {
  return useContext(UserContext);
};

// Context provider component
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // Initial state set to null

  const login = (id) => {
    setUserId(id); // Set the userId after successful login
  };

  const logout = () => {
    setUserId(null); // Clear the userId when logging out
  };

  return (
    <UserContext.Provider value={{ userId, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
