import { useContext, useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import { api } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

import styled from "styled-components";
import { useEffect } from "react";

const ToggleStyled = styled(ToggleButton)`
  &.MuiButtonBase-root {
    height: 5rem;
    margin: 1rem;
    border-radius: 20px;

    color: white;
    font-size: 1.2rem;
    text-transform: capitalize;
    background-color: var(--color-orange-default);
    opacity: 50%;

    &.Mui-selected {
      color: white;
      font-weight: bold;
      opacity: 100%;
      background-color: var(--color-orange-default);

      &:hover {
        color: white;
        background-color: var(--color-orange-dark-10);
        box-shadow: 0px 4px 12px var(--color-orange-box-shadow-dark-hover);
      }
    }

    &:hover {
      color: white;
      background-color: var(--color-orange-dark-10);
      box-shadow: 0px 4px 12px var(--color-orange-box-shadow-dark-hover);
    }
  }
`;

const PENDENTES = "pendentes";
const CANCELADAS = "canceladas";
const APROVADAS = "aprovadas";

const getSolicitacoesByStatus = async (status: string) => {
  let solicitacoes: any[] = [];
  if (status === PENDENTES) {
    await api.get("solicitacao/cadastro/getByPermissao/0").then((response) => {
      solicitacoes = response.data.cadastroSolicitacao.rows;
    })
  } else if (status === CANCELADAS) {
    await api.get("solicitacao/cadastro/deseg/getSolicitacaoCanceladaDeseg").then((response) => {
      solicitacoes = response.data.cadastroSolicitacao.rows;
    })
  } else if (status === APROVADAS) {
    await api.get("solicitacao/cadastro/getByPermissao/1").then((response) => {
      solicitacoes = response.data.cadastroSolicitacao.rows;
    })
  }
  return solicitacoes;
}

const getSolicitacoesByProfessorStatus = async (status: string, user:any) => {
  let solicitacoes: any[] = [];
  if (status === PENDENTES) {
    await api.post("solicitacao/cadastro/getByIdPessoaCadastro",{
      idPessoaCadastro:user?.pessoa.id_pessoa,
      permissaoAcesso:0
    }).then((response) => {
      solicitacoes = response.data.cadastroSolicitacao.rows;
    })
  } else if (status === CANCELADAS) {
    await api.get(`solicitacao/cadastro/getSolicitacaoCancelada/${user?.pessoa.id_pessoa}`).then((response) => {
      solicitacoes = response.data.cadastroSolicitacao.rows;
    })
  } else if (status === APROVADAS) {
    await api.post("solicitacao/cadastro/getByIdPessoaCadastro",{
      idPessoaCadastro:user?.pessoa.id_pessoa,
      permissaoAcesso: 1
    }).then((response) => {
      solicitacoes = response.data.cadastroSolicitacao.rows;
    })
  }
  return solicitacoes;
}

type FormProps = {
  callbackFunction: (collection: any) => void;
}

export default function SolicitacaoRadioGroup( props: FormProps ) {
  const {user} = useContext(AuthContext);
  const [selection, setSelection] = useState('pendentes');

  useEffect(() => {
    setStatus(selection);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection]);

  const handleSelection = (
      event: React.MouseEvent<HTMLElement>,
      newSelection: string | null) => {

    if (newSelection !== null) {
      setSelection(newSelection);
      setStatus(newSelection);
    }
  };

  const setStatus = async (status: string) => {
    try {
      if (user?.deseg) {
        // Se deseg, retornar tudo
        let solicitacoes = await getSolicitacoesByStatus(status);
        props.callbackFunction(solicitacoes);
      } else {
        // Se professor, filtrar quais foram cadastrados pelo professor
        let solicitacoes = await getSolicitacoesByProfessorStatus(status,user);
        props.callbackFunction(solicitacoes);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <ToggleButtonGroup 
      value={selection}
      exclusive
      onChange={handleSelection}>

      <ToggleStyled value={PENDENTES}>
        <span>Pendentes</span>
      </ToggleStyled>
      <ToggleStyled value={CANCELADAS}>
        <span>Canceladas</span>
      </ToggleStyled>
      <ToggleStyled value={APROVADAS}>
        <span>Aprovadas</span>
      </ToggleStyled>
    </ToggleButtonGroup>
  )
}