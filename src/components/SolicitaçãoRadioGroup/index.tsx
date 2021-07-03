import { useContext } from "react";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { api } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

type FormProps = {
  callbackFunction: (collection: any) => void;
}

const getSolicitacoesByStatus = async (status: string) => {
  let solicitacoes: any[] = [];
  if (status === "1") { 
    // Solicitações Pendentes
    await api.get("solicitacao/cadastro/getByPermissao/0").then((response) => {
      solicitacoes = response.data.cadastroSolicitacao.rows;
    })
  } else if (status === "2") {
    // Solicitações Canceladas??

  } else if (status === "3") { 
    // Solicitações Aprovadas
    await api.get("solicitacao/cadastro/getByPermissao/1").then((response) => {
      solicitacoes = response.data.cadastroSolicitacao.rows;
    })
  }
  return solicitacoes;
}

export default function SolicitacaoRadioGroup( props: FormProps ) {

  const {user} = useContext(AuthContext);

  // useEffect(() => { 
  //   api.get("solicitacao/cadastro/getByPermissao/0").then((response) => {
  //     props.callbackFunction(response.data.cadastroSolicitacao.rows.filter(
  //       function(solicitacao: any) {
  //         return solicitacao.pessoaCadastro.id_pessoa === user?.pessoa.id_pessoa;
  //       }
  //     )
  //   )});
  // }, [props, user]);

  const setStatus = async (status: string) => {
    try {
      let solicitacoes = await getSolicitacoesByStatus(status);
      if (user?.deseg) {
        // Se deseg, retornar tudo
        props.callbackFunction(solicitacoes);
      } else {
        // Se professor, filtrar quais foram cadastrados pelo professor
        props.callbackFunction(solicitacoes.filter(
          function(solicitacao: any) {
            return solicitacao.pessoaCadastro.id_pessoa === user?.pessoa.id_pessoa;
          }
        ));
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <RadioGroup 
      row aria-label="position"
      name="position"
      onChange={(ev: any) => setStatus(ev.target.value)}>

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
  )
}