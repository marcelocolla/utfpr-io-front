import { useEffect, useState } from "react";
import { Formik, Form } from "formik"
import { MenuItem } from "@material-ui/core";

import { Button } from "../Button/Button"; 
import InputField from '../Form/InputField';

import { FormBody } from '../Form/FormSection/FormBody'
import { FormLine } from '../Form/FormSection/FormLine';
import { FormFooter } from '../Form/FormSection/FormFooter';

import { api } from "../../services/api";

type FormProps = {
  user?: any;
  onConfirm: () => void;
}

type Departamento = {
  id_departamento: number;
  nome_departamento: string;
  sigla_departamento: string;
};

type DepartamentoValues = {
  departamento: number;
}

export default function DepartamentoForm( props: FormProps ) {

  const [departamentos, setDepartamentos] = useState<Departamento[]>();
  const [departamento, ] = useState<DepartamentoValues>({
    departamento: 0,
  })

  useEffect(() => {
    try {
      api.get("departamento").then((response:any) => {
        setDepartamentos(response.data.departamento);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Envio de dados pro backend: atualizar o professor
  async function handleSubmit( values: DepartamentoValues ) {
    try {
      api.put("professor", {
        id_pessoa: props.user?.id_pessoa,
        id_professor: props.user?.professor?.id_professor,
        nome_pessoa: props.user?.nome,
        email: props.user?.email,
        id_departamento: values.departamento,
      })
        .then((response) => {
          props.onConfirm();
      }); 
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ ...departamento, departamentos: departamentos }}
      enableReinitialize
    >
      <Form>
        <FormBody>
          <FormLine mt="1rem">
            <InputField name="departamento" label="Coordenação" select>
              {departamentos?.map((dep) => (
                <MenuItem
                  key={dep.id_departamento}
                  value={dep.id_departamento}
                >
                  {dep.sigla_departamento}
                </MenuItem>
              ))}
            </InputField>
          </FormLine>
        </FormBody>
        <FormFooter mt="3rem">
          <Button name="departamentoButton" mw="315px">
            Confirmar
          </Button>
        </FormFooter>
      </Form>
    </Formik>
    )
}