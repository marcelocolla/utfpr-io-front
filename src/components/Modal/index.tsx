import styled from "styled-components";

const ModalWrapper = styled.div`
  width: 100%;
  height: 100vh;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);

  position: fixed;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  section {
    width: 50%;
    height: 50%;

    z-index: 999;

    background-color: #fff;
  }
`;

type ModalBasicProps = {
  open: boolean;
  close: any;
};

const Modal = (params: ModalBasicProps) => {
  const { open, close } = params;

  return (
    <>
      {open && (
        <ModalWrapper>
          <section onClick={close}>asd</section>
        </ModalWrapper>
      )}
    </>
  );
};

export default Modal;
