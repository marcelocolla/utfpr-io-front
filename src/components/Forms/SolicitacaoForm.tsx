import { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik"

import * as Yup from "yup";

import { Button } from "../Button/Button"; 
import InputField from '../Form/InputField';
import { FormLabel } from '@material-ui/core';
import { FormBody } from '../Form/FormSection/FormBody'
import { FormLine } from '../Form/FormSection/FormLine';
import { FormFooter } from '../Form/FormSection/FormFooter';

import { api } from "../../services/api";
import history from "../../history";
import { AuthContext } from "../../contexts/AuthContext";

type FormProps = {
  viewOnly?: boolean;
  novoRegistro?:boolean;
  id_solicitacao?: number;
}

type AlunoProps = {
  ra_aluno: string;
  nome_aluno: string;
  email_aluno: string;
}

type SolicitacaoProps = {
  data_inicio: string;
  data_fim: string;
  local: string;
}

export default function SolicitacaoForm( props: FormProps ) {

  const { user } = useContext(AuthContext);
  const [liberado, setLiberado] = useState(false);
  const [liberacao, setLiberacao] = useState();
  const [aluno, setAluno] = useState<AlunoProps>({
    ra_aluno: "",
    nome_aluno: "",
    email_aluno: "",
  });
  const [solicitacao, setSolicitacao] = useState<SolicitacaoProps>({
    data_inicio: "",
    data_fim: "",
    local: "",
  });
  
  // Recupera os dados da solicitação, se existir
  useEffect(() => {
    try {
      if (props.id_solicitacao !== 0) {
        api.get("solicitacao/cadastro/"+props.id_solicitacao).then((response) => {
          if (response.data.cadastroSolicitacao.length !== 0) {
            let getSolicitacao = response.data.cadastroSolicitacao.rows[0];

            setAluno({
              ra_aluno: getSolicitacao.Aluno.ra_aluno,
              nome_aluno: getSolicitacao.Aluno.Pessoa.nome_pessoa,
              email_aluno: getSolicitacao.Aluno.Pessoa.email,
            });

            setSolicitacao({
              data_inicio: getSolicitacao.data_inicio,
              data_fim: getSolicitacao.data_fim,
              local: getSolicitacao.local_visitado,
            });
            setLiberado(getSolicitacao.permissao_acesso === 1);
            setLiberacao(getSolicitacao);
          } 
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [props])

  // Tenta recuperar o aluno no banco
  // Caso exista, preenche os campos de nome e email do aluno
  async function handleBlur(ev: any) {
    const { value } = ev.target;
    const ra = value?.replace(/[^0-9]/g, "");

    if (ra?.length < 6) {
      alert("Informe um RA valido");
      return;
    }
    api.get("aluno/"+value).then((response) => {
      console.log(response.data.aluno)
      if (response.data.aluno.length !== 0) {
        setAluno({
          ra_aluno: value,
          nome_aluno: response.data.aluno[0].Pessoa.nome_pessoa,
          email_aluno: response.data.aluno[0].Pessoa.email,
        });
      }
    });
  }

  async function handleSubmit( values: any ) {
    const solicitacao = {
      id_aluno: null,
      ra_aluno: values.aluno.ra_aluno,
      email: values.aluno.email_aluno,
      nome: values.aluno.nome_aluno,
      codigo_barra: null,
      id_pessoa_cadastro: user?.pessoa.id_pessoa,
      id_pessoa_permitiu: (user?.deseg ? user?.pessoa.id_pessoa : null),
      data_permissao: null,
      hora_permissao: null,
      tipo_usuario: user?.pessoa.tipo_usuario,
      data_inicio: values.data_inicio,
      data_fim: values.data_fim,
      permissao_acesso: values.permissao_acesso,
      local_visitado: values.local,
    };
    console.log(solicitacao);
    api.post("solicitacao/cadastro", solicitacao).then(function (response) {
      if (response.status !== 200) {
        alert("Dados não gerado, falar com o suporte!");
      } else {
        history.go(0);
      }
    });
  }

  async function handleUpdate( values: any ) {
    console.log(values);
    // await api.post("/vigilante", {
    //   nome_pessoa: values.nome_pessoa,
    //   email: values.email,
    //   matricula: values.matricula,
    //   tipo_usuario: 3,
    //   id_turno: values.turno,
    //   senha: values.senha
    // });
    // history.go(0);
  }

  function handleApproval() {
    const solicitacao = {
      id_liberacao:props.id_solicitacao,
      permissao_acesso: 1,
      id_pessoa_permitiu: (user?.deseg ? user?.pessoa.id_pessoa : null)
    };
    api.put("solicitacao/cadastro", solicitacao).then(function (response) {
      if (response.status !== 200) {
        alert("Dados não gerado, falar com o suporte!");
      } else {
        history.go(0);
      }
    });
  }

  function handleReprovar() {
    const solicitacao = {
      id_liberacao:props.id_solicitacao,
      permissao_acesso: 0,
      id_pessoa_permitiu: (user?.deseg ? user?.pessoa.id_pessoa : null),
      data_permissao: new Date().toLocaleDateString('fr-CA')
    };
    api.put("solicitacao/cadastro", solicitacao).then(function (response) {
      if (response.status !== 200) {
        alert("Dados não gerado, falar com o suporte!");
      } else {
        history.go(0);
      }
    });
  }
  
  const validationSchema = Yup.object({
    aluno: Yup.object({
      email_aluno: Yup.string().required("Required")
    })
  });

  return (
    <Formik 
      initialValues={{...solicitacao, aluno: aluno}}
      validationSchema={validationSchema}
      onSubmit={props.viewOnly ? handleUpdate : handleSubmit}
      enableReinitialize>
      <Form>
        <FormBody>
          <FormLine>
            <InputField
              name="aluno.ra_aluno"
              label="RA"
              onBlur={(ev: any) => handleBlur(ev)}
              disabled={props.viewOnly}/>
          </FormLine>
          <FormLine>
            <InputField
              name="aluno.email_aluno"
              type="email" label="Email"
              disabled={props.viewOnly}/>
          </FormLine>
          <FormLine>
            <InputField
              name="aluno.nome_aluno"
              label="Nome"
              disabled={props.viewOnly} />
          </FormLine>
          <FormLabel>Data Inicio</FormLabel>
          <FormLine>
            <InputField
              name="data_inicio"
              type="date" label=""
              disabled={liberado}/>
          </FormLine>
          <FormLabel>Data Fim</FormLabel>
          <FormLine>
            <InputField
              name="data_fim"
              type="date" label=""
              disabled={liberado}/>
          </FormLine>
          <FormLine>
            <InputField
              name="local" label="Local"
              disabled={liberado}/>
          </FormLine>
        </FormBody>
        <FormFooter mt="3rem">
          {!liberado && (<Button
            name="loginButton" >
            Salvar
          </Button>)}
          {user?.deseg && !props.novoRegistro && !liberado && (<Button
            name="aprovarButton"
            onClickFunction={handleApproval}>
            Aprovar
          </Button>)}
          {user?.deseg && !props.novoRegistro && !liberado &&  (<Button
            name="reprovarButton"
            onClickFunction={handleReprovar}>
            Reprovar
          </Button>)}
        </FormFooter>
      </Form>
    </Formik>
    )
}