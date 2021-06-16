import { useContext } from "react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

import { Button } from "../../components/Button/Button";

import { FormBody } from "../../components/Form/FormSection/FormBody";
import { FormLine } from "../../components/Form/FormSection/FormLine";
import { FormFooter } from "../../components/Form/FormSection/FormFooter";
import { Modal } from "../../components/Modal";
import InputField from "../../components/Form/InputField";
import { MenuItem } from "@material-ui/core";

import * as S from "./styles";

const dados = {
  id: 0,
  nome: "Roberto Adalberto Nunes",
  matricula: 1231234,
  escopoPerfil: "deseg",
};

// receber do backend
const mock = [
  {
    id: 1,
    text: "COENS",
  },
  {
    id: 2,
    text: "COZOO",
  },
];

const initialValues = {
  departamento: mock[0].text,
};

const Home = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(true); // default seria false
  const history = useHistory();
  console.log({ dados });

  /// se 'dados' for professor e não tiver departamento, abrir modal

  /// quando selecionar o departamento, enviar requisição
  function handleSubmit() {
    return;
  }

  return (
    <S.HomeSection>
      <strong onClick={() => history.goBack()}>Home</strong>

      <div className="content">
        <div className="card">
          <div>
            <img src="Ellipse 2.png" alt="Avatar" />
          </div>
          <strong>{user?.email}</strong>
          <span>
            Matrícula: <strong>{dados.matricula}</strong>
          </span>
        </div>

        <Button type="button" name="solicitacoesButton" path="/solicitacoes">
          Solicitações
        </Button>

        <Modal visible={open} close={() => setOpen(false)}>
          <h2>Professor, por favor selecione seu departamento.</h2>
          <br />
          <Formik onSubmit={handleSubmit} initialValues={{ ...initialValues }}>
            <Form>
              <FormBody>
                <FormLine>
                  <InputField name="departamento" label="Departamento" select>
                    {mock?.map((item) => (
                      <MenuItem key={item.id} value={item.text}>
                        {item.text}
                      </MenuItem>
                    ))}
                  </InputField>
                </FormLine>
              </FormBody>
              <FormFooter>
                <Button name="loginButton">Confirmar</Button>
              </FormFooter>
            </Form>
          </Formik>
        </Modal>
      </div>
    </S.HomeSection>
  );
};

export default Home;
