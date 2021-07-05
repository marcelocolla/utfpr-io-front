import { createContext, ReactNode, useEffect, useState } from "react";

import Cookies from "js-cookie";

import history from "../history";

import { api } from "../services/api";

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  error: any;
  loading: boolean;
  user: User | undefined;
  isAuthenticated: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

type Pessoa = {
  email: string;
  id_pessoa: number;
  nome_pessoa: string;
  tipo_usuario: number;
};

type Deseg = {
  id_deseg: number;
  matricula: number;
};

type Professor = {
  nome: string;
  matricula: string;
  codigo_barra: string;
  id_professor: number;
  id_departamento: number;
};

type Vigilante = {
  matricula: string;
};

type User = {
  pessoa: Pessoa;
  deseg?: Deseg;
  professor?: Professor;
  vigilante?: Vigilante;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  useEffect(() => {
    const token = Cookies.get("utfprio.token");

    if (token) {
      setIsAuthenticated(true);
      api.defaults.headers.Autorization = `Bearer ${token}`;
      api.defaults.headers.authentication = `${token}`;

      api
        .post("auth/me")
        .then((response) => {
          const { deseg, pessoa, professor, vigilante } = response.data.data;

          if (deseg) {
            setUser({ pessoa, deseg });
          }

          if (professor) {
            setUser({ pessoa, professor });
          }

          if (vigilante) {
            setUser({ pessoa, vigilante });
          }
        })
        .catch(() => {
          setIsAuthenticated(false);
          Cookies.remove("utfprio.token");
          history.push("/login");
        });
    }
    setLoading(false);
  }, []);

  async function addProfessor(
    { email, password }: SignInCredentials,
    professor: Professor
  ) {
    try {
      await api
        .post("professor", {
          nome_pessoa: professor.nome,
          email,
          tipo_usuario: 0,
          codigo_barra: professor.codigo_barra,
          matricula: professor.matricula,
          permissao_deseg: 1,
          id_departamento: professor.id_departamento,
          senha: password,
        })
        .then(() => {
          signIn({ email, password });
        });
    } catch (error) {}
  }

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("auth/authenticate", {
        email,
        senha: password,
      });

      const token = response.data.token;

      const { deseg, pessoa, professor, vigilante } = response.data;

      if (deseg) {
        setUser({ pessoa, deseg });
      }

      if (professor) {
        setUser({ pessoa, professor });
      }

      if (vigilante) {
        setUser({ pessoa, vigilante });
      }

      setIsAuthenticated(true);

      Cookies.set("utfprio.token", token, { expires: 1 });

      api.defaults.headers["Autorization"] = `Bearer ${token}`;

      history.push("/");
    } catch (error) {
      // erro 401 pode ser login ou senha incorreta
      if (error.response.status === 401) {
        const errorData = error.response.data;

        // No caso de professor não cadastrado, adicionar um novo professor
        if (errorData.retorno === "Professor não cadastrado") {
          addProfessor(
            { email, password },
            {
              id_professor: 0,
              id_departamento: 0,
              nome: errorData.usuario.name,
              codigo_barra: errorData.usuario.barcode + errorData.usuario.digit,
              matricula: errorData.usuario.code,
            }
          );
        }
      }
      setError(error);
    }
  }

  function signOut() {
    setIsAuthenticated(false);
    Cookies.remove("utfprio.token");
    history.push("/login");
  }

  return (
    <AuthContext.Provider
      value={{ signIn, user, isAuthenticated, loading, error, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
