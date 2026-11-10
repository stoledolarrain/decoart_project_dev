import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isRegistered: boolean;
  loginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  registerAccount: (name: string, email: string, phone: string) => void;
  loginAccount: (email: string) => void;
  logout: () => void;
}

const GUEST_USER: User = {
  id: 'guest',
  name: 'Invitado Express',
  email: '',
  phone: '',
  isRegistered: false,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('decoart_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return GUEST_USER;
      }
    }
    return GUEST_USER;
  });

  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('decoart_user', JSON.stringify(user));
  }, [user]);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const registerAccount = (name: string, email: string, phone: string) => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      phone,
      isRegistered: true,
      discountCoupon: 'BIENVENIDO15',
      discountPercent: 15,
    };
    setUser(newUser);
    setLoginModalOpen(false);
  };

  const loginAccount = (email: string) => {
    const existingUser: User = {
      id: `usr_demo`,
      name: email.split('@')[0] || 'Cliente Frecuente',
      email,
      phone: '70012345',
      isRegistered: true,
      discountCoupon: 'BIENVENIDO15',
      discountPercent: 15,
    };
    setUser(existingUser);
    setLoginModalOpen(false);
  };

  const logout = () => {
    setUser(GUEST_USER);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isRegistered: user.isRegistered,
        loginModalOpen,
        openLoginModal,
        closeLoginModal,
        registerAccount,
        loginAccount,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
