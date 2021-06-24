import { useContext } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

import { Button } from "../../components/Button/Button";
import { Modal } from "../../components/Modal";
import DepartamentoForm from "../../components/Forms/DepartamentoForm";

import * as S from "./styles";

const Home = () => {
  const history = useHistory();
  const { user } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [openDeseg, setOpenDeseg] = useState(false);

  function abrirCadastro() {
    setOpenDeseg(true);
  }

  // o perfil Professor seleciona sua coordenação no primeiro login,
  // o que atualiza seu perfil e consequentemente, atualiza a página
  function atualizarCadastro() {
    // teria que ter uma forma de pegar o professor com o id novo.
    // talvez o /me?
    history.goBack();
    setOpen(false);  
  }

  return (
    <S.HomeSection>
      <strong onClick={() => history.goBack()}>Home</strong>

      <S.Content>
        <S.Card>
          <div>
            <img src="Ellipse 2.png" alt="Avatar" />
          </div>
          <strong>{user?.nome}</strong>
          <span>
            Matrícula: <strong>{user?.deseg?.matricula}</strong>
          </span>
        </S.Card>

        <S.ButtonWrapper>
          {/* não sei adicionar icone*/}
          {user?.deseg &&
            <Button type="button" name="relatorioButton" mw="10px">
              R
            </Button>
          }
          <Button type="button" name="solicitacoesButton" path="/solicitacoes">
            Solicitações
          </Button>
          {user?.deseg &&
            <Button type="button" name="cadastroButton" mw="10px" onClickFunction={abrirCadastro}>
              +
            </Button>
          }
        </S.ButtonWrapper>

        <Modal visible={openDeseg} close={() => setOpenDeseg(false)}>
          <h2>Cadastros</h2>
          <br />
          {/* não sei se é a melhor solução, criar um vertical*/}
          <S.VerticalButtonWrapper>
            <Button type="button" name="desegButton" path="/usuarios/deseg">
              DESEG
            </Button>
            <Button type="button" name="professoresButton" path="/usuarios/professor">
              Professores
            </Button>
            <Button type="button" name="vigilantesButton" path="/usuarios/vigilante">
              Vigilantes
            </Button>
          </S.VerticalButtonWrapper>
        </Modal>

        <Modal visible={open || user?.professor?.id_departamento === 0}>
          <h2>Professor, por favor selecione sua coordenação.</h2>
          <br />
          <DepartamentoForm user={user} onConfirm={atualizarCadastro}/>
        </Modal>
      </S.Content>
    </S.HomeSection>
  );
};

export default Home;
