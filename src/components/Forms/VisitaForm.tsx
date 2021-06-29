import { useEffect, useState } from "react";
import { Formik, Form } from "formik"

import { Button } from "../Button/Button"; 
import InputField from '../Form/InputField';

import { FormBody } from '../Form/FormSection/FormBody'
import { FormLine } from '../Form/FormSection/FormLine';
import { FormFooter } from '../Form/FormSection/FormFooter';

import { api } from "../../services/api";

type VisitaValues = {
  data_entrada: string;
  hora_entrada: string;
  data_saida: string;
  hora_saida: string;
  id_solicitacao: number;
  id_vigilante_entrada: number;
  id_vigilante_saida: number;
  observacoes: string;
}
// POST:
// {
//   "data_entrada": "2021-06-12",
//   "hora_entrada": "12:00",
//   "data_saida": "2021-06-12",
//   "hora_saida": "17:00",
//   "id_solicitacao": 338,
//   "id_vigilante_entrada": 43,
//   "id_vigilante_saida": 43,
//   "observacoes": "O aluno esqueceu o documento de identidade"
// }

type PessoaValues = {
  nome_pessoa: string;
}

type AlunoValues = {
  ra_aluno: string;
  Pessoa: PessoaValues;
}

type LiberacaoValues = {
  id_cadastro_solicitacao: number;
  Aluno: AlunoValues;
}

type FormProps = {
  viewOnly: boolean;
  id_liberacao?: number;
  visita?: string;
  vigilante: any;
}

export default function VisitaForm( props: FormProps ) {

  const [visita, setVisita] = useState<VisitaValues>({
    data_entrada: new Date().toLocaleDateString('fr-CA'),
    hora_entrada: new Date().toLocaleTimeString([],
      {hour: '2-digit', minute:'2-digit', hour12: false}),
    data_saida: "",
    hora_saida: "",
    id_solicitacao: 0,
    id_vigilante_entrada: 0,
    id_vigilante_saida: 0,
    observacoes: "",
  });
  const [liberacao, setLiberacao] = useState<LiberacaoValues>({
    id_cadastro_solicitacao: 0,
    Aluno: {
      ra_aluno: "",
      Pessoa: {
        nome_pessoa: "",
      },
    },
  });

  useEffect(() => {
    // Criar uma visita a partir de uma liberação
    if (props.id_liberacao) {
      try {
        api.get("solicitacao/cadastro/"+props.id_liberacao)
          .then((response:any) => {
            setLiberacao(response.data.cadastroSolicitacao.rows[0]);
        });
      } catch (err) {
        console.error(err);
      }
    }

    // Receber dados de uma visita para edição
  }, [props])


  async function handleSubmit( values: VisitaValues ) {
    // await api.post("/vigilante", {
    //   nome_pessoa: values.nome_pessoa,
    //   email: values.email,
    //   matricula: values.matricula,
    //   tipo_usuario: 3,
    //   id_turno: values.turno,
    //   senha: values.senha
    // });
    // history.go(0);
  }

  return (
    <Formik 
      initialValues={{ ...visita, liberacao: liberacao }}
      onSubmit={handleSubmit}
      enableReinitialize>
      <Form>
        <FormBody>
          <FormLine>
            <InputField
              name="liberacao.Aluno.Pessoa.nome_pessoa"
              label="Nome do Aluno" disabled={true}/>
          </FormLine>
          <FormLine>
            <InputField
              name="liberacao.Aluno.ra_aluno"
              label="Matrícula" disabled={true}/>
          </FormLine>
          <FormLine>
            <InputField
              name="data_entrada"
              label="Data"
              disabled={true}/>
            <InputField
              name="hora_entrada"
              label="Horário" disabled={true}/>
          </FormLine>
          <FormLine>
            <InputField
              name="observacoes"
              label="Vigilante Responsável" disabled={true}/>
          </FormLine>
          <FormLine>
            <InputField
              name="observacoes"
              label="Observações"
              helperText="Informe a placa do veículo, etc." />
          </FormLine>
        </FormBody>
        <FormFooter>
          <Button name="registroButton">
            Registrar {props.viewOnly ? "Saída" : "Entrada"}
          </Button>
        </FormFooter>
      </Form>
    </Formik>
    )
}