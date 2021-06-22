import { capitalize } from "@material-ui/core";
import { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";

// import { FieldArray, Form, Formik,  } from "formik";

import { useFormik } from 'formik'

import { useHistory } from "react-router";
import { Button } from "../../components/Button/Button";
import { Modal } from "../../components/Modal";
// import { FormBody } from "../../components/Form/FormSection/FormBody";
// import { FormLine } from "../../components/Form/FormSection/FormLine";
// import { FormFooter } from "../../components/Form/FormSection/FormFooter";
// import InputField from "../../components/Form/InputField";

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

// type Values = {
//   props: Array<any>;
// }

const getUsuario = ( usuario: UsuarioProps ) => {
  if (usuario.Pessoa.tipo_usuario === 0) return new Professor(usuario);

}

const getUsuarioPeloTipo = ( tipoUsuario: string ) => {
  let usuario = {
    id_pessoa: 0, 
    matricula: 0, 
    Pessoa: {
      nome_pessoa: "",
      email: "",
      tipo_usuario: 0
    }};

  if (tipoUsuario === "professor") return new Professor(usuario);
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
  
  function abrirCadastro() {
      setViewOnly(false);
      setOpen(true);
  }

  function exibirCadastro( tipo_usuario: number, user: UsuarioProps ) {
      let id = 0;
      if(tipo_usuario === 0) id = user.id_professor?? user.id_pessoa;

      getUsuarioAPI(id);
  }

  async function getUsuarioAPI( id: number ) {
    await api.get(tipoUsuario + "/" + id).then((response:any) => {
      // console.log(response.data[tipoUsuario][0].id_professor);
      for (let prop of getUsuarioPeloTipo(tipoUsuario)?.getFormValues() ?? []) {
        // console.log(prop[0] + " " + response.data[tipoUsuario][0][prop[3]]);
        formik.setFieldValue(prop[0], response.data[tipoUsuario][0]);
      }

      setViewOnly(true);
      setOpen(true);
    });
  }

  const formik = useFormik({
    initialValues: {
      props: [],
    },
    onSubmit: values => {},
  });

  // async function handleSubmit(values: Values) {
  //   //console.log(values); // cadastro de professor não é necessário
  // }

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
        Cadastrar {tipoUsuario}
      </Button>

      <Modal visible={open} close={() => setOpen(false)}>
        <h2>{!viewOnly && "Novo"} {capitalize(tipoUsuario)}</h2>
        <br />

        { tipoUsuario === "professor" ? (
            <h1>Professor não tem cadastro</h1>
          ) : "deseg" ? (
            <DesegForm viewOnly={false} />
          ) : (
            <DesegForm viewOnly={false} />
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