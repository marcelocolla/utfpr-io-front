import { createContext, ReactNode, useEffect, useState } from "react";

import Cookies from "js-cookie";

import history from "../history";

import { api } from "../services/api";

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  user: User | undefined;
  isAuthenticated: boolean;
  loading: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  email: string;
  id_pessoa: number;
  tipo_usuario: number;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("utfprio.token");

    if (token) {
      setIsAuthenticated(true);
      api.defaults.headers.Autorization = `Bearer ${token}`;
    }

    // console.log(user);

    setLoading(false);
  }, [user]);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("authenticate", {
        email,
        senha: password,
      });

      setIsAuthenticated(true);

      const token = response.data.token;
      const { id_pessoa, tipo_usuario } = response.data.pessoa;

      Cookies.set("utfprio.token", token, { expires: 0.001 });
      api.defaults.headers["Autorization"] = `Bearer ${token}`;

      setUser({
        email,
        id_pessoa: id_pessoa,
        tipo_usuario: tipo_usuario,
      });

      history.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, user, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
