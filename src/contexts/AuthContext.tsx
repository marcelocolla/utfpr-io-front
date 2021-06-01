import { createContext, ReactNode, useState } from "react";
import { useHistory } from "react-router";
import { api } from "../services/api";

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  user: User | undefined;
  isAuthenticated: boolean;
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
  const isAuthenticated = !!user;

  const history = useHistory();

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("authenticate", {
        email,
        senha: password,
      });

      const { id_pessoa, tipo_usuario } = response.data.pessoa;

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
    <AuthContext.Provider value={{ signIn, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
