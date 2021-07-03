import { capitalize } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import { RouteComponentProps } from "react-router";

import { useHistory } from "react-router";
import { Button } from "../../components/Button/Button";
import { Modal } from "../../components/Modal";

import { api } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";
import * as S from "../../components/CardList/styles";

import DesegForm from "../../components/Forms/DesegForm";
import ProfessorForm from "../../components/Forms/ProfessorForm";
import VigilanteForm from "../../components/Forms/VigilanteForm";

type UserProps = RouteComponentProps<{tipo:string}>;

type PessoaProps = {
  nome_pessoa: string;
  email: string;
  tipo_usuario: number;
}

type TurnoProps = {
  id_turno: number;
  nome_turno: string;
}

type UsuarioProps = {
  id_pessoa: number;
  id_deseg?: number;
  id_professor?: number;
  id_vigilante?: number;
  matricula: number;
  Pessoa: PessoaProps;
  Turno?: TurnoProps;
}

const CadastroUsuario = (params: UserProps) => {

  const tipoUsuario = params.match.params.tipo;
  const history = useHistory();
  useContext(AuthContext); // caso necessite de token

  const [usuarios, setUsuarios] = useState<UsuarioProps[]>();

  const [open, setOpen] = useState(false);
  const [viewOnly, setViewOnly] = useState(false);
  const [selection, setSelection] = useState(0);
  
  function abrirCadastro() {
    if (tipoUsuario !== "professor") {
      setViewOnly(false);
      setOpen(true);
    }
  }

  function exibirCadastro( tipo_usuario: number, user: UsuarioProps ) {
    let id = 0;
    if(tipo_usuario === 0) id = user.id_professor?? user.id_pessoa;
    if(tipo_usuario === 1) id = user.id_deseg?? user.id_pessoa;
    if(tipo_usuario === 3) id = user.id_vigilante?? user.id_pessoa;

    setSelection(id);
    setViewOnly(true);
    setOpen(true);
  }

  function fecharCadastro() {
    setOpen(false);
    setSelection(0);
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

  return (
    <S.CardsWrapper>
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
              { tipoUsuario === "professor" ? (
                (<div>
                  <span>{el.Pessoa.email}</span>
                  <strong>{el.matricula}</strong>
                </div>)
              ) : "deseg" ? (
                (<div>
                  <span>{el.Pessoa.email}</span>
                  <strong>{el.matricula}</strong>
                </div>)
              ) : (
                (<div>
                  <span>Turno</span>
                  <strong>{el.Turno?.nome_turno}</strong>
                </div>)
              )}
            </div>
          </S.Card>
        ))}
      </div>
      {tipoUsuario !== "professor" && (
        <Button 
          type="button"
          name="criarUsuario"
          onClickFunction={abrirCadastro}>
          Cadastrar {capitalize(tipoUsuario)}
        </Button>
      )}

      <Modal visible={open} close={() => fecharCadastro()}>
        <h2>{!viewOnly && "Novo"} {capitalize(tipoUsuario)}</h2>
        <br />

        { tipoUsuario === "professor" && (
          <ProfessorForm viewOnly={viewOnly} id_usuario={selection} />)}
        { tipoUsuario === "deseg" && (
          <DesegForm viewOnly={viewOnly} id_usuario={selection} />)}
        { tipoUsuario === "vigilante" && (
          <VigilanteForm viewOnly={viewOnly} id_usuario={selection} />)}
      </Modal>
    </S.CardsWrapper>
  );
}

export default CadastroUsuario;