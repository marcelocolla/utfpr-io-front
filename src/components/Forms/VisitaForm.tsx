import { useEffect, useState } from "react";
import { Formik, Form } from "formik"

import { Button } from "../Button/Button"; 
import InputField from '../Form/InputField';

import { FormBody } from '../Form/FormSection/FormBody'
import { FormLine } from '../Form/FormSection/FormLine';
import { FormFooter } from '../Form/FormSection/FormFooter';

import { api } from "../../services/api";
import history from "../../history";

type VisitaValues = {
  data_entrada: string;
  hora_entrada: string;
  data_saida: string;
  hora_saida: string;
  id_liberacao: number;
  id_vigilante_entrada: number;
  id_vigilante_saida: number;
  placa_veiculo: string;
  observacoes: string;
}

type LiberacaoValues = {
  id_liberacao: number;
  Aluno: {
    ra_aluno: string;
    Pessoa: {
      nome_pessoa: string;
    }
  };
}

type FormProps = {
  isEntrada: boolean;
  id_liberacao?: number;
  id_visita?: string;
  vigilante: any;
}

export default function VisitaForm( props: FormProps ) {

  const [visita, setVisita] = useState<VisitaValues>({
    data_entrada: new Date().toLocaleDateString('fr-CA'),
    hora_entrada: new Date().toLocaleTimeString([],
      {hour: '2-digit', minute:'2-digit', hour12: false}),
    data_saida: "",
    hora_saida: "",
    id_liberacao: 0,
    id_vigilante_entrada: 0,
    id_vigilante_saida: 0,
    placa_veiculo: "",
    observacoes: "",
  });

  const [liberacao, setLiberacao] = useState<LiberacaoValues>({
    id_liberacao: 0,
    Aluno: {
      ra_aluno: "",
      Pessoa: {
        nome_pessoa: "",
      },
    },
  });

  const vigilante = props.vigilante;

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


  async function registrarEntrada( values: any ) {
    await api.post("/visita", {
      data_entrada: values.data_entrada,
      hora_entrada: values.hora_entrada,
      data_saida: null,
      hora_saida: null,
      id_liberacao: values.liberacao.id_liberacao,
      id_vigilante_entrada: values.vigilante.vigilante.id_vigilante,
      id_vigilante_saida: 0,
      placa_veiculo: values.placa_veiculo,
      observacoes: values.observacoes
    });
    history.go(0); 
  }

  async function registrarSaida( values: any ) {
//     PUT:
// {
//     "id_visita": 10,
//   "data_saida": "2021-06-12",
//   "hora_saida": "17:50",
//   "id_vigilante_saida": 43,
//   "observacoes": "Aluno encontrou documento"
// }
  }

  return (
    <Formik 
      initialValues={{ ...visita, liberacao: liberacao, vigilante: vigilante }}
      onSubmit={props.isEntrada ? registrarEntrada : registrarSaida}
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
              name="vigilante.pessoa.nome_pessoa"
              label="Vigilante Responsável" disabled={true}/>
          </FormLine>
          <FormLine>
            <InputField
              name="placa_veiculo"
              label="Informe a placa do veículo"
              required />
          </FormLine>
          <FormLine>
            <InputField
              name="observacoes"
              label="Observações"/>
          </FormLine>
        </FormBody>
        <FormFooter mt="3rem">
          <Button name="registroButton">
            Registrar {props.isEntrada ? "Entrada" : "Saída"}
          </Button>
        </FormFooter>
      </Form>
    </Formik>
    )
}