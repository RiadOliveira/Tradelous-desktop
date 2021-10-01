import styled from 'styled-components';
import { animated } from 'react-spring';
import { Form } from '@unform/web';

export const Container = styled(animated.div)`
  font-family: Poppins;
  font-weight: bolder;

  font-size: 24px;
  color: #fff;
  background: #1c274e;

  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.header`
  position: absolute;
  top: 5%;

  display: flex;
  justify-content: center;

  font-size: 50px;
  font-family: Poppins;
`;

export const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
