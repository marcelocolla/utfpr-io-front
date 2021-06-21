import { useCallback, useState } from "react";

import { Formik, Form } from "formik"

import * as Yup from "yup";

import { Button } from "../Button/Button"; 
import InputField from '../Form/InputField';
import PasswordField from "../Form/PasswordField";

import { FormBody } from '../Form/FormSection/FormBody'
import { FormLine } from '../Form/FormSection/FormLine';
import { FormFooter } from '../Form/FormSection/FormFooter';

import { api } from "../../services/api";

type DesegFormProps = {
  viewOnly?: boolean;
}

export default function DesegForm(viewOnly: DesegFormProps) {
  const [profile, ,] = useState();

  // useEffect(() => {
  //   api.get(`deseg/${}`)
  // }, [])

  const initialValues = viewOnly 
    ? {
        initialValues: profile,
      } 
    : {}

  
  const handleSubmit = useCallback(
    (values, formik) => {
      try {
        api.post('/vigilante', {
          data: {
            nome: values.nome,
            matricula: values.matricula,
            departamento: values.departamento,
            email: values.email,
            senha: values.senha
          }
        }).then(response => console.log(response))

        formik.resetForm()
        formik.setSubmitting(false)
      } catch (err) {
        console.log(err)
      }
    },
    []
  )
  
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

return (
  <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
    <Form>
      <FormBody>
        <FormLine>
          <InputField
            name="nome"
            label="Nome"
          />
        </FormLine>
        <FormLine>
          <InputField
            name="matricula"
            label="Matricula"
          />
        </FormLine>
        <FormLine>
          <InputField
            name="departamento"
            label="Departamento"
          />
        </FormLine>
        <FormLine>
          <InputField
            name="email"
            label="Email"
          />
        </FormLine>
        <FormLine>
          <PasswordField name="senha" label="Senha" />
        </FormLine>
      </FormBody>
      <FormFooter>
        <Button type="submit" name="cadastroButton">Cadastrar</Button>
      </FormFooter>
    </Form>
  </Formik>
  )
}