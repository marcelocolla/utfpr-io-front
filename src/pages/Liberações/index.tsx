import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { api } from "../../services/api";
import { Header } from "../../components/Header/Header";
import { Card } from "../../components/Card/";
import { CardsWrapper } from "../../components/Card/styles";

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
    <CardsWrapper>
      <Header header="Liberações" />
      <span>Clique no cartão para ver mais informações</span> 
      <br />
      <div className="cardsWrapper">
        {liberacoes?.map((el) => (
          <Card 
            key={el.id_liberacao}
            name={el.Aluno.Pessoa.nome_pessoa}
            leftInfo={"De: " + new Date(el.data_inicio).toLocaleDateString('pt-BR')}
            rightInfo={"Até: " + new Date(el.data_fim).toLocaleDateString('pt-BR')}
            removeDisabled={true}
            onEdition={() => history.push("/liberacao/"+el.id_liberacao)}/>
        ))}
      </div>
    </CardsWrapper>
  );
};

export default Liberacoes;