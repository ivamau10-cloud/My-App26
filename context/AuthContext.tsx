import React, { createContext, ReactNode, useContext } from "react";

interface AuthContextType {
  session: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: true,
  loading: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider value={{ session: true, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
}
