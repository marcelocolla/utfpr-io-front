import { useEffect, useState } from "react";
import { Formik, Form } from "formik"
import { MenuItem } from "@material-ui/core";

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

type TurnoValues = {
  id_turno: number;
  nome_turno: string;
}

type VigilanteValues = {
  nome_pessoa: string;
  email: string;
  matricula: string;
  turno: number;
  senha?: string;
}

export default function VigilanteForm( props: FormProps ) {

  const [turnos, setTurnos] = useState<TurnoValues[]>();
  const [vigilante, setVigilante] = useState<VigilanteValues>({
    nome_pessoa: "",
    email: "",
    matricula: "",
    turno: 1,
    senha: ""
  });

  useEffect(() => {
    // Passo 1: recuperar todos os turnos
    try {
      api.get("turno").then((response:any) => {
        setTurnos(response.data.turno);
      });
    } catch (err) {
      console.error(err);
    }

    // Passo 2: popular informações do vigilante
    try {
      if (props.id_usuario !== 0) {
        api.get("vigilante/" + props.id_usuario).then((response) => {
          if (response.data.vigilante.length !== 0) {
            let getVigilante = response.data.vigilante[0];

            setVigilante({
              nome_pessoa: getVigilante.Pessoa.nome_pessoa,
              email: getVigilante.Pessoa.email,
              matricula: getVigilante.matricula,
              turno: getVigilante.id_turno,
            });
          } 
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [props])

  async function handleSubmit( values: VigilanteValues ) {
    console.log(values);
    // await api.post("/vigilante", {
    //   nome_pessoa: values.nome_pessoa,
    //   email: values.email,
    //   matricula: values.matricula,
    //   codigo_barra: "02940294",
    //   tipo_usuario: 1,
    //   senha: values.senha
    // });
    history.go(0);
  }
  
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <Formik 
      initialValues={{...vigilante, turnos: turnos}}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize>
      <Form>
        <FormBody>
          <FormLine>
            <InputField name="nome_pessoa" label="Nome" disabled={props.viewOnly}/>
          </FormLine>
          <FormLine>
            <InputField name="matricula" label="Matricula" disabled={props.viewOnly}/>
          </FormLine>
          <FormLine mt="1rem">
            <InputField name="turno" label="Turno" select disabled={props.viewOnly}>
              {turnos?.map((turno) => (
                <MenuItem
                  key={turno.id_turno}
                  value={turno.id_turno}>
                  {turno.nome_turno}
                </MenuItem>
              ))}
            </InputField>
          </FormLine>
          <FormLine>
            <InputField name="email" label="Email" disabled={props.viewOnly}/>
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