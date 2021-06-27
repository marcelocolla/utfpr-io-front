import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { api } from "../../services/api";
import * as S from "./styles";

type AlunoProps = {
  id_aluno: number;
  id_pessoa: number;
  ra_aluno: string;
  nome_aluno: string;
}

type LiberacaoProps = {
  id_cadastro_solicitacao: number;
  data_inicio: string;
  data_fim: string;
  Aluno: AlunoProps;
}

const Liberacoes = () => {

  const history = useHistory();
  const [liberacoes, setLiberacoes] = useState<LiberacaoProps[]>();
  
  // Recupera as liberações ativas, ou seja, aquelas cuja data
  // final de liberação ainda está válida (data_fim >= hoje).
  useEffect(() => {
    try {
      const hoje = new Date();
      api.get("solicitacao/cadastro/getByPermissao/1").then((response) => {
        setLiberacoes(response.data.cadastroSolicitacao.rows.filter(
          function(liberacao: LiberacaoProps) {
            return new Date(liberacao.data_fim) >= hoje;
          }
        ));
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <S.SolicitacoesWrapper>
      <strong onClick={() => history.goBack()}>Liberações</strong>
      <span>Clique no cartão para ver mais informações</span> 
      <br />
      <div className="cardsWrapper">
        {liberacoes?.map((el) => (
          <S.Card 
            key={el.id_cadastro_solicitacao} 
            onClick={() => history.push("/liberacao/"+el.id_cadastro_solicitacao)}>
            {/* parte esquerda, avatar */}
            <div className="imageWrapper">
            <img src="/dog.png" alt="foto solicitacao" />
            </div>

            {/* parte direita, informações gerais */}
            <div>
            <h1>{el.Aluno.nome_aluno}</h1>
            <div>
              <span>{el.data_inicio}</span>
              <strong>{el.data_fim}</strong>
            </div>
            </div>
          </S.Card>
        ))}
      </div>
    </S.SolicitacoesWrapper>
  );
};

export default Liberacoes;