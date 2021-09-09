import styled from 'styled-components';
import { animated } from 'react-spring';
import { Form } from '@unform/web';

export const Container = styled(animated.div)`
  font-family: Poppins;
  font-size: 24px;

  flex-direction: column;

  align-items: center;
`;

export const FormContainer = styled(Form)`
  margin-bottom: 80px;
`;
