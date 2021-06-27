import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

import { Button } from "../../components/Button/Button";
import { Modal } from "../../components/Modal";
import DepartamentoForm from "../../components/Forms/DepartamentoForm";

import * as S from "./styles";

const Home = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [openDeseg, setOpenDeseg] = useState(false);

  console.log(user);

  // o perfil Professor seleciona sua coordenação no primeiro login,
  // o que atualiza seu perfil e consequentemente, atualiza a página
  function atualizar() {
    setOpen(false); 
    history.go(0);
  }

  function abrirCadastro() {
    setOpenDeseg(true);
  }

  return (
    <S.HomeSection>
      <strong onClick={() => history.goBack()}>Home</strong>

      <S.Content>
        <S.Card>
          <div>
            <img src="Ellipse 2.png" alt="Avatar" />
          </div>
          <strong>{user?.pessoa?.nome_pessoa}</strong>
          <span>
            Matrícula: <strong>{
              (user?.deseg && user?.deseg?.matricula)
              || (user?.professor && user?.professor?.matricula)
              || (user?.vigilante && user?.vigilante?.matricula)}</strong>
          </span>
        </S.Card>

        <S.ButtonWrapper>
          {/* não sei adicionar icone*/}
          {user?.deseg && (
            <Button type="button" name="relatorioButton">
              R
            </Button>
          )}
          <Button type="button" name="solicitacoesButton" path="/solicitacoes">
            Solicitações
          </Button>
          {user?.deseg && (
            <Button
              type="button"
              name="cadastroButton"
              onClickFunction={abrirCadastro}
            >
              +
            </Button>
          )}
        </S.ButtonWrapper>

        <Modal visible={openDeseg} close={() => setOpenDeseg(false)}>
          <h2>Cadastros</h2>
          <br />
          {/* não sei se é a melhor solução, criar um vertical*/}
          <S.VerticalButtonWrapper>
            <Button type="button" name="desegButton" path="/usuarios/deseg">
              DESEG
            </Button>
            <Button
              type="button"
              name="professoresButton"
              path="/usuarios/professor"
            >
              Professores
            </Button>
            <Button
              type="button"
              name="vigilantesButton"
              path="/usuarios/vigilante"
            >
              Vigilantes
            </Button>
          </S.VerticalButtonWrapper>
        </Modal>

        <Modal visible={open || user?.professor?.id_departamento === 0}>
        <h2>Professor, por favor selecione sua coordenação.</h2>
          <br />
          <DepartamentoForm user={user} onConfirm={atualizar}/>
        </Modal>
      </S.Content>
    </S.HomeSection>
  );
};

export default Home;
