import { useHistory } from "react-router-dom";

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

  function redirect() {
    history.push("/solicitacoes");
    window.location.reload();
  }

  return (
    <S.HomeSection>
      <strong>Home</strong>

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

        {dados.escopoPerfil === "deseg" ? (
          <>
            <button onClick={redirect}>Solicitações</button>
            <button>+</button>
          </>
        ) : (
          <>
            <button onClick={redirect}>Solicitações</button>
          </>
        )}
      </div>
    </S.HomeSection>
  );
};

export default Home;
