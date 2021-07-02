import styled from "styled-components";

export const HomeSection = styled.section`
  width: 100%;
  /* min-height: 100vmax; */
  height: 100vh;
  padding: 6rem 5rem 4rem;

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
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
`;

export const DetailedCard = styled.div`
  padding: 3rem 1.8rem 2.5rem;
  display: flex;
  margin: 2rem auto;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background: #ffffff;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.03);
  border-radius: 2rem;

  gap: 1.6rem;

  div {
    display: grid;
    justify-items: start;
    grid-template-columns: 10rem 14rem;
    grid-template-rows: 2rem 2rem 2rem 4rem;

    div {
      display: flex;
      font-weight: normal;
      font-size: 1.4rem;
      line-height: 2rem;
      color: var(--color-label);

      strong {
        line-height: 2rem;
        font-size: 1.4rem;
      }
    }
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1.6rem;

  padding-top: 3rem;
`;
