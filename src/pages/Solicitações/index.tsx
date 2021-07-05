import { useState, useContext } from "react";

import { Modal } from "../../components/Modal";
import FormLabel from "@material-ui/core/FormLabel";
import { Header } from "../../components/Header/Header";
import { Button } from "../../components/Button/Button";
import FormControl from "@material-ui/core/FormControl";
import SolicitacaoForm from "../../components/Forms/SolicitacaoForm";
import SolicitacaoRadioGroup from "../../components/SolicitaçãoRadioGroup";

import { AuthContext } from "../../contexts/AuthContext";

import * as S from "../../components/CardList/styles";

type SolicitacaoProps = {
  id_liberacao: number;
  data_inicio: string;
  data_fim: string;
  Aluno: {
    Pessoa: {
      nome_pessoa: string;
    };
  };
};

const Solicitacoes = () => {
  useContext(AuthContext);
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoProps[]>();

  const [selection, setSelection] = useState(0);
  const [open, setOpen] = useState(false);
  const [viewOnly, setViewOnly] = useState(false);
  const [novoRegistro, setNovoRegistro] = useState(false);

  function exibirCadastro(id: number) {
    setSelection(id);
    setViewOnly(true);
    setOpen(true);
    setNovoRegistro(false);
  }

  function fecharCadastro() {
    setOpen(false);
    setViewOnly(false);
    setSelection(0);
    setNovoRegistro(false);
  }

  return (
    <S.CardsWrapper>
      <Header header="Solicitações" />
      <div>
        <FormControl component="fieldset">
          <FormLabel component="legend"></FormLabel>
          <SolicitacaoRadioGroup callbackFunction={setSolicitacoes} />
        </FormControl>
      </div>
      <br />
      <div className="cardsWrapper">
        <div className="cardsWrapper">
          {solicitacoes?.map((el) => (
            <S.Card
              key={el.id_liberacao}
              onClick={() => exibirCadastro(el.id_liberacao)}
            >
              {/* parte esquerda, avatar */}
              <div className="imageWrapper">
                <img src="/dog.png" alt="foto solicitacao" />
              </div>

              {/* parte direita, infos */}
              <div>
                {console.log(el)}
                <h1>{el.Aluno.Pessoa.nome_pessoa}</h1>
                <div>
                  <span>{el.data_inicio}</span>
                  <strong>{el.data_fim}</strong>
                </div>
              </div>
            </S.Card>
          ))}
        </div>
        <Button
          type="button"
          name="criarSolicitacao"
          onClickFunction={() => {
            setOpen(true);
            setNovoRegistro(true);
          }}
        >
          Criar Solicitação
        </Button>
      </div>

      <Modal visible={open} close={() => fecharCadastro()}>
        <h2>{!viewOnly && "Nova"} Solicitação</h2>
        <br />
        <SolicitacaoForm
          viewOnly={viewOnly}
          novoRegistro={novoRegistro}
          id_solicitacao={selection}
        />
      </Modal>
    </S.CardsWrapper>
  );
};

export default Solicitacoes;
