import styled from "styled-components";

export const HomeSection = styled.section`
  width: 100%;
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

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100%;

    // card
    .card {
      padding: 4.8rem 6.9rem 3.2rem;
      display: flex;

      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      background: #ffffff;
      box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.03);
      border-radius: 2rem;

      gap: 1.6rem;

      strong {
        font-size: 2.4rem;
        line-height: 3.2rem;
        font-weight: 700;
        text-align: center;

        margin: unset;
      }

      span {
        font-weight: normal;
        font-size: 1.5rem;
        line-height: 2rem;
        color: #fa4a0c;

        strong {
          font-size: 1.5rem;
        }
      }
    }

    a {
      background: #fa4a0c;
      border-radius: 30px;
      border: 0px;

      padding: 2.5rem 8.8rem;

      font-weight: bold;
      font-size: 17px;
      line-height: 23px;
      color: #ffffff;

      text-decoration: none;
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
  }
`;
