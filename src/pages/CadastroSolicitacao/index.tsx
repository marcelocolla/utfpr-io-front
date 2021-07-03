import { Form, Formik, Field } from "formik";

import { Button } from "../../components/Button/Button";
import InputField from "../../components/Form/InputField";
import { FormBody } from "../../components/Form/FormSection/FormBody";
import { FormLine } from "../../components/Form/FormSection/FormLine";
import { FormFooter } from "../../components/Form/FormSection/FormFooter";
import { FormLabel } from '@material-ui/core';
import { api } from "../../services/api";

import * as S from "./styles";

type Values = {
  ra_aluno: string;
  email: string;
  nome: string;
  data_inicio: string;
  data_fim: string;
  local: string;
};

type Pessoa = {
  codigo_barra: string;
  email: string;
  nome_pessoa: string;
  tipo_usuario: Number;
  id_pessoa: Number;
};

type GetAluno = {
  id_aluno: number;
  id_pessoa: number;
  ra_aluno: string;
  Pessoa: Pessoa;
};

type GetProfessor = {
  id_professor: number;
  id_pessoa: number;
  id_departametno: number;
  matricula: string;
  permissao_deseg: number;
  senha: string;
  Pessoa: Pessoa;
};

type GetDeseg = {
  id_deseg: number;
  id_pessoa: number;
  matricula: string;
  senha: string;
  Pessoa: Pessoa;
};

const cadastroSolicitacao = () => {
  let tipo_pessoa = 0;
  let codigo_pessoa = 91;

  const professor = (id: number) => {
    return api.get(`https://utf-io-staging.herokuapp.com/professor/${id}`) ;
  };

  const deseg = (id: number) => {
    return api.get(`https://utf-io-staging.herokuapp.com/deseg/${id}`);
  };
  async function handleSubmit(values: Values) {
    if (tipo_pessoa === 1) {
      deseg(2).then((dados) => {
        if (dados.data.deseg.length === 0) {
          alert("Deseg não encontrado!");
        } else {
          dados.data.deseg.forEach((item: GetDeseg) => {
            var newArray = [];

            newArray.push({
              id_pessoa_cadastro: item.id_pessoa,
              ra_aluno: values.ra_aluno,
              email: values.email,
              nome: values.nome,
              data_inicio: values.data_inicio,
              data_fim: values.data_fim,
              local_visitado:values.local,
              permissao_acesso: 1,
              id_pessoa_permitiu: item.id_pessoa,
            });
            console.log(newArray);
          });
        }
      });
    } else {
      professor(codigo_pessoa).then((dados) => {
        if (dados.data.professor.length === 0) {
          console.log(dados.data.professor);
          alert("Professor não encontrado!");
        } else {
          console.log(dados.data);
          dados.data.professor.forEach((item: GetProfessor) => {
            const newArray = [];

            if (item.permissao_deseg === 1) {
              newArray.push({
                id_aluno: null,
                ra_aluno: values.ra_aluno,
                email: values.email,
                nome: values.nome,
                id_pessoa_cadastro: item.id_pessoa,
                id_pessoa_permitiu: item.id_pessoa,
                data_permissao: null,
                hora_permissao: null,
                data_inicio: values.data_inicio,
                data_fim: values.data_fim,
                permissao_acesso: 1,
                local_visitado:values.local
              });
            } else {
              newArray.push({
                data_inicio: values.data_inicio,
                data_fim: values.data_fim,
                permissao_acesso: 0,
                data_permissao: null,
                hora_permissao: null,
                id_pessoa_cadastro: item.id_pessoa,
                id_pessoa_permitiu: null,
                id_aluno: null,
                nome: values.nome,
                ra_aluno: values.ra_aluno,
                email: values.email,
                codigo_barra:null,
                tipo_usuario:2,
                local_visitado:values.local
              });
            }
            newArray.forEach((enviarSolicitacao) => {
              const params: RequestInit = {
                method: "POST",
                headers:{
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(enviarSolicitacao),
              };
              console.log(JSON.stringify(enviarSolicitacao));
              fetch(
                "https://utf-io-staging.herokuapp.com/solicitacao/cadastro",
                params
              ).then(function (response) {
           //   api.post("solicitacao/cadastro",enviarSolicitacao).then(function (response) {
                if (response.status !== 200) {
                  alert("Dados não gerado, falar com o suporte!");
                } else {
                  window.history.back();
                }
              });
            });
          });
        }
      });
    }
  }

  async function handleBlur(ev: any, setFieldValue: any, setSubmitting: any) {
    const { value } = ev.target;
    const ra = value?.replace(/[^0-9]/g, "");

    if (ra?.length < 6) {
      alert("Informe um RA valido");
      return;
    }
    api.get(`https://utf-io-staging.herokuapp.com/aluno/${value}`)
      .then((data) => {
        if (data.data.aluno.length === 0) {
          setSubmitting(false);
          setFieldValue("email", "");
          setFieldValue("nome", "");
        } else {
          data.data.aluno.forEach((item: GetAluno) => {
            setSubmitting(true);
            setFieldValue("email", item.Pessoa.email);
            setFieldValue("nome", item.Pessoa.nome_pessoa);
          });
        }
      });
  }
  const initialValues = {
    ra_aluno: "",
    email: "",
    nome: "",
    data_inicio: "",
    data_fim: "",
    local: "",
  };

  return (
    <S.SolicitacoesWrapper>
      <h2>Solicitação</h2>
      <br />
      <Formik onSubmit={handleSubmit} initialValues={{ ...initialValues }}>
        {({ setFieldValue, isSubmitting, setSubmitting }) => (
          <Form>
            <FormBody>
              <FormLine>
                <InputField
                  name="ra_aluno"
                  label="RA"
                  onBlur={(ev: any) =>
                    handleBlur(ev, setFieldValue, setSubmitting)
                  }
                />
              </FormLine>
              <FormLine>
                <InputField
                  name="email"
                  type="email"
                  label="Email"
                  disabled={isSubmitting}
                />
              </FormLine>
              <FormLine>
                <InputField name="nome" label="Nome" disabled={isSubmitting} />
              </FormLine>
              <FormLabel>Data Inicio</FormLabel>
              <FormLine>
                
                  <InputField
                    name="data_inicio"
                    type="date"
                    label=""
                  />

              </FormLine>
              <FormLabel>Data Fim</FormLabel>
              <FormLine>
                <InputField name="data_fim" type="date" label="" />
              </FormLine>
              <FormLine>
                <InputField name="local" label="Local" />
              </FormLine>
            </FormBody>
            <FormFooter>
              <Button name="loginButton" >
                Salvar
              </Button>
            </FormFooter>
          </Form>
        )}
      </Formik>
    </S.SolicitacoesWrapper >
  );
};

export default cadastroSolicitacao;
