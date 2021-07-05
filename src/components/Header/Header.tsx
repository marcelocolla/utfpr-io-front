import { useContext, useState } from "react";
import { useHistory } from "react-router";

import { useSnackbar } from "notistack";

import { AuthContext } from "../../contexts/AuthContext";

import { Modal } from "../Modal";

import { Button } from "../Button/Button";

import styled from "styled-components";

const HeaderStyled = styled.div`
  width: 100%;
  max-width: 33rem;
  height: auto;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;

  align-self: center;

  > div {
    width: 2.8rem;
    height: 2.6rem;

    padding-right: 2px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    transition: 0.2s;

    &:hover {
      cursor: pointer;
      background-color: rgba(221, 221, 223, 0.35);
    }
  }
  strong {
    font-weight: bold;
    font-size: 18px;
    line-height: 25px;
    justify-self: center;
  }
`;

const LogoutModalStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  margin-top: 2rem;
`;

type HeaderProps = {
  header: string;
  home?: boolean;
};

export const Header = ({ header, ...props }: HeaderProps) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { signOut } = useContext(AuthContext);

  function logOut() {
    signOut();
    enqueueSnackbar("Deslogado com sucesso!", {
      variant: "success",
      autoHideDuration: 3000,
    });
  }

  function handleClick() {
    if (props.home) {
      setOpen(true);
    } else {
      history.goBack();
    }
  }

  return (
    <>
      <HeaderStyled>
        <div onClick={handleClick}>
          <img src="/icon/arrow-left.svg" alt="Icone de voltar" />
        </div>
        <strong>{header}</strong>
      </HeaderStyled>
      <Modal visible={open}>
        <h2>Deseja sair?</h2>
        <LogoutModalStyled>
          <Button name="logoutBtnYes" onClickFunction={logOut}>
            Sim
          </Button>
          <Button name="logoutBtnNo" onClickFunction={() => setOpen(false)}>
            Não
          </Button>
        </LogoutModalStyled>
      </Modal>
    </>
  );
};
