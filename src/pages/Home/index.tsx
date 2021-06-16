import { useContext, useEffect } from "react";
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
import { api } from "../../services/api";

type Departamento = {
  id_departamento: number;
  nome_departamento: string;
  sigla_departamento: string;
};

const Home = () => {
  const history = useHistory();
  const [open, setOpen] = useState(true); // default seria false
  const { user } = useContext(AuthContext);
  const [departamentos, setDepartamentos] = useState<Departamento[]>();

  useEffect(() => {
    try {
      api.get("departamento").then((response) => {
        setDepartamentos(response.data.departamentos);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  console.log(departamentos);

  /// se 'dados' for professor e não tiver departamento, abrir modal

  /// quando selecionar o departamento, enviar requisição
  function handleSubmit() {
    // Envio de dados pro backend
    setOpen(false);
  }

  return (
    <S.HomeSection>
      <strong onClick={() => history.goBack()}>Home</strong>

      <S.Content>
        <S.Card>
          <div>
            <img src="Ellipse 2.png" alt="Avatar" />
          </div>
          <strong>{user?.nome}</strong>
          <span>
            Matrícula: <strong>{user?.deseg?.matricula}</strong>
          </span>
        </S.Card>

        <S.ButtonWrapper>
          <Button type="button" name="solicitacoesButton" path="/solicitacoes">
            Solicitações
          </Button>
        </S.ButtonWrapper>

        {/* {user?.professor?.id_departamento === 0 && ( */}
        <Modal visible={open}>
          <h2>Professor, por favor selecione seu departamento.</h2>
          <br />
          <Formik
            onSubmit={handleSubmit}
            initialValues={{ departamentos: departamentos }}
          >
            <Form>
              <FormBody>
                <FormLine mt="1rem">
                  <InputField name="departamento" label="Departamento" select>
                    {departamentos?.map((dep) => (
                      //validar o value, o que tiver nele, seja id, sigla ou nome é o que vai ser mandado pro backend
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
                <Button name="loginButton" mw="315px">
                  Confirmar
                </Button>
              </FormFooter>
            </Form>
          </Formik>
        </Modal>
        {/* )} */}
      </S.Content>
    </S.HomeSection>
  );
};

export default Home;
