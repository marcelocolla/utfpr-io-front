import { useState, useContext } from "react";
import { useHistory } from "react-router";

import { Button } from "../../components/Button/Button";
import { Modal } from "../../components/Modal";
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { AuthContext } from "../../contexts/AuthContext";

import * as S from "../../components/CardList/styles";
import SolicitacaoRadioGroup from "../../components/SolicitaçãoRadioGroup";
import SolicitacaoForm from "../../components/Forms/SolicitacaoForm";

type SolicitacaoProps = {
  id_liberacao: number;
  data_inicio: string;
  data_fim: string;
  Aluno: {
    Pessoa: {
      nome_pessoa: string;
    }
  }
};

const Solicitacoes = () => {

  const history = useHistory();
  useContext(AuthContext);
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoProps[]>();

  const [selection, setSelection] = useState(0);
  const [open, setOpen] = useState(false);
  const [viewOnly, setViewOnly] = useState(false);

  function exibirCadastro( id: number ) {
    setSelection(id);
    setViewOnly(true);
    setOpen(true);
  }

  function fecharCadastro() {
    setOpen(false);
    setViewOnly(false);
    setSelection(0);
  }

  return (
    <S.CardsWrapper>
      <strong onClick={() => history.goBack()}>Solicitações</strong>
      <div>
        <FormControl component="fieldset">
          <FormLabel component="legend"></FormLabel>
          <SolicitacaoRadioGroup callbackFunction={setSolicitacoes}/>
        </FormControl>
      </div>
      <br />
      <div className="cardsWrapper">
        <div className="cardsWrapper">
          {solicitacoes?.map((el) => (
            <S.Card
              key={el.id_liberacao}
              onClick={() => exibirCadastro(el.id_liberacao)}>
              {/* parte esquerda, avatar */}
              <div className="imageWrapper">
                <img src="/dog.png" alt="foto solicitacao" />
              </div>

              {/* parte direita, infos */}
              <div>
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
          onClickFunction={()=>setOpen(true)}>
          Criar Solicitação
        </Button>
      </div>

      <Modal visible={open} close={() => fecharCadastro()}>
        <h2>{!viewOnly && "Nova"} Solicitação</h2>
        <br />
        <SolicitacaoForm viewOnly={viewOnly} id_solicitacao={selection} />
      </Modal>
    </S.CardsWrapper>
  );
};

export default Solicitacoes;
