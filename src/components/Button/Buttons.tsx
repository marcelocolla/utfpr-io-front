import { Button } from "./Button";

import * as S from "./styles";

type ButtonProps = {
  onClickLeft?: () => void;
  onClickRight?: () => void;
}

export const ButtonDeseg = ( props: ButtonProps ) => {
  return (
    <S.ButtonWrapper>
      {/* não sei adicionar icone*/}
      <Button
        type="button"
        name="relatorioButton"
        onClickFunction={props.onClickLeft}>
        R
      </Button>

      <Button
        type="button"
        name="solicitacoesButton"
        path="/solicitacoes">
        Solicitações
      </Button>

      <Button
        type="button"
        name="cadastroButton"
        onClickFunction={props.onClickRight}>
        +
      </Button>
    </S.ButtonWrapper>
  );
};

export const ButtonProfessor = () => {
  return (
    <S.ButtonWrapper>
      <Button
        type="button"
        name="solicitacoesButton"
        path="/solicitacoes">
        Solicitações
      </Button>
    </S.ButtonWrapper>
  );
};

export const ButtonVigilante = () => {
  return (
    <S.ButtonWrapper>
      <Button
        type="button"
        name="visitasButton"
        path="/visitas">
        Visitas
      </Button>

      <Button
        type="button"
        name="liberacoesButton"
        path="/liberacoes">
        Liberações
      </Button>
    </S.ButtonWrapper>
  );
};
