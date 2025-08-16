"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { setAuthToken } from "@/lib/axios";

const AuthContext = createContext<{
  sessionToken?: string;
  setSessionToken: (sessionToken: string) => void;
}>({
  setSessionToken: () => {},
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export default function AuthProvider({
  children,
  initialSessionToken,
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
}) {
  const [sessionToken, setSessionToken] = useState(initialSessionToken);

  useEffect(() => {
    if (sessionToken) setAuthToken(sessionToken);
  }, [sessionToken]);

  return (
    <AuthContext.Provider value={{ sessionToken, setSessionToken }}>
      {children}
    </AuthContext.Provider>
  );
}
