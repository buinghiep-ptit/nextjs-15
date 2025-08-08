"use client";
import { ACCESS_TOKEN_KEY } from "@/constants";
import { useSetState } from "@/hooks/use-set-state";
import { setSession } from "@/lib/utils";
import { AccountResType } from "@/schemas/account.schema";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";

type User = AccountResType["data"];

const AuthContext = createContext<{
  user: User | null;
  checkUserSession: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}>({
  user: null,
  checkUserSession: () => {},
  loading: false,
  isAuthenticated: false,
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { state, setState } = useSetState({
    user: null,
    loading: true,
  });

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

      if (accessToken) {
        setSession(accessToken);

        setState({ user: { accessToken }, loading: false });
      } else {
        setState({ user: null, loading: false });
      }
    } catch (error) {
      console.error("Error during check user session:", error);
      setState({ user: null, loading: false });
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

  const status = state.loading ? "loading" : "authenticated";

  const memoizedValue = useMemo(
    () => ({
      user: state.user
        ? {
            ...state.user,
          }
        : null,
      checkUserSession,
      loading: status === "loading",
      isAuthenticated: status === checkAuthenticated,
    }),
    [checkAuthenticated, checkUserSession, state.user, status]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
