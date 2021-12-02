import styled from 'styled-components';
import { shade } from 'polished';
import { Form as Unform } from '@unform/web';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const IconsContainer = styled.div`
  display: flex;
  margin-top: 4%;
  margin-bottom: 6%;

  width: 64%;

  justify-content: space-between;
`;

export const SaleIcon = styled.div`
  width: 250px;
  height: 250px;
  background-color: #349beb;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid ${shade(0.1, '#c4c4c4')};
  border-radius: 50%;
`;

export const ProductImage = styled.img`
  width: 250px;
  height: 250px;

  border-radius: 50%;
`;

export const Form = styled(Unform)`
  width: 100%;
  margin-top: 6%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputLine = styled.div`
  width: 80%;

  display: flex;
  justify-content: space-between;

  & ~ & {
    margin-top: 100px;
  }
`;
