import styled from 'styled-components';
import { animated } from 'react-spring';
import { Form } from '@unform/web';

export const Container = styled(animated.div)`
  font-family: Poppins;
  font-size: 24px;

  width: 100%;
  align-items: center;
  flex-direction: column;

  margin-top: -60px;
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

  width: 80%;
  justify-content: space-between;

  & ~ & {
    margin-top: 80px;
  }
`;

export const CheckBoxInput = styled.div`
  display: flex;
  width: 628px;
  gap: 16px;

  align-items: center;
  justify-content: center;

  input {
    -webkit-appearance: none;
    background-color: #fafafa;
    border: 1px solid #cacece;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
    padding: 9px;
    border-radius: 3px;
    position: relative;

    transition: 0.3s;

    &:hover {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1),
        inset 0px 1px 3px rgba(0, 0, 0, 0.1);

      background-color: #e9ecee;
    }

    &:checked {
      border: 1px solid #adb8c0;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
        inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05),
        inset 15px 10px -12px rgba(255, 255, 255, 0.1);
      color: #99a1a7;
    }

    &:checked:after {
      content: '\u2714';
      font-size: 20px;
      position: absolute;
      top: -2px;
      left: 2px;
      color: #1c274e;
    }
  }
`;
