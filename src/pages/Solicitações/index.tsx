import { Form, useFormik, FormikProvider, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button } from "../../components/Button/Button";
import InputField from "../../components/Form/InputField";
import { FormBody } from "../../components/Form/FormSection/FormBody";
import { FormLine } from "../../components/Form/FormSection/FormLine";
import { FormFooter } from "../../components/Form/FormSection/FormFooter";
import { Modal } from "../../components/Modal";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import * as S from "./styles";
import moment from 'moment'
import { string } from "yup";

/*
* Quem esta logado
* 'tipo_usuario 0: Professor; 1 = Deseg; 3 = Vigilante';
*/
let tipo_pessoa = 1;
/*
* aqui é o codigo da pessoa que esta logada
*/
let codigo_pessoa = 214;
/*
* Type criado para formatar os dados no momento do preenchimento automatico
* Dessa forma o javascript reconhece os campos e não da erro de copilação
*/
type jsonValor = {
  id: number;
  nome: string;
  email: string;
  dataEntrada: string;
  dataSaida: string;
  ra_aluno: string;
  permissao_acesso: number;
  data_permissao: string;
};

/*
* Trás todas as informações do aluno
*/
const getAluno = async (ra: string) => {
  return fetch(`https://utf-io-staging.herokuapp.com/aluno/${ra}`)
    .then((res) => res.json());
}
function executeAsync(func: any) {
  setTimeout(func, 10);
}

/*
* Trás todas as solicitações de cadastro pelo parametro de esta ou não pendente
*/
const getPermissaoUsuarioDeseg = async (id: number) => {
  return fetch(`https://utf-io-staging.herokuapp.com/solicitacao/cadastro/getByPermissao/${id}`)
    .then((res) => res.json());
}

/*
* Trás a lista de todas as solicitação de cadastro por um codigo de professor
*/
const getPermissaoUsuarioProfessor = async (id: number) => {
  return fetch(`https://utf-io-staging.herokuapp.com/solicitacao/cadastro/getByIdPessoaCadastro/${id}`)
    .then((res) => res.json());
}


