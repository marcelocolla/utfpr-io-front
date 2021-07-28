import { useState, useContext } from "react";

import { Modal } from "../../components/Modal";
import FormLabel from "@material-ui/core/FormLabel";
import { Card } from "../../components/Card/";
import { CardsWrapper } from "../../components/Card/styles";
import { Header } from "../../components/Header/Header";
import { Button } from "../../components/Button/Button";
import FormControl from "@material-ui/core/FormControl";
import SolicitacaoForm from "../../components/Forms/SolicitacaoForm";
import SolicitacaoRadioGroup from "../../components/SolicitaçãoRadioGroup";

import { AuthContext } from "../../contexts/AuthContext";

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
    <CardsWrapper>
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
            <Card
              key={el.id_liberacao}
              name={el.Aluno.Pessoa.nome_pessoa}
              leftInfo={el.data_inicio}
              rightInfo={el.data_fim}
              onEdition={() => exibirCadastro(el.id_liberacao)}/>
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

      <Modal
        visible={open}
        close={() => fecharCadastro()}
        title={(!viewOnly ? "Nova " : "") + "Solicitação"}>
          <SolicitacaoForm
            viewOnly={viewOnly}
            novoRegistro={novoRegistro}
            id_solicitacao={selection}
          />
      </Modal>
    </CardsWrapper>
  );
};

export default Solicitacoes;
