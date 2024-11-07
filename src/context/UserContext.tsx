"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface User {
  _id: string; // Unique identifier for the user
  email: string; // User's email address
  fullName: string; // User's full name
  role: string; // User's role (e.g., doctor, patient, etc.)
  createdAt: string; // Timestamp of when the user was created
  updatedAt: string; // Timestamp of the last update to the user
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check localStorage on initial load
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("userData");
      return savedUser ? JSON.parse(savedUser) : null;
    }
    return null;
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export { UserContext };
