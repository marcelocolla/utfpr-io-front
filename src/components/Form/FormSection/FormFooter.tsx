import { ReactNode } from "react";
import styled from "styled-components";

type FormProps = {
  mt?: string;
  children: ReactNode;
};

const FormFooterStyled = styled.div<FormProps>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  margin-top: ${({ mt }) => (mt ? mt : "0px")};
`;

export const FormFooter = ({ children, mt }: FormProps) => {
  return <FormFooterStyled mt={mt}>{children}</FormFooterStyled>;
};
