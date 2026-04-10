import { createContext, useContext, useReducer, useEffect } from "react";
import type { ReactNode } from "react";

interface User {
  id: number;
  username: string;
  role: "USER" | "ADMIN";
}

interface AuthState {
  user: User | null;
  token: string | null;
  isInitialized: boolean;
}

type AuthAction =
  | { type: "LOGIN"; payload: { user: User; token: string } }
  | { type: "LOGOUT" }
  | { type: "SET_INITIALIZED" };

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isInitialized: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { user: null, token: null, isInitialized: true };
    case "SET_INITIALIZED":
      return { ...state, isInitialized: true };
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUserStr = localStorage.getItem("user");

    if (savedToken && savedUserStr) {
      try {
        const user = JSON.parse(savedUserStr);
        dispatch({ type: "LOGIN", payload: { user, token: savedToken } });
      } catch (e) {
        console.error("Failed to restore user", e);
        localStorage.removeItem("user");
      }
    }

    dispatch({ type: "SET_INITIALIZED" });
  }, []);

  const login = (user: User, token: string) => {
    dispatch({ type: "LOGIN", payload: { user, token } });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
