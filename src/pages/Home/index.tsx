import { useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

import { Button } from "../../components/Button/Button";

import * as S from "./styles";

const dados = {
  id: 0,
  nome: "Roberto Adalberto Nunes",
  matricula: 1231234,
  escopoPerfil: "deseg",
};

const Home = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  return (
    <S.HomeSection>
      <strong onClick={() => history.goBack()}>Home</strong>

      <div className="content">
        <div className="card">
          <div>
            <img src="Ellipse 2.png" alt="Avatar" />
          </div>
          <strong>{user?.email}</strong>
          <span>
            Matrícula: <strong>{dados.matricula}</strong>
          </span>
        </div>

        <Button type="button" name="solicitacoesButton" path="/solicitacoes">
          Solicitações
        </Button>
      </div>
    </S.HomeSection>
  );
};

export default Home;
