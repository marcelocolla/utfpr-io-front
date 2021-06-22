import { capitalize } from "@material-ui/core";
import { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";

import { useHistory } from "react-router";
import { Button } from "../../components/Button/Button";
import { Modal } from "../../components/Modal";

import Professor from "./model/Professor";

import { api } from "../../services/api";
import * as S from "./styles";

import DesegForm from "../../components/Forms";

// peguei de um livro, não sei como desconstruir
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

const getUsuario = ( usuario: UsuarioProps ) => {
  if (usuario.Pessoa.tipo_usuario === 0) return new Professor(usuario);

}

// const getInfoDeseg = ( deseg: User ) => {
//   return (
//     <div>
//       <span>{deseg.Pessoa.email}</span>
//       <strong>{deseg.matricula}</strong>
//     </div>)
// }

// const getInfoVigilante = ( vigilante: User ) => {
//   return (
//     <div>
//       <span>Turno</span>
//       <strong>{vigilante.Turno?.nome_turno}</strong>
//     </div>)
// }

const CadastroUsuario = (params: UserProps) => {

  const tipoUsuario = params.match.params.tipo;
  const history = useHistory();

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
              {getUsuario(el)?.getShortInfo()}
            </div>
          </S.Card>
        ))}
      </div>
      <Button 
        type="button"
        name="criarUsuario"
        onClickFunction={abrirCadastro}>
        Cadastrar {capitalize(tipoUsuario)}
      </Button>

      <Modal visible={open} close={() => fecharCadastro()}>
        <h2>{!viewOnly && "Novo"} {capitalize(tipoUsuario)}</h2>
        <br />

        { tipoUsuario === "professor" ? (
            <h1>Professor não tem cadastro</h1>
          ) : "deseg" ? (
            <DesegForm viewOnly={viewOnly} id_usuario={selection} />
          ) : (
            <DesegForm viewOnly={viewOnly} id_usuario={selection} />
          )}
        {/* <Formik initialValues={formik.initialValues} onSubmit={handleSubmit}>
          <Form>
            <FormBody>
              <FieldArray name="props">
                {() => (getUsuarioPeloTipo(tipoUsuario)?.getFormValues().map((prop, i) => {
                  return (
                    <FormLine key={i}>
                      <InputField
                        name={prop[0]}
                        type={prop[1]}
                        label={prop[2]}
                        disabled={viewOnly} />
                    </FormLine>
                  )}))}
              </FieldArray>
            </FormBody>
            <FormFooter>
              <Button name="cadastroButton">Cadastrar</Button>
            </FormFooter>
          </Form>
        </Formik> */}
      </Modal>
    </S.UsuarioWrapper>
  );
}

export default CadastroUsuario;