import { ReactNode } from "react";
import styled from "styled-components";

type FormProps = {
  children: ReactNode;
};

const FormFooterStyled = styled.div<FormProps>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const FormFooter = ({ children }: FormProps) => {
  return <FormFooterStyled>{children}</FormFooterStyled>;
};
