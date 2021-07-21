import { useState } from "react";

import { Modal } from "../Modal";
import { Button } from "../Button/Button";
import { EditIcon } from "../Icons/EditIcon/EditIcon";
import { DeleteIcon } from "../Icons/DeleteIcon/DeleteIcon";

import * as S from "./styles";
import styled from "styled-components";

export const ButtonWrapperStyled = styled.div`
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  padding-top: 2rem;
`;

const DeleteModalStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

type CardProps = {
  imageUrl?: string;
  key: number;
  name: string;
  leftInfo: string;
  rightInfo: string;
  removeDisabled?: boolean;
  onEdition?: () => void;
  onRemoval?: () => void;
};

export const Card = (props: CardProps) => {

  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);

  return (
    <>
    <S.Card 
      key={props.key} 
      onClick={() => {setOpen(!open)}}>

      <div className={open ? "card-open" : "card-closed"}>
        {/* parte esquerda, avatar */}
        <div className="imageWrapper">
          <img src={props.imageUrl ?? "/dog.png"} alt="avatar" />
        </div>

        {/* parte direita, informações gerais */}
        <div>
        <h1>{props.name}</h1>
          <div>
            <span>{props.leftInfo}</span>
            <strong>{props.rightInfo}</strong>
          </div>
        </div>
      </div>

      {/* botões de editar e deletar */}
      <div className={open ? "options-open" : "options-closed"}>
        <ButtonWrapperStyled>
          <Button
            name="editarButton" type="button"
            onClickFunction={props.onEdition}>
            <EditIcon color="white"/>
          </Button>
          <Button
            name="removerButton" type="button" disabled={props.removeDisabled}
            onClickFunction={() => setConfirm(true)}>
            <DeleteIcon color="white"/>
          </Button>
        </ButtonWrapperStyled>
      </div>
    </S.Card>

    <Modal
      visible={confirm}
      close={() => setConfirm(false)}
      title="Deseja remover esse registro?">
      <DeleteModalStyled>
        <Button name="deleteBtnYes" onClickFunction={props.onRemoval}>
          Sim
        </Button>
        <Button name="deleteBtnNo" onClickFunction={() => setConfirm(false)}>
          Não
        </Button>
      </DeleteModalStyled>
    </Modal>
    </>
  );
};