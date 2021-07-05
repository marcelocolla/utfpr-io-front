import { useEffect, useState, useContext } from "react";

import { Modal } from "../../components/Modal/";
import VisitaForm from "../../components/Forms/VisitaForm";

import { api } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";
import * as S from "../../components/CardList/styles";
import { Header } from "../../components/Header/Header";

type PessoaProps = {
  nome_pessoa: string;
}

type AlunoProps = {
  id_aluno: number;
  id_pessoa: number;
  ra_aluno: string;
  Pessoa: PessoaProps;
}

type VisitaProps = {
  id_visita: number;
  data_entrada: string;
  hora_entrada: string;
  placa_veiculo: string;
  liberacao: {
    Aluno: AlunoProps;
  }
}

const Visitas = () => {

  const { user } = useContext(AuthContext);
  const [visitas, setVisitas] = useState<VisitaProps[]>();

  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState<VisitaProps>();
  
  useEffect(() => {
    try {

      api.get("visita/visitaDia").then((response) => {
        setVisitas(response.data.visita.rows);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  function exibirVisita( visita: VisitaProps ) {
    setSelection(visita);
    setOpen(true);
  }

  return (
    <S.CardsWrapper>
      <Header header="Visitas" />
      <span>Clique no cartão para ver mais informações</span> 
      <br />
      <div className="cardsWrapper">
        {visitas?.map((el) => (
          <S.Card 
            key={el.id_visita} 
            onClick={() => exibirVisita(el)}>
            {/* parte esquerda, avatar */}
            <div className="imageWrapper">
            <img src="/dog.png" alt="foto solicitacao" />
            </div>

            {/* parte direita, informações gerais */}
            <div>
            <h1>{el.liberacao.Aluno.Pessoa.nome_pessoa}</h1>
            <div>
              <span>Placa: {el.placa_veiculo}</span>
              <strong>Entrada às {el.hora_entrada.slice(0, 5)}</strong>
            </div>
            </div>
          </S.Card>
        ))}
      </div>

      <Modal visible={open} close={() => setOpen(false)}>
        <h2>Registro de Saída</h2>
        <br />
        <VisitaForm
          isEntrada={false}
          visita={selection}
          vigilante={user}/>
      </Modal>
    </S.CardsWrapper>
  );
};

export default Visitas;