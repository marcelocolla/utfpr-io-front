import { useState } from "react";

import { Button } from "../Button/Button";
import { EditIcon } from "../Icons/EditIcon/EditIcon";
import { DeleteIcon } from "../Icons/DeleteIcon/DeleteIcon";

import * as S from "./styles";
import * as Wrapper from "../../components/Button/styles";
import styled from "styled-components";
import { Modal } from "../Modal";

type CardProps = {
  imageUrl?: string;
  key: number;
  name: string;
  leftInfo: string;
  rightInfo: string;
  onEdition?: () => void;
  onRemoval?: () => void;
};

const DeleteModalStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

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
        <Wrapper.ButtonWrapper>
          <Button
            name="editarButton" type="button"
            onClickFunction={props.onEdition}>
            <EditIcon color="white"/>
          </Button>
          <Button
            name="removerButton" type="button"
            onClickFunction={() => setConfirm(true)}>
            <DeleteIcon color="white"/>
          </Button>
        </Wrapper.ButtonWrapper>
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