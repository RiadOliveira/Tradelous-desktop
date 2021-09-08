import styled from 'styled-components';
import { animated } from 'react-spring';

export const Container = styled.div`
  width: 360px;
  height: 30px;
  padding: 10px 16px 10px 12px;

  background-color: #fff;

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: relative;

  & ~ & {
    margin-top: 60px;
  }
`;

export const InputContainer = styled.input`
  flex: 1;
  max-width: 88%;

  outline: 0;
  border: 0;
  font-family: Poppins;
  font-size: 16px;

  text-align: center;
`;

export const PlaceHolder = styled(animated.button)`
  position: absolute;
  color: #000;
  border: 0;
  background-color: transparent;

  left: 36%;

  font-size: 18px;
  font-weight: bold;

  cursor: text;
`;
