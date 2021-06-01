import { useHistory } from "react-router-dom";
import { Button } from "../../components/Button/Button";

import * as S from "./styles";

type DadosProps = {
  id?: number;
  nome?: string;
  matricula?: number;
  avatar?: string;
  escopoPerfil?: string;
};

type Props = {
  dados: DadosProps;
};

const Home = ({ dados }: Props) => {
  const history = useHistory();

  return (
    <S.HomeSection>
      <strong onClick={() => history.goBack()}>Home</strong>

      <div className="content">
        <div className="card">
          <div>
            <img src="Ellipse 2.png" alt="Avatar" />
          </div>
          <strong>{dados.nome}</strong>
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
