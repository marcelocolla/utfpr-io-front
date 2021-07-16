import styled from "styled-components";

export const Card = styled.div`

  width: 100%;
  max-width: 40rem;
  display: flex;

  .card {
    width: 100%;
    height: 10rem;
  
    background: #ffffff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
  
    padding: 1.6rem;
    gap: 2rem;
    display: flex;
    overflow: hidden;
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
      gap: 8px;
  
      display: flex;
      flex-direction: column;
      justify-content: center;
  
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
  }

  .closed {
    position: absolute;
    width: 0rem;
    padding: 1rem;
    z-index: -1;
    height: 100vh;
  }

  .open {
    width: 14rem;
    transition: 0.3s all ease;

    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;
