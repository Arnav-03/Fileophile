"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  username: string;
  email: string;
  imageAvatar: string; // Assuming image is stored as URL or base64 string
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const initialUser: User | null = null;

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(initialUser);
  useEffect(() => {
  console.log(user)
  }, [user])
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
