import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { FormBody } from "../../components/Form/FormSection/FormBody";
import { FormLine } from "../../components/Form/FormSection/FormLine";
import InputField from "../../components/Form/InputField";
import { Button } from "../../components/Button/Button";
import { FormFooter } from "../../components/Form/FormSection/FormFooter";
import { Modal } from "../../components/Modal";

import * as S from "./styles";

let tipo_pessoa = 0;

let codigo_pessoa = 0;

const getAluno = async (ra: string) => {
  return fetch(`https://utf-io-staging.herokuapp.com/aluno/${ra}`)
    .then((res) => res.json());
}
function executeAsync(func: any) {
  setTimeout(func, 10);
}
const getDeseg = async (id: number) => {
  return fetch(`https://utf-io-staging.herokuapp.com/deseg/${id}`)
    .then((res) => res.json());
}
const getPermissaoUsuarioDeseg = async (id: number) => {
  return fetch(`https://utf-io-staging.herokuapp.com/solicitacao/cadastro/getByPermissao/${id}`)
    .then((res) => res.json());
}

const getPermissaoUsuarioProfessor = async (id: number) => {
  return fetch(`https://utf-io-staging.herokuapp.com/solicitacao/cadastro/getByIdPessoaCadastro/${id}`)
    .then((res) => res.json());
}


let mock = Array();
function getMock(res: any) {
  res.cadastroSolicitacao.rows.forEach((element: any) => {
    getAluno(element.Aluno.ra_aluno).then((alu)=>{
      mock.push({
        "id": element.id_cadastro_solicitacao,
        "nome": alu.aluno[0].Pessoa.nome_pessoa,
        "dataEntrada": element.data_inicio,
        "dataSaida": element.data_fim,
        "permissao_acesso": element.permissao_acesso,
        "data_permissao": element.data_permissao,
      });
    });
  });
  return mock;
}
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
  const [jsonObj, setJson] = useState([{}]);
  const [meuArray, setArray] = useState([{}]);
  const [status, setStatus] = useState();
  
  getPermissaoUsuarioDeseg(0).then((res) => {
    res.cadastroSolicitacao.rows.forEach((element: any) => {
      getAluno(element.Aluno.ra_aluno).then((alu)=>{
        mock.push({
          "id": element.id_cadastro_solicitacao,
          "nome": alu.aluno[0].Pessoa.nome,
          "dataEntrada": element.data_inicio,
          "dataSaida": element.data_fim,
          "permissao_acesso": element.permissao_acesso,
          "data_permissao": element.data_permissao,
        });
      });

    });
    setJson(mock);
  });



  function handleSubmit() {
    return;
  }

  useEffect(() => {
    let valor = status;
    switch (Number(valor)) {
      case 1:
        if (tipo_pessoa === 0) {
          getPermissaoUsuarioDeseg(0).then((res) => {
            mock = getMock(res);
            setJson(mock);
          });
        } else {
          getPermissaoUsuarioProfessor(145).then((res) => {
            mock = getMock(res);
            setJson(mock);
          });
        }
        break;
      case 2:
        if (tipo_pessoa === 1) {
          getPermissaoUsuarioProfessor(145).then((res) => {
            mock = getMock(res);
            setJson(mock);
          });
        }
        break;
      case 3:
        if (tipo_pessoa === 0) {
          getPermissaoUsuarioDeseg(1).then((res) => {
            mock = getMock(res);
            setJson(mock);
          });
        } else {
          getPermissaoUsuarioProfessor(145).then((res) => {
            mock = getMock(res);
            setJson(mock);
          });
        }
        break;
      default:
        if (tipo_pessoa === 0) {
          getPermissaoUsuarioDeseg(0).then((res) => {
            mock = getMock(res);
            setJson(mock);
          });
        } else {
          getPermissaoUsuarioProfessor(145).then((res) => {
            mock = getMock(res);
            setJson(mock);
          });
        }
    }
  }, [status]);
  
  useEffect(() => {
    switch (Number(status)) {
      case 1:
        mock = mock.filter(json => (json.permissao_acesso < 1));
        break;
      case 2:
        mock = mock.filter(json => (json.data_permissao === null));
        break;
      case 3:
        mock = mock.filter(json => (json.permissao_acesso > 0));
        break;
      default:
        mock = mock.filter(json => (json.permissao_acesso < 1));
    }

  }, [jsonObj]);
  return (
    <S.SolicitacoesWrapper>
      <strong onClick={() => history.goBack()}>Solicitações</strong>
      <div>
        <select className="cardsWrapper" id="cbSolicitacoes" onChange={(ev: any) => setStatus(ev.target.value)}>
          <option value="1" >Pendentes</option>
          <option value="2" disabled={tipo_pessoa !== 0}>Canceladas</ option>
          <option value="3" >Aprovada</option>
        </select>
      </div>
      <br />
      <div className="cardsWrapper">
        <div className="cardsWrapper">
          {mock.map((el) => (
            <S.Card key={el.id} onClick={() => setOpen(true)} >
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
        <Button type="button" name="criarSolicitacao" path="/cadastro_solicitacao" >
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
                <InputField name="data_inicio" type="date" label="Data Inicial" />
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
