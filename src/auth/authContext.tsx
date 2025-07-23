import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  userData: null,
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return { children };
};
