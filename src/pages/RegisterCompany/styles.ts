import styled from 'styled-components';
import { Form } from '@unform/web';

export const Container = styled.div`
  font-family: Poppins;
  font-weight: bolder;
  font-size: 24px;
  color: #fff;
  background: #49b454;

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

  margin-top: -60px;
`;

export const InputLine = styled.div`
  display: flex;

  width: 75%;
  justify-content: space-between;

  & ~ & {
    margin-top: 100px;
  }
`;
