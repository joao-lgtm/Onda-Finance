import { findUserByUsername } from "@/data/mockDb";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const USER_STORAGE_KEY = "@app:user";

export type User = {
  id: number;
  name: string;
  username: string;
  balanceUsd: number;
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  users: Array<User & { password: string }>;
  signIn: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateBalance: (newBalance: number) => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (stored) setUser(JSON.parse(stored));
      } catch (err) {
        console.warn("Failed to load user:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signIn = useCallback(async (username: string, password: string) => {
    setLoading(true);
    try {
      const row = await findUserByUsername(username);
      await new Promise(r => setTimeout(r, 500));
      if (!row || row.password !== password) {
        throw new Error("Usuário ou senha incorretos");
      }
      const { password: _p, ...userNoPass } = row;
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userNoPass));
      setUser(userNoPass);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
  }, []);

  const updateBalance = useCallback(async (newBalance: number) => {
    if (!user) return;
    const updatedUser = { ...user, balanceUsd: newBalance };
    setUser(updatedUser);
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, loading, users: [], signIn, logout, updateBalance }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};
