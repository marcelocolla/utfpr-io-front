import { useEffect, useState } from "react";
import { Formik, Form } from "formik";

import { Button } from "../Button/Button";
import InputField from "../Form/InputField";

import { FormBody } from "../Form/FormSection/FormBody";
import { FormLine } from "../Form/FormSection/FormLine";
import { FormFooter } from "../Form/FormSection/FormFooter";

import { api } from "../../services/api";
import history from "../../history";

type VisitaValues = {
  data_registro: string;
  hora_registro: string;
  placa_veiculo: string;
  observacoes: string;
};

type LiberacaoValues = {
  id_liberacao: number;
  Aluno: {
    ra_aluno: string;
    Pessoa: {
      nome_pessoa: string;
    };
  };
};

type FormProps = {
  isEntrada: boolean;
  id_liberacao?: number;
  visita?: any;
  vigilante: any;
};

const dataAgora = () => {
  return new Date().toLocaleDateString('fr-CA')
}

const horaAgora = () => {
  return new Date().toLocaleTimeString([],
    {hour: '2-digit', minute:'2-digit', hour12: false})
}

export default function VisitaForm(props: FormProps) {
  const [visita, setVisita] = useState<VisitaValues>({
    data_registro: dataAgora(),
    hora_registro: horaAgora(),
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
    try {
      if (props.isEntrada) {
        // Criar uma visita a partir de uma liberação
        api
          .get("solicitacao/cadastro/" + props.id_liberacao)
          .then((response: any) => {
            setLiberacao(response.data.cadastroSolicitacao.rows[0]);
          });
      } else {
        // Exibir uma visita já existente
        setVisita({
          data_registro: dataAgora(),
          hora_registro: horaAgora(),
          placa_veiculo: props.visita?.placa_veiculo,
          observacoes: props.visita?.observacoes,
        });

        setLiberacao(props.visita?.liberacao);
      }
    } catch (err) {
      console.error(err);
    }
  }, [props]);

  async function registrarEntrada(values: any) {
    await api.post("/visita", {
      data_entrada: values.data_entrada,
      hora_entrada: values.hora_entrada,
      data_saida: null,
      hora_saida: null,
      id_liberacao: values.liberacao.id_liberacao,
      id_vigilante_entrada: values.vigilante.vigilante.id_vigilante,
      id_vigilante_saida: null,
      placa_veiculo: values.placa_veiculo,
      observacoes: values.observacoes,
    });
    history.push("/visitas");
  }

  async function registrarSaida(values: any) {
    await api.put("/visita", {
      id_visita: props.visita?.id_visita,
      data_saida: dataAgora(),
      hora_saida: horaAgora(),
      id_liberacao: values.liberacao.id_liberacao,
      id_vigilante_saida: values.vigilante.vigilante.id_vigilante,
      observacoes: values.observacoes,
    });
    history.go(0);
  }

  return (
    <Formik
      initialValues={{ ...visita, liberacao: liberacao, vigilante: vigilante }}
      onSubmit={props.isEntrada ? registrarEntrada : registrarSaida}
      enableReinitialize
    >
      <Form>
        <FormBody>
          <FormLine>
            <InputField
              name="liberacao.Aluno.Pessoa.nome_pessoa"
              label="Nome do Aluno"
              disabled={true}
            />
          </FormLine>
          <FormLine>
            <InputField
              name="liberacao.Aluno.ra_aluno"
              label="Matrícula"
              disabled={true}
            />
          </FormLine>
          <FormLine>
            <InputField name="data_registro" label="Data" disabled={true} />
            <InputField name="hora_registro" label="Horário" disabled={true} />
          </FormLine>
          <FormLine>
            <InputField
              name="vigilante.pessoa.nome_pessoa"
              label="Vigilante Responsável"
              disabled={true}
            />
          </FormLine>
          <FormLine>
            <InputField
              name="placa_veiculo"
              label="Informe a placa do veículo"
              required
              disabled={!props.isEntrada}
            />
          </FormLine>
          <FormLine>
            <InputField name="observacoes" label="Observações" />
          </FormLine>
        </FormBody>
        <FormFooter mt="3rem">
          <Button name="registroButton">
            Registrar {props.isEntrada ? "Entrada" : "Saída"}
          </Button>
        </FormFooter>
      </Form>
    </Formik>
  );
}
