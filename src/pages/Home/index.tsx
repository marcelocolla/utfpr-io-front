import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Form, Formik } from "formik";

import { AxiosResponse } from "axios";

import { api } from "../../services/api";

import { AuthContext } from "../../contexts/AuthContext";

import { Button } from "../../components/Button/Button";

import { MenuItem } from "@material-ui/core";

import { Modal } from "../../components/Modal";
import InputField from "../../components/Form/InputField";
import { FormBody } from "../../components/Form/FormSection/FormBody";
import { FormLine } from "../../components/Form/FormSection/FormLine";
import { FormFooter } from "../../components/Form/FormSection/FormFooter";

import * as S from "./styles";

type Departamento = {
  id_departamento: number;
  nome_departamento: string;
  sigla_departamento: string;
};

const Home = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [openDeseg, setOpenDeseg] = useState(false);
  const [openRelatorio, setRelatorio] = useState(false);
  const [departamentos, setDepartamentos] = useState<Departamento[]>();

  console.log(user);
  initialValues:{

  }
  useEffect(() => {
    try {
      api.get("departamento").then((response: AxiosResponse) => {
        setDepartamentos(response.data.departamentos);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  /// quando selecionar o departamento, enviar requisição
  function handleSubmit() {
    // Envio de dados pro backend
    setOpen(false);
  }

  function relatorioSubmit() {

  }

  function abrirCadastro() {
    setOpenDeseg(true);
  }

  return (
    <S.HomeSection>
      <strong onClick={() => history.goBack()}>Home</strong>

      <S.Content>
        <S.Card>
          <div>
            <img src="Ellipse 2.png" alt="Avatar" />
          </div>
          <strong>{user?.pessoa?.nome_pessoa}</strong>
          <span>
            Matrícula: <strong>{user?.deseg?.matricula}</strong>
          </span>
        </S.Card>

        <S.ButtonWrapper>
          {/* não sei adicionar icone*/}
          {user?.deseg && (
            <Button type="button" name="relatorioButton" onClickFunction={()=>{setRelatorio(true)}} >
              R
            </Button>
          )}
          <Button type="button" name="solicitacoesButton" path="/solicitacoes">
            Solicitações
          </Button>
          {user?.deseg && (
            <Button
              type="button"
              name="cadastroButton"
              onClickFunction={abrirCadastro}
            >
              +
            </Button>
          )}
        </S.ButtonWrapper>
        <Modal visible = {openRelatorio} close = {()=>setRelatorio(false)}>
          <h2>Geração de Relatório</h2>
          <br/>
          <S.VerticalButtonWrapper>
            <Formik
              onSubmit={relatorioSubmit}
              initialValues={{data_inicial:'',data_final:''}}
            >
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
                <Button name="loginButton">
                  Gerar
                </Button>
              </FormBody>
            </Form>

            </Formik>
          </S.VerticalButtonWrapper>
        </Modal>
        <Modal visible={openDeseg} close={() => setOpenDeseg(false)}>
          <h2>Cadastros</h2>
          <br />
          {/* não sei se é a melhor solução, criar um vertical*/}
          <S.VerticalButtonWrapper>
            <Button type="button" name="desegButton" path="/usuarios/deseg">
              DESEG
            </Button>
            <Button
              type="button"
              name="professoresButton"
              path="/usuarios/professor"
            >
              Professores
            </Button>
            <Button
              type="button"
              name="vigilantesButton"
              path="/usuarios/vigilante"
            >
              Vigilantes
            </Button>
          </S.VerticalButtonWrapper>
        </Modal>

        {user?.professor?.id_departamento === 0 && (
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
                  <Button name="loginButton">Confirmar</Button>
                </FormFooter>
              </Form>
            </Formik>
          </Modal>
        )}
      </S.Content>
    </S.HomeSection>
  );
};

export default Home;
