import { useState } from "react";
import { Formik, Form } from "formik";
import InputField from "../../components/Form/InputField";
import { Button } from "../Button/Button";
import { FormBody } from "../Form/FormSection/FormBody";
import { FormLine } from "../Form/FormSection/FormLine";
import { FormFooter } from "../Form/FormSection/FormFooter";
import { FormLabel } from '@material-ui/core';

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
      initialValues={relatorio}>
      <Form>
        <FormBody>
          <FormLine>
            <FormBody>
              <FormLabel>Data Inicio</FormLabel>
              <InputField
                name="data_inicio"
                type="date"
              />
            </FormBody>
            <FormBody>
              <FormLabel>Data Fim</FormLabel>
              <InputField
                name="data_final"
                type="date"
              />
            </FormBody>
          </FormLine>
          <br />
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
