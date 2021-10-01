import styled from 'styled-components';
import { animated } from 'react-spring';
import { Form } from '@unform/web';
import { shade } from 'polished';

export const Container = styled(animated.div)`
  font-family: Poppins;
  font-size: 24px;

  flex-direction: column;

  align-items: center;
`;

export const ForgotPasswordButton = styled.button`
  outline: 0;
  border: 0;

  width: fit-content;
  background-color: transparent;

  color: #fff;
  font-family: Poppins;
  font-weight: bold;
  font-size: 18px;

  cursor: pointer;

  transition: color 0.2s;

  &:hover {
    color: ${shade(0.15, '#fff')};
  }
`;

export const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
