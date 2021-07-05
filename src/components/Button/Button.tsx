import { ReactNode } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { Spinner } from "../Spinner/Spinner";

type ButtonProps = {
  type?: any;
  name: string;
  path?: string;
  loading?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onClickFunction?: () => void;
};

export const ButtonStyled = styled.button<ButtonProps>`
  width: 100%;
  max-width: 315px;
  max-height: 70px;
  margin: 0 auto;
  padding: 1.9rem 0;
  border-radius: 30px;

  border: none;
  background: var(--color-orange-default);
  box-shadow: 0px 4px 12px var(--color-orange-box-shadow-dark);

  color: white;
  font-size: 1.7rem;
  line-height: 2.3rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  &:hover {
    background: var(--color-orange-dark-10);
    box-shadow: 0px 4px 12px var(--color-orange-box-shadow-dark-hover);
  }

  &:focus {
    outline: 2px solid var(--color-orange-dark-20);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (min-width: 768px) {
    font-size: 2.3em;
    line-height: 3rem;
  }
`;

export const Button = ({
  name,
  type,
  path,
  loading,
  disabled,
  children,
  onClickFunction,
  ...props
}: ButtonProps) => {
  const history = useHistory();

  function handleAction() {
    if (type === "button") {
      history.push(`${path}`);
    }
  }

  return (
    <ButtonStyled
      id={name}
      name={name}
      disabled={disabled}
      loading={loading}
      type={type ?? "submit"}
      onClick={onClickFunction ?? handleAction}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </ButtonStyled>
  );
};
