import styled, { keyframes } from "styled-components";

const fadeInAnimation = keyframes`  
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Container = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 1;
  height: 100vh;
  display: flex;
  position: fixed;
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Overlay = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 2;
  height: 100vh;
  position: fixed;
`;

export const Modal = styled.div`
  width: 90%;
  height: auto;
  max-height: 90%;
  max-width: 700px;
  z-index: 3;
  background: white;

  border-radius: 3rem;

  animation: ${fadeInAnimation} 0.5s linear;
`;

export const Header = styled.div`
  width: 100%;
  min-height: 6.6rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1.8rem 2.3rem 1.2rem 4.6rem;

  border-top-left-radius: 3rem;
  border-top-right-radius: 3rem;

  background: rgba(237, 237, 237, 1);

  h2 {
    font-weight: 500;
    font-size: 2rem;
    line-height: 3rem;
  }

  > div {
    width: 3.6rem;
    height: 3.6rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    transition: 0.2s;

    &:hover {
      cursor: pointer;
      background-color: rgba(221, 221, 223, 0.35);
    }

    svg {
      transform: rotate(45deg);
    }
  }
`;

export const Content = styled.div`
  padding: 3rem 4rem;
`;
