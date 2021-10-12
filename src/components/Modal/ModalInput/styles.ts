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
  height: 340px;

  border-radius: 10px;
  background-color: #fff;

  position: relative;

  display: flex;
  justify-content: center;
`;

export const ModalText = styled.h1`
  font-family: Poppins;

  text-align: center;
  width: 85%;

  margin-top: 50px;
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
