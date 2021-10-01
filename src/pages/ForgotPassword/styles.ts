import styled from 'styled-components';
import { Form } from '@unform/web';

export const Container = styled.div`
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

export const GoBackButton = styled.button`
  outline: 0;
  border: 0;

  width: 64px;
  height: 64px;

  background: rgba(0, 0, 0, 0.25);
  border-radius: 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 5%;
  left: 2.5%;

  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
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
  font-family: Poppins;
  font-size: 24px;

  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  margin-top: -60px;
`;
