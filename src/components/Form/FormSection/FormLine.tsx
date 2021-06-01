import { ReactNode } from "react";
import styled from "styled-components";

type FormProps = {
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  children: ReactNode;
};

const FormLineStyled = styled.div<FormProps>`
  gap: 2rem;
  width: 100%;
  display: flex;

  margin-top: ${({ mt }) => (mt ? mt : "0px")};
  margin-right: ${({ mr }) => (mr ? mr : "0px")};
  margin-bottom: ${({ mb }) => (mb ? mb : "0px")};
  margin-left: ${({ ml }) => (ml ? ml : "0px")};
`;

export const FormLine = ({ mt, mr, mb, ml, children }: FormProps) => {
  return (
    <FormLineStyled mt={mt} mr={mr} mb={mb} ml={ml}>
      {children}
    </FormLineStyled>
  );
};
