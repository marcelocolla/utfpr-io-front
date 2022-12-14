import { capitalize } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import { RouteComponentProps } from "react-router";

import { Button } from "../../components/Button/Button";
import { Modal } from "../../components/Modal";
import { Header } from "../../components/Header/Header";
import { Card } from "../../components/Card";
import { CardsWrapper } from "../../components/Card/styles";

import DesegForm from "../../components/Forms/DesegForm";
import ProfessorForm from "../../components/Forms/ProfessorForm";
import VigilanteForm from "../../components/Forms/VigilanteForm";

import { api } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

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
    <CardsWrapper>
      <Header header={capitalize(tipoUsuario)} />
      <div className="cardsWrapper">
        {usuarios?.map((el) => (
          <Card 
            key={el.id_pessoa}
            name={el.Pessoa.nome_pessoa}
            leftInfo={(tipoUsuario === "vigilante") ?
              "Turno" : el.Pessoa.email}
            rightInfo={(tipoUsuario === "vigilante") ?
              (el.Turno ? el.Turno.nome_turno : "") : ""}
            removeDisabled={tipoUsuario === "professor"}
            onEdition={() => exibirCadastro(el.Pessoa.tipo_usuario, el)}/>
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

      <Modal
        visible={open}
        close={() => fecharCadastro()}
        title={(!viewOnly ? "Novo " : "") + capitalize(tipoUsuario)}>
          { tipoUsuario === "professor" && (
            <ProfessorForm viewOnly={viewOnly} id_usuario={selection} />)}
          { tipoUsuario === "deseg" && (
            <DesegForm viewOnly={viewOnly} id_usuario={selection} />)}
          { tipoUsuario === "vigilante" && (
            <VigilanteForm viewOnly={viewOnly} id_usuario={selection} />)}
      </Modal>
    </CardsWrapper>
  );
}

export default CadastroUsuario;