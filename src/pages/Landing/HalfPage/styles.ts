import styled from 'styled-components';
import { animated } from 'react-spring';

export const Container = styled(animated.div)`
  width: 50%;
  height: 100%;

  color: #fff;
  border: none;
  position: relative;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

export const ButtonContainer = styled.button`
  position: absolute;
  width: 100%;
  height: 100%;

  opacity: 0;
  z-index: 1;
  cursor: pointer;
`;

export const Header = styled.header`
  position: absolute;
  top: 5%;

  display: flex;
  justify-content: center;

  font-size: 50px;
  font-family: Poppins;
`;
