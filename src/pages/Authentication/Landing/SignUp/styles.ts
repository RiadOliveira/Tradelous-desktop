import styled from 'styled-components';
import { animated } from 'react-spring';
import { Form } from '@unform/web';

export const Container = styled(animated.div)`
  font-family: Poppins;
  font-size: 24px;

  width: 100%;
  align-items: center;
  flex-direction: column;
`;

export const FormContainer = styled(Form)`
  font-family: Poppins;
  font-size: 24px;

  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const InputLine = styled.div`
  display: flex;

  width: 75%;
  justify-content: space-between;

  & ~ & {
    margin-top: 80px;
  }
`;
