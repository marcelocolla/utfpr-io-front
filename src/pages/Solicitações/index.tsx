import { Form, Formik } from "formik";
import { useState } from "react";
import { useHistory } from "react-router";
import { FormBody } from "../../components/Form/FormSection/FormBody";
import { FormLine } from "../../components/Form/FormSection/FormLine";
import InputField from "../../components/Form/InputField";
import PasswordField from "../../components/Form/PasswordField";

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

  function handleSubmit() {
    return;
  }

  return (
    <S.SolicitacoesWrapper>
      <strong onClick={() => history.goBack()}>Solicitações</strong>

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

      <Modal visible={open} close={() => setOpen(false)}>
        <h2>Solicitação</h2>
        <br />
        <Formik onSubmit={handleSubmit} initialValues={{}}>
          <Form>
            <FormBody>
              <FormLine>
                <InputField name="codigo" label="Código" />
              </FormLine>
              <FormLine>
                <PasswordField name="senha" label="senha" />
              </FormLine>
            </FormBody>
          </Form>
        </Formik>
      </Modal>
    </S.SolicitacoesWrapper>
  );
};

export default Solicitacoes;
