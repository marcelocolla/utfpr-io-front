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

type User = {
    id_pessoa: number;
    matricula: number;
    Pessoa: Pessoa;
};

const CadastroUsuario = (params: UserProps) => {

    const tipoUsuario = params.match.params.tipo;
    const history = useHistory();

    const [usuarios, setUsuarios] = useState<User[]>();
    
    function abrirCadastro() {
        // abrir modal pra cadastro
    }

    useEffect(() => {
        try {
          api.get(tipoUsuario).then((response) => {
            setUsuarios(response.data[tipoUsuario+"s"]);
          });
        } catch (err) {
          console.error(err);
        }
      }, [tipoUsuario]);
    //console.log(usuarios);

    return (
        <S.UsuarioWrapper>
          <strong onClick={() => history.goBack()}>{capitalize(tipoUsuario)}</strong>
          <br />
          <div className="cardsWrapper">
            {usuarios?.map((el) => (
            <S.Card key={el.id_pessoa}>
                {/* parte esquerda, avatar 
                onClick={() => setOpen(true)}
                */}
                <div className="imageWrapper">
                <img src="/dog.png" alt="foto solicitacao" />
                </div>

                {/* parte direita, infos */}
                <div>
                <h1>{el.Pessoa.nome_pessoa}</h1>
                <div>
                    <span>{el.Pessoa.email}</span>
                    <strong>{el.matricula}</strong>
                </div>
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