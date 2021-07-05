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

import * as S from "../../components/Button/styles";

type FormProps = {
  viewOnly?: boolean;
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

const dataAgora = () => {
  return new Date().toLocaleDateString('fr-CA')
}

const horaAgora = (): String => {
  return new Date().toLocaleTimeString([],
    {hour: '2-digit', minute:'2-digit', hour12: false})
}

export default function SolicitacaoForm( props: FormProps ) {

  const { user } = useContext(AuthContext);
  const [liberado, setLiberado] = useState(false);
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
          } 
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [props])

  // Tenta recuperar o aluno no banco, a partir do seu RA
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

  // Cadastro de uma nova solicitação
  // A solicitação cadastrada pelo perfil DESEG já fica aprovada
  async function handleSubmit( values: any ) {
    api.post("solicitacao/cadastro", {
      data_inicio: values.data_inicio,
      data_fim: values.data_fim,
      permissao_acesso: (user?.deseg ? 1 : 0),
      data_permissao: (user?.deseg ? dataAgora() : null),
      hora_permissao: (user?.deseg ? horaAgora() : null),
      id_pessoa_cadastro: user?.pessoa.id_pessoa,
      id_pessoa_permitiu: (user?.deseg ? user?.pessoa.id_pessoa : null),

      nome_aluno: values.aluno.nome_aluno,
      email: values.aluno.email_aluno,
      tipo_usuario: user?.pessoa.tipo_usuario,
      codigo_barra: null,
      ra_aluno: values.aluno.ra_aluno,

      origem_envio: 0,
      local_visitado: values.local,
    }).then(function (response) {
      if (response.status !== 200) {
        alert("Houve um problema ao cadastrar, contate o suporte!");
      } else {
        history.go(0);
      }
    });
  }

  // Atualização de uma solicitação
  async function handleUpdate( values: any ) {
    api.put("solicitacao/cadastro/", {
      id_liberacao: props.id_solicitacao,
      data_inicio: values.data_inicio,
      data_fim: values.data_fim,
      local_visitado: values.local,
    }).then(function(response) {
      if (response.status !== 200) {
        alert("Houve um problema ao salvar, contate o suporte!");
      } else {
        history.go(0);
      }
    });
  }

  // Perfil DESEG aprova ou cancela uma solicitação
  function handleLiberacao( aprovou: boolean ) {
    api.put("solicitacao/cadastro", {
      id_liberacao: props.id_solicitacao,
      id_pessoa_permitiu: (user?.deseg ? user?.pessoa.id_pessoa : null),
      data_permissao: dataAgora(),
      hora_permissao: horaAgora(),
      permissao_acesso: (aprovou ? 1 : 0),
    }).then(function (response) {
      if (response.status !== 200) {
        alert("Houve um problema ao aprovar, contate o suporte!");
      } else {
        history.go(0);
      }
    });
  }

  function handleApproval() {
    handleLiberacao(true);
  }

  function handleDisapproval() {
    handleLiberacao(false);
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
        <FormFooter>
          <S.ButtonWrapper>
            {(user?.deseg && !liberado) && (<Button
              name="desaprovarButton" type="button"
              onClickFunction={handleDisapproval}>
              X
            </Button>)}
            {!liberado && (<Button
              name="loginButton" >
              Salvar
            </Button>)}
            {(user?.deseg && !liberado) && (<Button
              name="aprovarButton" type="button"
              onClickFunction={handleApproval}>
              V
            </Button>)}
          </S.ButtonWrapper>
        </FormFooter>
      </Form>
    </Formik>
  )
}