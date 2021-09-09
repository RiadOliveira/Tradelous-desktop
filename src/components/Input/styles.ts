import styled from 'styled-components';
import { animated } from 'react-spring';

export const Container = styled.div`
  width: 600px;
  height: 60px;
  padding: 10px 16px 10px 12px;

  background-color: #fff;

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: relative;
`;

export const InputContainer = styled.input`
  flex: 1;

  outline: 0;
  border: 0;
  font-family: Poppins;
  font-size: 32px;

  text-align: center;
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

  p {
    position: relative;
    left: -50%;
  }
`;
