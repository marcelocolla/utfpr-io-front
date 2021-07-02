import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { api } from "../../services/api";
import * as S from "./styles";

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
  id_liberacao: number;
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
      api.get("solicitacao/cadastro/getByPermissao/1").then((response) => {
        setLiberacoes(response.data.cadastroSolicitacao.rows);
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
            key={el.id_liberacao} 
            onClick={() => history.push("/liberacao/"+el.id_liberacao)}>
            {/* parte esquerda, avatar */}
            <div className="imageWrapper">
            <img src="/dog.png" alt="foto solicitacao" />
            </div>

            {/* parte direita, informações gerais */}
            <div>
            <h1>{el.Aluno.Pessoa.nome_pessoa}</h1>
            <div>
              <span>De: {new Date(el.data_inicio).toLocaleDateString('pt-BR')}</span>
              <strong>Até: {new Date(el.data_fim).toLocaleDateString('pt-BR')}</strong>
            </div>
            </div>
          </S.Card>
        ))}
      </div>
    </S.SolicitacoesWrapper>
  );
};

export default Liberacoes;