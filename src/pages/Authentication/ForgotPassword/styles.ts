import styled from 'styled-components';
import { Form } from '@unform/web';
import { shade } from 'polished';

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
  gap: 20px;

  margin-top: -60px;
`;

export const HasTokenButton = styled.button`
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
