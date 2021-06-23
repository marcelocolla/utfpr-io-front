import { useEffect, useState } from "react";
import { Formik, Form } from "formik";

import InputField from '../Form/InputField';

import { FormBody } from '../Form/FormSection/FormBody'
import { FormLine } from '../Form/FormSection/FormLine';

import { api } from "../../services/api";

type FormProps = {
  viewOnly?: boolean;
  id_usuario?: number;
}

type ProfessorValues = {
  nome_pessoa: string;
  email: string;
  matricula: string;
  departamento: string;
}

export default function ProfessorForm( props: FormProps ) {

  const [professor, setProfessor] = useState<ProfessorValues>({
    nome_pessoa: "",
    email: "",
    matricula: "",
    departamento: ""
  });

  useEffect(() => {
    try {
      if (props.id_usuario !== 0) {
        api.get("professor/" + props.id_usuario).then((response) => {
          if (response.data.professor.length !== 0) {
            let getProfessor = response.data.professor[0];

            api.get("departamento/"+getProfessor.id_departamento).then((depResponse) => {
              let getDepartamento = depResponse.data.departamento[0];

              setProfessor({
                nome_pessoa: getProfessor.Pessoa.nome_pessoa,
                email: getProfessor.Pessoa.email,
                matricula: getProfessor.matricula,
                departamento: getDepartamento.sigla_departamento ?? "",
              });
            });
          } 
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [props])

  async function handleSubmit( values: ProfessorValues ) {
    console.log("Deseg não cadastra professor.")
  }

  return (
    <Formik 
      initialValues={{...professor}}
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
          <FormLine>
            <InputField name="departamento" label="Coordenação" disabled={props.viewOnly}/>
          </FormLine>
        </FormBody>
      </Form>
    </Formik>
    )
}