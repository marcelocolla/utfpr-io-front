import { useState } from "react";
import { useHistory } from "react-router";

import { Form, Formik } from "formik";

import { Button } from "../../components/Button/Button";
import InputField from "../../components/Form/InputField";
import { FormBody } from "../../components/Form/FormSection/FormBody";
import { FormLine } from "../../components/Form/FormSection/FormLine";
import { FormFooter } from "../../components/Form/FormSection/FormFooter";

import { Modal } from "../../components/Modal";

import * as S from "./styles";

const mock = [
  {
    id: 0,
    nome: "Pedro Carlos",
    dataEntrada: "20/04",
    dataSaida: "21/04",
  },
  {
    id: 1,
    nome: "Gustavo Santos",
    dataEntrada: "25/04",
    dataSaida: "25/04",
  },
  {
    id: 2,
    nome: "Yuri Rodrigues",
    dataEntrada: "26/04",
    dataSaida: "26/04",
  },
  {
    id: 3,
    nome: "Alexandro",
    dataEntrada: "27/04",
    dataSaida: "26/06",
  },
  {
    id: 4,
    nome: "Matheus Silva",
    dataEntrada: "27/04",
    dataSaida: "26/06",
  },
];

const Solicitacoes = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const initialValues = {
    ra: "",
    email: "",
    nome: "",
    dataInicio: "",
    dataFim: "",
    local: "",
  };

  function handleSubmit() {
    return;
  }

  return (
    <S.SolicitacoesWrapper>
      <strong onClick={() => history.goBack()}>Solicitações</strong>
      <div>
        <select className="cardsWrapper" id="cbSolicitacoes">
          <option>Pendentes de Permissao</option>
          <option>Canceladas</option>
          <option>Em Execução</option>
        </select>
      </div>
      <br />
      <div className="cardsWrapper">
        <div className="cardsWrapper">
          {mock.map((el) => (
            <S.Card key={el.id} onClick={() => setOpen(true)}>
              {/* parte esquerda, avatar */}
              <div className="imageWrapper">
                <img src="/dog.png" alt="foto solicitacao" />
              </div>

              {/* parte direita, infos */}
              <div>
                <h1>{el.nome}</h1>
                <div>
                  <span>{el.dataEntrada}</span>
                  <strong>{el.dataSaida}</strong>
                </div>
              </div>
            </S.Card>
          ))}
        </div>
        <Button
          type="button"
          name="criarSolicitacao"
          path="/cadastro_solicitacao"
        >
          Criar Solicitação
        </Button>
      </div>

      <Modal visible={open} close={() => setOpen(false)}>
        <h2>Solicitação</h2>
        <br />
        <Formik onSubmit={handleSubmit} initialValues={{ ...initialValues }}>
          <Form>
            <FormBody>
              <FormLine>
                <InputField name="ra_aluno" label="RA" />
              </FormLine>
              <FormLine>
                <InputField name="email" type="email" label="Email" />
              </FormLine>
              <FormLine>
                <InputField name="nome" label="Nome" />
              </FormLine>
              <FormLine>
                <InputField
                  name="data_inicio"
                  type="date"
                  label="Data Inicial"
                />
              </FormLine>
              <FormLine>
                <InputField name="data_fim" type="date" label="Data Final" />
              </FormLine>
              <FormLine>
                <InputField name="local" label="Local" />
              </FormLine>
            </FormBody>
            <FormFooter>
              <Button name="loginButton">Salvar</Button>
            </FormFooter>
          </Form>
        </Formik>
      </Modal>
    </S.SolicitacoesWrapper>
  );
};

export default Solicitacoes;
