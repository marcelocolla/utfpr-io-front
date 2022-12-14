import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button/Button";
import { Header } from "../../components/Header/Header";
import RelatorioForm from "../../components/Forms/RelatorioForm";
import DepartamentoForm from "../../components/Forms/DepartamentoForm";
import {
  ButtonDeseg,
  ButtonProfessor,
  ButtonVigilante,
} from "../../components/Button/Buttons";

import * as S from "./styles";

const Home = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [openDeseg, setOpenDeseg] = useState(false);
  const [openRelatorio, setRelatorio] = useState(false);

  // o perfil Professor seleciona sua coordenação no primeiro login,
  // o que atualiza seu perfil e consequentemente, atualiza a página
  function atualizar() {
    setOpen(false);
    history.go(0);
  }

  // abre a opção de visualização de cadastros para o perfil DESEG
  // DESEG pode adicionar Deseg e Vigilante, e visualizar Professor
  function abrirCadastro() {
    setOpenDeseg(true);
  }

  function abrirRelatorio() {
    setRelatorio(true);
  }

  return (
    <S.HomeSection>
      <Header header="Home" home />
      <S.Content>
        <S.Card>
          <div>
            <img src="Ellipse 2.png" alt="Avatar" />
          </div>
          <strong>{user?.pessoa?.nome_pessoa}</strong>
          <span>
            Matrícula:{" "}
            <strong>
              {(user?.deseg && user?.deseg?.matricula) ||
                (user?.professor && user?.professor?.matricula) ||
                (user?.vigilante && user?.vigilante?.matricula)}
            </strong>
          </span>
        </S.Card>

        <S.ButtonWrapper>
          {user?.deseg && (
            <ButtonDeseg
              onClickLeft={abrirRelatorio}
              onClickRight={abrirCadastro}
            />
          )}
          {user?.professor && <ButtonProfessor />}
          {user?.vigilante && <ButtonVigilante />}
        </S.ButtonWrapper>

        <Modal
          visible={openRelatorio}
          title="Geração de Relatório"
          close={() => setRelatorio(false)}
        >
          <S.VerticalButtonWrapper>
            <RelatorioForm />
          </S.VerticalButtonWrapper>
        </Modal>

        <Modal
          visible={openDeseg}
          title="Cadastros"
          close={() => setOpenDeseg(false)}
        >
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
          <DepartamentoForm user={user} onConfirm={atualizar} />
        </Modal>
      </S.Content>
    </S.HomeSection>
  );
};

export default Home;
