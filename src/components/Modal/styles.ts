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
  z-index: 9999999;
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
  z-index: 999;
  height: 100vh;
  position: fixed;
`;

export const Modal = styled.div`
  width: 90%;
  height: 90%;
  max-width: 700px;
  z-index: 9999;

  padding: 3rem 4rem;

  background: white;

  overflow: hidden;
  border-radius: "4px";

  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
  animation: ${fadeInAnimation} 0.5s linear;
`;

export const Content = styled.div`
  margin-bottom: -6px;
`;
