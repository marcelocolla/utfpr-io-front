import styled from "styled-components";

export const SolicitacoesWrapper = styled.section`
  width: 100%;
  height: 100vh;

  padding: 6rem 4.5rem 4rem;

  display: flex;
  flex-direction: column;

  align-items: center;

  background: rgb(245, 245, 248);

  strong {
    font-size: 1.8rem;
    line-height: 2.5rem;
    font-weight: 700;
    margin-bottom: 4rem;
  }

  .cardsWrapper {
    width: 100%;
    height: 80%;

    padding: 0 0.5rem;

    overflow-y: auto;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 1.6rem;
  }

  button {
    background: #fa4a0c;
    border-radius: 30px;
    border: 0px;

    padding: 2.5rem 8.8rem;

    font-weight: bold;
    font-size: 17px;
    line-height: 23px;
    color: #ffffff;
  }
`;

export const Card = styled.div`
  width: 100%;
  max-width: 40rem;
  height: 100%;

  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 20px;

  padding: 1.6rem;
  gap: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;

  cursor: pointer;

  transition: 0.25s;

  &:hover {
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.15);
  }

  .imageWrapper {
    max-width: 70px;
    height: auto;

    border-radius: 50%;

    img {
      width: 100%;
      height: auto;
    }
  }

  div {
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: center;

    gap: 8px;

    h1 {
      font-weight: bold;
      font-size: 17px;
      line-height: 23px;
    }

    span,
    strong {
      font-size: 15px;
      line-height: 20px;

      color: #fa4a0c;
    }

    div {
      width: 100%;
      height: fit-content;

      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;

      span {
        font-weight: normal;
      }

      strong {
        font-weight: bold;
        margin-bottom: 0;
        margin-left: 8px;

        position: relative;

        ::before {
          content: "";
          width: 4px;
          height: 4px;
          border-radius: 2px;
          background: #fa4a0c;
          position: absolute;
          left: -8px;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
`;
