import { useState } from "react";

import Modal from "../../components/Modal";

import * as S from "./styles";

const mock = [
  {
    id: 0,
    nome: "Pedro Carlos",
    dataEntrada: "20/04",
    dataSaida: "21/04",
  },
  {
    id: 1,
    nome: "Gustavo Santos",
    dataEntrada: "25/04",
    dataSaida: "25/04",
  },
  {
    id: 2,
    nome: "Yuri Rodrigues",
    dataEntrada: "26/04",
    dataSaida: "26/04",
  },
  {
    id: 2,
    nome: "Yuri Rodrigues",
    dataEntrada: "26/04",
    dataSaida: "26/04",
  },
  {
    id: 2,
    nome: "Yuri Rodrigues",
    dataEntrada: "26/04",
    dataSaida: "26/04",
  },
  {
    id: 2,
    nome: "Yuri Rodrigues",
    dataEntrada: "26/04",
    dataSaida: "26/04",
  },
  {
    id: 2,
    nome: "Yuri Rodrigues",
    dataEntrada: "26/04",
    dataSaida: "26/04",
  },
  {
    id: 2,
    nome: "Yuri Rodrigues",
    dataEntrada: "26/04",
    dataSaida: "26/04",
  },
  {
    id: 2,
    nome: "Yuri Rodrigues",
    dataEntrada: "26/04",
    dataSaida: "26/04",
  },
];

const Solicitacoes = () => {
  const [open, setOpen] = useState(false);

  return (
    <S.SolicitacoesWrapper>
      <strong>Solicitações</strong>
      <div className="cardsWrapper">
        {mock.map((el) => (
          <S.Card key={el.id} onClick={() => setOpen(true)}>
            {/* parte esquerda, avatar */}
            <div className="imageWrapper">
              <img src="/dog.png" alt="foto solicitacao" />
            </div>

            {/* parte direita, infos */}
            <div>
              <h1>{el.nome}</h1>
              <div>
                <span>{el.dataEntrada}</span>
                <strong>{el.dataSaida}</strong>
              </div>
            </div>
          </S.Card>
        ))}
      </div>

      <Modal open={open} close={() => setOpen(false)}></Modal>
    </S.SolicitacoesWrapper>
  );
};

export default Solicitacoes;
