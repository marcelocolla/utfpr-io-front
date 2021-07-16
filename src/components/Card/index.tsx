import { useState } from "react";

import * as S from "./styles";
import * as Wrapper from "../../components/Button/styles";
import { Button } from "../Button/Button";
import { EditIcon } from "../Icons/EditIcon/EditIcon";
import { DeleteIcon } from "../Icons/DeleteIcon/DeleteIcon";

type CardProps = {
  imageUrl?: string;
  key: number;
  name: string;
  leftInfo: string;
  rightInfo: string;
  onEdition?: () => void;
  onRemoval?: () => void;
};

export const Card = (props: CardProps) => {

  const [open, setOpen] = useState(false);

  return (
    <S.Card 
      key={props.key} 
      onClick={() => {setOpen(!open)}}>

      <div className="card">
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
      <div className={open ? "open" : "closed"}>
        <Wrapper.ButtonWrapper>
          <Button
            name="editarButton" type="button"
            onClickFunction={props.onEdition}>
            <EditIcon color="white"/>
          </Button>
          <Button
            name="removerButton" type="button"
            onClickFunction={props.onRemoval}>
            <DeleteIcon color="white"/>
          </Button>
        </Wrapper.ButtonWrapper>
      </div>
    </S.Card>
  );
};