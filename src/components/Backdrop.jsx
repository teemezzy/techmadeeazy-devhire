import { useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

const Backdrop = ({ children, show, handleClose }) => {
  const bgRef = useRef();

  const closeModal = (e) => {
    if (e.target === bgRef.current) {
      handleClose();
    }
  };

  return (
    <>
      {show && (
        <Container ref={bgRef} onClick={closeModal}>
          {children}
        </Container>
      )}
    </>
  );
};

export default Backdrop;
