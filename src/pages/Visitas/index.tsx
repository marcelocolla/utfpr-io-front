import { useEffect, useState, useContext } from "react";

import { Modal } from "../../components/Modal/";
import VisitaForm from "../../components/Forms/VisitaForm";

import { api } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";
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
    <CardsWrapper>
      <Header header="Visitas" />
      <span>Clique no cartão para ver mais informações</span> 
      <br />
      <div className="cardsWrapper">
        {visitas?.map((el) => (
          <Card 
            key={el.id_visita}
            name={el.liberacao.Aluno.Pessoa.nome_pessoa}
            leftInfo={'Placa: ' + el.placa_veiculo}
            rightInfo={'Entrada às ' + el.hora_entrada.slice(0, 5)}
            removeDisabled={true}
            onEdition={() => exibirVisita(el)}/>
        ))}
      </div>

      <Modal
        visible={open}
        close={() => setOpen(false)}
        title="Registro de Saída">
          <VisitaForm
            isEntrada={false}
            visita={selection}
            vigilante={user}/>
      </Modal>
    </CardsWrapper>
  );
};

export default Visitas;