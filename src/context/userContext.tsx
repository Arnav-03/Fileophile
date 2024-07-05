"use client";
import axios from "axios";
import router from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface User {
  username: string;
  email: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const initialUser: User | null = null;

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const checkcookies = async () => {
    try {
      const response = await axios.post("/api/users/checkcookies");
      if (response.data) {
        setUser(response.data);
      }
    } catch (error: any) {
/*       console.log("hehe");
 */    } finally {
    }
  };
  useEffect(() => {
    checkcookies();
  }, []);
  useEffect(() => {
    if (user !== null) {
/*       console.log(user);
 */    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
