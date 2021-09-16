import styled from 'styled-components';
import { animated } from 'react-spring';

export const Container = styled.div`
  width: 560px;
  height: 80px;
  border-radius: 5px;

  background-color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
`;

export const InputContainer = styled.input`
  width: 90%;
  height: 70%;

  outline: 0;
  border: 0;
  font-family: Poppins;
  font-size: 32px;

  text-align: center;

  &[type='number'] {
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

export const PlaceHolder = styled(animated.button)`
  position: absolute;
  color: #000;
  border: 0;
  background-color: transparent;

  left: 50%;

  font-size: 32px;
  font-weight: bold;

  display: flex;
  cursor: text;
  user-select: none;

  p {
    position: relative;
    left: -50%;
  }
`;
