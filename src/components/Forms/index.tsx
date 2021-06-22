import { Formik, Form } from "formik"

import * as Yup from "yup";

import { Button } from "../Button/Button"; 
import InputField from '../Form/InputField';
import PasswordField from "../Form/PasswordField";

import { FormBody } from '../Form/FormSection/FormBody'
import { FormLine } from '../Form/FormSection/FormLine';
import { FormFooter } from '../Form/FormSection/FormFooter';

import { api } from "../../services/api";
import history from "../../history";

type DesegFormProps = {
  viewOnly?: boolean;
}

type DesegValues = {
  nome_pessoa: string;
  email: string;
  matricula: string;
  senha?: string;
}

export default function DesegForm( viewOnly: DesegFormProps ) {

  // useEffect(() => {
  //   api.get(`deseg/${}`)
  // }, [])

  const initialValues: DesegValues = {
    nome_pessoa: "",
    email: "",
    matricula: "",
    senha: ""
  }

  async function handleSubmit( values: DesegValues ) {
    console.log("lá vem o post");
    const response = await api.post("/deseg", {
      nome_pessoa: values.nome_pessoa,
      email: values.email,
      matricula: values.matricula,
      codigo_barra: "02940294",
      tipo_usuario: 1,
      senha: values.senha
    });
    console.log(response);
    history.go(0);
  }
  
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
  });

  return (
    <Formik 
      initialValues={{...initialValues}}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      <Form>
        <FormBody>
          <FormLine>
            <InputField name="nome_pessoa" label="Nome"/>
          </FormLine>
          <FormLine>
            <InputField name="email" label="Email"/>
          </FormLine>
          <FormLine>
            <InputField name="matricula" label="Matricula"/>
          </FormLine>
          {!viewOnly && (
            <FormLine>
              <PasswordField name="senha" label="Senha" />
          </FormLine>)}
        </FormBody>
        <FormFooter>
          <Button name="cadastroButton">
            {viewOnly ? "Atualizar" : "Cadastrar"}
          </Button>
        </FormFooter>
      </Form>
    </Formik>
    )
}