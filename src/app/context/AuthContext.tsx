'use client';

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  name: string;
  email: string;
  avatar?: string;
  memberSince?: string;
}

interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  loginWithSocial: (provider: 'google' | 'facebook') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CURRENT_USER_KEY = 'jadoo_auth_current_user';
const USERS_LIST_KEY = 'jadoo_auth_users_database';

// Default mock accounts
const DEFAULT_ACCOUNTS: StoredUser[] = [
  {
    name: "Hasnain Moavia",
    email: "hasnainmoa07@gmail.com",
    password: "Password123!",
    memberSince: "January 2024",
  },
  {
    name: "Alex Traveler",
    email: "alex@jadoo.com",
    password: "Password123!",
    memberSince: "March 2024",
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      // 1. Initialize user database if not set
      const existingDb = localStorage.getItem(USERS_LIST_KEY);
      if (!existingDb) {
        localStorage.setItem(USERS_LIST_KEY, JSON.stringify(DEFAULT_ACCOUNTS));
      }

      // 2. Check for logged in user session
      const savedUser = localStorage.getItem(CURRENT_USER_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Failed to read auth state:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getRegisteredUsers = (): StoredUser[] => {
    try {
      const data = localStorage.getItem(USERS_LIST_KEY);
      return data ? JSON.parse(data) : DEFAULT_ACCOUNTS;
    } catch {
      return DEFAULT_ACCOUNTS;
    }
  };

  const login = (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const users = getRegisteredUsers();

    const matchedUser = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!matchedUser) {
      return {
        success: false,
        error: "No account found with this email. Please Sign Up first!",
      };
    }

    if (matchedUser.password !== password) {
      return {
        success: false,
        error: "Incorrect password. Please verify and try again.",
      };
    }

    const sessionUser: User = {
      name: matchedUser.name,
      email: matchedUser.email,
      avatar: matchedUser.avatar,
      memberSince: matchedUser.memberSince || "Recently",
    };

    setUser(sessionUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
    return { success: true };
  };

  const signup = (name: string, email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const users = getRegisteredUsers();

    const existingUser = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (existingUser) {
      return {
        success: false,
        error: "An account with this email already exists. Please Sign In instead.",
      };
    }

    const newUser: StoredUser = {
      name: cleanName,
      email: cleanEmail,
      password: password,
      memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem(USERS_LIST_KEY, JSON.stringify(updatedUsers));

    // Immediately log in new user
    const sessionUser: User = {
      name: newUser.name,
      email: newUser.email,
      memberSince: newUser.memberSince,
    };

    setUser(sessionUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const loginWithSocial = (provider: 'google' | 'facebook') => {
    const socialName = provider === 'google' ? 'Google Traveler' : 'Facebook Explorer';
    const socialEmail = provider === 'google' ? 'traveler@gmail.com' : 'explorer@facebook.com';

    const sessionUser: User = {
      name: socialName,
      email: socialEmail,
      memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };

    setUser(sessionUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, loginWithSocial }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
