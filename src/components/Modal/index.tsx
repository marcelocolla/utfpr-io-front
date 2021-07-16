import React from "react";

import { PlusIcon } from "../Icons/PlusIcon/PlusIcon";

import * as S from "./styles";

type ModalBasicProps = {
  close?: any;
  title?: string;
  visible: boolean;
  children: React.ReactNode;
};

export const Modal = (params: ModalBasicProps) => {
  const { visible, close, children, title } = params;

  return (
    <>
      {visible && (
        <S.Container>
          <S.Overlay onClick={close} />
          <S.Modal>
            <S.Header>
              <h2>{title}</h2>
              <div onClick={close}>
                <PlusIcon color="#bebebe" />
              </div>
            </S.Header>
            <S.Content>{children}</S.Content>
          </S.Modal>
        </S.Container>
      )}
    </>
  );
};
