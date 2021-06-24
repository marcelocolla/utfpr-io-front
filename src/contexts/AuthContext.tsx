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

type Deseg = {
  id_deseg: number;
  matricula: number;
};

type Professor = {
  id_professor: number;
  nome: string;
  matricula: string;
  codigo_barra: string;
  id_departamento: number;
}

type User = {
  nome: string;
  email: string;
  id_pessoa: number;
  tipo_usuario: number;
  deseg: Deseg;
  professor: Professor;
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

  async function addProfessor({email, password}: SignInCredentials, professor: Professor) {
    try {
      await api.post("professor", {
        nome_pessoa: professor.nome,
        email,
        tipo_usuario: 0,
        codigo_barra: professor.codigo_barra,
        matricula: professor.matricula,
        permissao_deseg: 1,
        id_departamento: professor.id_departamento,
        senha: password
      })
        .then((response) => {
          signIn({email, password});
      }); 
    } catch (error) {
      console.log(error);
    }
  }

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("auth/authenticate", {
        email,
        senha: password,
      });

      setIsAuthenticated(true);
      const token = response.data.token;
      const { nome_pessoa, id_pessoa, tipo_usuario } = response.data.pessoa;

      // ammbos os perfis Deseg e Professor tem uma prop "matricula"
      const { matricula } = ('deseg' in response.data)
        ? response.data?.deseg :
        (('professor' in response.data) ? response.data?.professor : { matricula: 0 });
      
      const { id_deseg } = ('deseg' in response.data)
        ? response.data?.deseg
        : { id_deseg: 0 };

      const { id_professor, id_departamento } = ('professor' in response.data)
        ? response.data?.professor
        : { id_professor: 0, id_departamento: "" };

      Cookies.set("utfprio.token", token, { expires: 1 });
      api.defaults.headers["Autorization"] = `Bearer ${token}`;

      setUser({
        email,
        nome: nome_pessoa,
        id_pessoa: id_pessoa,
        tipo_usuario: tipo_usuario,
        deseg: {
          id_deseg: id_deseg,
          matricula: matricula,
        },
        professor: {
          id_professor: id_professor,
          id_departamento: id_departamento,
          matricula: matricula,
          nome: nome_pessoa,
          codigo_barra: "0",
        }
      });

      history.push("/");
    } catch (error) {
      // erro 401 pode ser login ou senha incorreta
      console.log(error);
      if (error.response.status === 401) {
        let errorData = error.response.data;

        // No caso de professor não cadastrado, adicionar um novo professor
        if (errorData.retorno === "Professor não cadastrado") {
          addProfessor(
            {email, password},
            {
              id_professor: 0,
              id_departamento: 0,
              nome: errorData.usuario.name,
              codigo_barra: errorData.usuario.barcode + errorData.usuario.digit,
              matricula: errorData.usuario.code,
            }
          )          
        }
      } 
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, user, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