let mock = Array();
/*
* limpa o mock para que ele não duplique ou apareça lixo de outra lista
*/
function clearAllArray(arr:any){
  while(arr.length>0){
    arr.pop();
  }
}
/*
* serve para preencher o mock com o json que vem do backend
*/
function getMock(res: any) {
  if(mock.length>0){
    clearAllArray(mock);
  }
  res.cadastroSolicitacao.rows.forEach((element: any) => {
    //   let data_inicio = moment(new Date(element.data_inicio), "dd/MM/yyyy").format();
    //  let data_fim = moment(new Date(element.data_fim), "dd/MM/yyyy").format();
    getAluno(element.Aluno.ra_aluno).then((alu) => {
      console.log(alu.aluno[0].Pessoa.email);
      mock.push({
        "id": element.id_cadastro_solicitacao,
        "nome": alu.aluno[0].Pessoa.nome_pessoa,
        "email": alu.aluno[0].Pessoa.email,
        "dataEntrada": element.data_inicio,
        "dataSaida": element.data_fim,
        "ra_aluno": element.Aluno.ra_aluno,
        "permissao_acesso": element.permissao_acesso,
        "data_permissao": element.data_permissao,
      });
    });
  });
  return mock;
}
const Solicitacoes = () => {
  const history = useHistory();
  /*
  * serve para registrar a seleção do radio button
  */
  const [status, setStatus] = useState();
  /*
  * Uso do mock ou a lista de json
  * Aqui é para controle dela
  */
  const [jsonObj, setJson] = useState([{}]);
  /*
  * serve para preencher o formulario 
  * e notificar que ele deve aparecer
  */
    const [editar, setEditar] = useState();
  /*
  * se deve ou não aparecer o formulario de edição
  */
  const [open, setOpen] = useState(false);
  /*
  * Esse aqui é o preenchimento inicial,
  * pois no momento do carregamento inicial
  * ele não estava pegando o que esta selecionado no radio button
  * Assim aqui trás as lista dos pendentes do professor ou do deseg
  */
  if (tipo_pessoa === 1) {
    getPermissaoUsuarioDeseg(0).then((res) => {
      res.cadastroSolicitacao.rows.forEach((element: any) => {
        //   let data_inicio = moment(new Date(element.data_inicio), "dd/MM/yyyy").format();
        //    let data_fim = moment(new Date(element.data_fim), "dd/MM/yyyy").format();
        getAluno(element.Aluno.ra_aluno).then((alu) => {
          mock.push({
            "id": element.id_cadastro_solicitacao,
            "nome": alu.aluno[0].Pessoa.nome_pessoa,
            "email": alu.aluno[0].Pessoa.email,
            "dataEntrada": element.data_inicio,
            "dataSaida": element.data_fim,
            "ra_aluno": element.Aluno.ra_aluno,
            "permissao_acesso": element.permissao_acesso,
            "data_permissao": element.data_permissao,
          });
        });

      });
      setJson(mock);
    });
  } else {
    getPermissaoUsuarioProfessor(codigo_pessoa).then((res) => {
      res.cadastroSolicitacao.rows.forEach((element: any) => {
        //        let data_inicio = moment(new Date(element.data_inicio), "dd/MM/yyyy").format();
        //        let data_fim = moment(new Date(element.data_fim), "dd/MM/yyyy").format();
        getAluno(element.Aluno.ra_aluno).then((alu) => {
          mock.push({
            "id": element.id_cadastro_solicitacao,
            "nome": alu.aluno[0].Pessoa.nome_pessoa,
            "email": alu.aluno[0].Pessoa.email,
            "dataEntrada": element.data_inicio,
            "dataSaida": element.data_fim,
            "ra_aluno": element.Aluno.ra_aluno,
            "permissao_acesso": element.permissao_acesso,
            "data_permissao": element.data_permissao,
          });
        });

      });
      setJson(mock);
    });
  }

  /*
  * O uso do formik assim é para conseguir preencher 
  * a lista no formato que esta atualmente.
  * Sem isso ficaria dificil usar o setFieldValue
  */
  const formik = useFormik({
    initialValues: {
      ra: "",
      email: "",
      nome: "",
      dataInicio: "",
      dataFim: "",
      local: "",
    },
    onSubmit: values => {
      alert(JSON.stringify(values));
    },

  });
  /*
  * verifica qual radio button esta, 
  * se tiver no pendente, quando da um click e preencher todos os campos 
  * Assim possibilitando editar, se não aparece mensagem
  */
  useEffect(() => {
    if (mock.length > 0 && Number(status) === 1) {
      let editando = mock.filter(json => (json.id === editar));
      let edit = editando[0] as jsonValor;
      console.log(edit.email);
      formik.setFieldValue("ra_aluno", edit.ra_aluno);
      formik.setFieldValue("nome", edit.nome);
      formik.setFieldValue("email", edit.email);
      formik.setFieldValue("data_inicio", edit.dataEntrada);
      formik.setFieldValue("data_fim", edit.dataSaida);
      setOpen(true);
    }
    if (mock.length > 0 && Number(status) !== 1) {
      alert("Somente visualização");
    }

  }, [editar]);

  /*
  * preencher a lista de acordo o radio button selecionado 
  * com default da primeira lista que é a lista de pendentes
  */
  useEffect(() => {
    let valor = status;
    switch (Number(valor)) {
      case 1:
        if (tipo_pessoa === 1) {
          getPermissaoUsuarioDeseg(0).then((res) => {
            mock = getMock(res);
            setJson(mock);
          });
        } else {
          getPermissaoUsuarioProfessor(codigo_pessoa).then((res) => {
            mock = getMock(res);
            setJson(mock);
          });
        }
        break;
      case 2:
        if (tipo_pessoa === 0) {
          getPermissaoUsuarioProfessor(codigo_pessoa).then((res) => {
            mock = getMock(res);
            setJson(mock);
          });
        }
        break;
      case 3:
        if (tipo_pessoa === 1) {
          getPermissaoUsuarioDeseg(1).then((res) => {
            mock = getMock(res);
            setJson(mock);
          });
        } else {
          getPermissaoUsuarioProfessor(codigo_pessoa).then((res) => {
            mock = getMock(res);
            setJson(mock);
          });
        }
        break;
      default:
        if (tipo_pessoa === 1) {
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

  /*
  * usa o filter para poder identificar que o mock teve modificação
  * o filter realmente é necessario no caso de professor,
  * pois o json dele vem tanto permissao acesso pendente e permitido
  * Já no caso do deseg o json vem de acordo a permissão, 
  * sendo irrelevante esse filter
  */
  useEffect(() => {
    switch (Number(status)) {
      case 1:
        mock = mock.filter(json => (json.permissao_acesso < 1));
        break;
      case 2:
        mock = mock.filter(json => (json.data_permissao !== null));
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
        <FormControl component="fieldset">
          <FormLabel component="legend"></FormLabel>
          <RadioGroup row aria-label="position" name="position" defaultValue="1" onChange={(ev: any) => setStatus(ev.target.value)}>
            <FormControlLabel
              value="1"
              control={<Radio color="primary" />}
              label="Pendentes"
              labelPlacement="top"
            />
            <FormControlLabel
              value="2"
              control={<Radio color="primary" />}
              label="Cancelados"
              labelPlacement="top"
            />
            <FormControlLabel
              value="3"
              control={<Radio color="primary" />}
              label="Aprovada"
              labelPlacement="top"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <br />
      <div className="cardsWrapper">
        <div className="cardsWrapper">
          {mock.map((el) => (
            <S.Card key={el.id} onClick={() => setEditar(el.id)}>
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
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
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
              <Button name="loginButton">Salvar/Permitir</Button>
            </FormFooter>
          </Form>
        </FormikProvider>
      </Modal>
    </S.SolicitacoesWrapper>
  );

};

export default Solicitacoes;
