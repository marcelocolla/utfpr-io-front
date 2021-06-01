import { ReactNode } from "react";
import styled from "styled-components";

type FormProps = {
  children: ReactNode;
};

const FormBodyStyled = styled.div<FormProps>`
  flex: 1;
`;

export const FormBody = ({ children }: FormProps) => {
  return <FormBodyStyled>{children}</FormBodyStyled>;
};
