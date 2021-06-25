import styled from "styled-components";

export const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;

  * {
    font-weight: bold !important;
  }
`;

export const Header = styled.div`
  width: 100%;
  height: 36.7rem;

  background-color: #fff;
  border-bottom-left-radius: 3rem;
  border-bottom-right-radius: 3rem;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.06);

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-end;

  gap: 20%;

  span {
    padding-bottom: 1.2rem;

    font-weight: bold;
    font-size: 1.8rem;
    line-height: 2.5rem;

    position: relative;

    &::after {
      content: "";
      width: 13.4rem;
      height: 3px;

      top: 100%;
      left: 50%;
      position: absolute;

      transform: translate(-50%, -50%);

      border-radius: 40px;
      background-color: var(--color-orange-default);
      box-shadow: 0px 4px 12px var(--color-orange-box-shadow-dark);
    }
  }
`;

export const Body = styled.div`
  width: 100%;
  height: 55%;
  padding: 5.4rem 5rem 4rem;
  position: relative;

  @media (max-height: 568px) {
    padding-bottom: 2rem;
  }

  @media (min-width: 768px) {
    form {
      margin: 0 auto;
      width: 50%;
    }
  }
`;
