import { useState } from "react";
import { Formik, Form } from "formik";

import { Button } from "../Button/Button";
import InputField from "../Form/InputField";

import { FormBody } from "../Form/FormSection/FormBody";
import { FormLine } from "../Form/FormSection/FormLine";
import { FormFooter } from "../Form/FormSection/FormFooter";

type FormProps = {
  onConfirm?: () => void;
};

type RelatorioProps = {
  data_inicio: string;
  data_final: string;
};

export default function DepartamentoForm(props: FormProps) {
  const [relatorio] = useState<RelatorioProps>({
    data_inicio: "",
    data_final: ""
  });

  // Envio de dados pro backend
  function handleSubmit(values: RelatorioProps) {

  }

  return (
    <Formik 
      onSubmit={handleSubmit}
      initialValues={ relatorio }>
        <Form>
          <FormBody>
            <FormLine>
              <InputField 
                name="data_inicio"
                type="date"
                label="Data Inicial"
              />

              <InputField
                name="data_final"
                type="date"
                label="Data Final"
              />  

            </FormLine>
            <br/>
            <FormFooter mt="3rem">
              <Button name="loginButton">
                Gerar Relatório
              </Button>
            </FormFooter>
          </FormBody>
        </Form>
    </Formik>
  );
}
