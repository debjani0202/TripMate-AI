import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getCurrentUser,
  loginUser,
  registerUser,
  type AuthUser,
} from "@/services/api/auth.service";

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (
    email: string,
    password: string,
  ) => Promise<void>;

  register: (
    fullName: string,
    email: string,
    password: string,
  ) => Promise<void>;

  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("smarttrip_token"),
  );

  const [isLoading, setIsLoading] = useState(true);

  // Restore existing login session when the application starts.
  useEffect(() => {
    const restoreSession = async () => {
      const storedToken =
        localStorage.getItem("smarttrip_token");

      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();

        setToken(storedToken);
        setUser(currentUser);
      } catch {
        // Token is invalid or expired.
        localStorage.removeItem("smarttrip_token");

        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  // Login
  const login = async (
    email: string,
    password: string,
  ) => {
    const response = await loginUser({
      email,
      password,
    });

    // Save JWT token
    localStorage.setItem(
      "smarttrip_token",
      response.token,
    );

    // Update application state
    setToken(response.token);
    setUser(response.user);
  };

  // Register
  const register = async (
    fullName: string,
    email: string,
    password: string,
  ) => {
    await registerUser({
      fullName,
      email,
      password,
    });
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("smarttrip_token");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(token && user),
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider",
    );
  }

  return context;
}