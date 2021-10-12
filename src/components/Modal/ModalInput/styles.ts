import styled from 'styled-components';
import { animated } from 'react-spring';

interface ButtonProps {
  color?: string;
}

export const Container = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.55);

  z-index: 1;
`;

export const ModalContainer = styled.div`
  width: 600px;
  height: 380px;

  border-radius: 10px;
  background-color: #fff;

  position: relative;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  flex-direction: column;
`;

export const ModalText = styled.p`
  font-family: Poppins;
  font-weight: bold;
  font-size: 30px;

  text-align: center;
  width: 80%;

  margin: 0;
`;

export const InputContainer = styled.input`
  outline: 0;
  border: 0;

  width: 60%;
  height: 18%;

  border: 2px solid #c4c4c4;
  border-radius: 20px;

  font-family: Poppins;
  font-size: 26px;
  text-align: center;
`;

export const ModalButton = styled.button<ButtonProps>`
  outline: 0;
  border: 0;

  width: 230px;
  height: 80px;

  border-radius: 10px;
  cursor: pointer;

  font-family: Poppins;
  font-weight: bold;
  font-size: 24px;
  color: #fff;

  background-color: ${({ color }) => color};

  transition: font-size 0.3s;

  &:hover {
    font-size: 26px;
  }
`;
