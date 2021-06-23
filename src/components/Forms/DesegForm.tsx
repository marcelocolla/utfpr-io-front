import { useEffect, useState } from "react";
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

type FormProps = {
  viewOnly?: boolean;
  id_usuario?: number;
}

type DesegValues = {
  nome_pessoa: string;
  email: string;
  matricula: string;
  senha?: string;
}

export default function DesegForm( props: FormProps ) {

  const [deseg, setDeseg] = useState<DesegValues>({
    nome_pessoa: "",
    email: "",
    matricula: "",
    senha: ""
  });

  useEffect(() => {
    try {
      if (props.id_usuario !== 0) {
        api.get("deseg/" + props.id_usuario).then((response) => {
          if (response.data.deseg.length !== 0) {
            let getDeseg = response.data.deseg[0];
            setDeseg({
              nome_pessoa: getDeseg.Pessoa.nome_pessoa,
              email: getDeseg.Pessoa.email,
              matricula: getDeseg.matricula
            });
          } 
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [props])

  async function handleSubmit( values: DesegValues ) {
    await api.post("/deseg", {
      nome_pessoa: values.nome_pessoa,
      email: values.email,
      matricula: values.matricula,
      codigo_barra: "02940294",
      tipo_usuario: 1,
      senha: values.senha
    });
    history.go(0);
  }
  
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
    senha: Yup.string().required("Required"),
  });

  return (
    <Formik 
      initialValues={{...deseg}}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize>
      <Form>
        <FormBody>
          <FormLine>
            <InputField name="nome_pessoa" label="Nome" disabled={props.viewOnly}/>
          </FormLine>
          <FormLine>
            <InputField name="email" label="Email" disabled={props.viewOnly}/>
          </FormLine>
          <FormLine>
            <InputField name="matricula" label="Matricula" disabled={props.viewOnly}/>
          </FormLine>
          {!props.viewOnly && (
            <FormLine>
              <PasswordField name="senha" label="Senha" />
          </FormLine>)}
        </FormBody>
        <FormFooter>
          <Button name="cadastroButton">
            {props.viewOnly ? "Atualizar" : "Cadastrar"}
          </Button>
        </FormFooter>
      </Form>
    </Formik>
    )
}