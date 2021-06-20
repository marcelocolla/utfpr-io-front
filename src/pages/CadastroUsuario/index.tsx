import { capitalize } from "@material-ui/core";
import { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";

import { useHistory } from "react-router";
import { Button } from "../../components/Button/Button";

import { api } from "../../services/api";
import * as S from "./styles";

// peguei de um livro, não sei como desconstruir
type UserProps = RouteComponentProps<{tipo:string}>;

type Pessoa = {
    nome_pessoa: string;
    email: string;
    tipo_usuario: number;
}

type Turno = {
  id_turno: number;
  nome_turno: string;
}

type User = {
    id_pessoa: number;
    id_professor?: number;
    id_vigilante?: number;
    id_deseg?: number;
    matricula: number;
    Pessoa: Pessoa;
    Turno?: Turno;
};

// deve ter algum Design Pattern que trata isso
const getInfoProfessor = ( professor: User ) => {
    return (
      <div>
        <span>{professor.Pessoa.email}</span>
        <strong></strong>
      </div>)
}

const getInfoDeseg = ( deseg: User ) => {
  return (
    <div>
      <span>{deseg.Pessoa.email}</span>
      <strong>{deseg.matricula}</strong>
    </div>)
}

const getInfoVigilante = ( vigilante: User ) => {
  return (
    <div>
      <span>Turno</span>
      <strong>{vigilante.Turno?.nome_turno}</strong>
    </div>)
}

const CadastroUsuario = (params: UserProps) => {

    const tipoUsuario = params.match.params.tipo;
    const history = useHistory();

    const [usuarios, setUsuarios] = useState<User[]>();
    
    function abrirCadastro() {
        // abrir modal pra cadastro
    }

    function exibirCadastro( tipo_usuario: number, user: User ) {
        // abrir modal para exibição
    }

    useEffect(() => {
        try {
          api.get(tipoUsuario).then((response) => {
            setUsuarios(response.data[tipoUsuario]);
          });
        } catch (err) {
          console.error(err);
        }
      }, [tipoUsuario]);
    console.log(usuarios);

    return (
        <S.UsuarioWrapper>
          <strong onClick={() => history.goBack()}>{capitalize(tipoUsuario)}</strong>
          <br />
          <div className="cardsWrapper">
            {usuarios?.map((el) => (
            <S.Card 
              key={el.id_pessoa} 
              onClick={() => exibirCadastro(el.Pessoa.tipo_usuario, el)}>
                {/* parte esquerda, avatar */}
                <div className="imageWrapper">
                <img src="/dog.png" alt="foto solicitacao" />
                </div>

                {/* parte direita, informações gerais */}
                <div>
                <h1>{el.Pessoa.nome_pessoa}</h1>
                  {el.id_vigilante && (getInfoVigilante(el))}
                  {el.id_professor && (getInfoProfessor(el))}
                  {el.id_deseg && (getInfoDeseg(el))}
                </div>
            </S.Card>
            ))}
          </div>
          <Button 
            type="button"
            name="criarUsuario"
            onClickFunction={abrirCadastro}>
            Cadastrar {tipoUsuario}
          </Button>
        </S.UsuarioWrapper>
      );

}

export default CadastroUsuario;