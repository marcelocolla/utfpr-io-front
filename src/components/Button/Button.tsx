import { ReactNode } from "react";
import { useHistory } from "react-router";
import styled, { css } from "styled-components";

type ButtonProps = {
  type?: any;
  name: string;
  path?: string;
  small?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onClickFunction?: () => void;
};

export const ButtonStyled = styled.button<ButtonProps>`
  width: 100%;
  max-width: 315px;
  max-height: 70px;
  margin: 0 auto;
  padding: 2.4rem 0;
  border-radius: 30px;

  border: none;
  background: var(--color-orange-default);
  box-shadow: 0px 4px 12px var(--color-orange-box-shadow-dark);

  color: white;
  font-size: 1.7rem;
  line-height: 2.3rem;

  display: flex;
  justify-content: center;
  align-items: center;

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

  ${({ small }) =>
    small &&
    css`
      padding: 1.9rem 0;
    `}

  @media (min-width: 768px) {
    font-size: 2.3em;
    line-height: 3rem;
  }
`;

export const Button = ({
  name,
  type,
  path,
  small,
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
      small={small}
      disabled={disabled}
      type={type ?? "submit"}
      onClick={onClickFunction ?? handleAction}
      {...props}
    >
      {children}
    </ButtonStyled>
  );
};
