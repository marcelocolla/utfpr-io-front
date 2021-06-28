import { useEffect, useState } from "react";
import { useHistory, RouteComponentProps } from "react-router";
import { Button } from "../../components/Button/Button";
import { Modal } from "../../components/Modal";

import { api } from "../../services/api";
import * as S from "./styles";

type LiberacaoParams = RouteComponentProps<{id:string}>;

type PessoaProps = {
  nome_pessoa: string;
}

type AlunoProps = {
  id_aluno: number;
  id_pessoa: number;
  ra_aluno: string;
  Pessoa: PessoaProps;
}

type LiberacaoProps = {
  id_cadastro_solicitacao: number;
  data_inicio: string;
  data_fim: string;
  pessoaCadastro: PessoaProps;
  Aluno: AlunoProps;
}

export const Liberacao = ( params: LiberacaoParams ) => {

  const id_liberacao = params.match.params.id;
  const history = useHistory();
  const [liberacao, setLiberacao] = useState<LiberacaoProps>();
  const [openVisita, setOpenVisita] = useState(false);

  useEffect(() => {
    try {
      api.get("solicitacao/cadastro/"+id_liberacao).then((response) => {
        setLiberacao(response.data.cadastroSolicitacao.rows[0]);
      });
    } catch (err) {
      console.error(err);
    }
  }, [id_liberacao]);

  function toLocaleString( dateString: any ) {
    return new Date(dateString).toLocaleDateString('pt-BR');
  }

  return (
    <S.HomeSection>
      <strong onClick={() => history.goBack()}>Liberação</strong>
      <S.Content>
        <S.Card>
          <div>
            <img src="/Ellipse 2.png" alt="Avatar" />
          </div>
          <strong>{liberacao?.Aluno.Pessoa.nome_pessoa}</strong>
          <span>
            RA: <strong>{liberacao?.Aluno.ra_aluno}</strong>
          </span>
        </S.Card>
        <S.DetailedCard>
          <div>
            <div>Início:</div>
            <div>{toLocaleString(liberacao?.data_inicio)}</div>
            <div>Fim:</div>
            <div>{toLocaleString(liberacao?.data_fim)}</div>
            <div /><div />
            <div>Professor Responsável:</div>
            <div><strong>{liberacao?.pessoaCadastro.nome_pessoa}</strong></div>
          </div>
        </S.DetailedCard>

        <S.ButtonWrapper>
          <Button
            type="button"
            name="visitaButton"
            onClickFunction={() => setOpenVisita(true)}>
              Registrar Entrada
          </Button>
        </S.ButtonWrapper>

        <Modal visible={openVisita} close={() => setOpenVisita(false)}>
        </Modal>
      </S.Content>
    </S.HomeSection>
  );
};

export default Liberacao;