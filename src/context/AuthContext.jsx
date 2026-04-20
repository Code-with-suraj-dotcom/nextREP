import { createContext, useContext, useEffect, useState } from 'react';
import {
  subscribeToAuth,
  loginWithGoogle,
  loginWithEmail,
  signupWithEmail,
  logout,
} from '../services/firebase';

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeToAuth((user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  const value = {
    currentUser,
    authLoading,
    loginWithGoogle,
    loginWithEmail,
    signupWithEmail,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
