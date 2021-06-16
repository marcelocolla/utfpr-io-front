import React from "react";
import * as S from "./styles";

type ModalBasicProps = {
  close?: any;
  visible: boolean;
  children: React.ReactNode;
};

export const Modal = (params: ModalBasicProps) => {
  const { visible, close, children } = params;

  return (
    <>
      {visible && (
        <S.Container>
          <S.Overlay onClick={close} />
          <S.Modal>
            <S.Content>{children}</S.Content>
          </S.Modal>
        </S.Container>
      )}
    </>
  );
};
