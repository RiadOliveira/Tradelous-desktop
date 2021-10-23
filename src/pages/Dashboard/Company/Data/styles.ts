import styled from 'styled-components';
import { shade } from 'polished';
import { Form as Unform } from '@unform/web';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RegisterCompanyButton = styled.button`
  border: 0;
  outline: 0;

  position: absolute;
  left: 40px;

  background-color: #1c274e;

  width: 16%;
  height: 8%;

  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  font-family: Poppins;
  font-weight: bolder;
  font-size: 24px;
  color: ${shade(0.05, '#fff')};

  cursor: pointer;

  transition: 0.4s;

  &:hover {
    height: 10%;
    font-size: 28px;
  }
`;

export const EditIcon = styled.button`
  position: absolute;
  width: 250px;
  height: 250px;

  border: 0;
  outline: 0;

  background-color: rgba(0, 0, 0, 0.4);

  border-radius: 50%;

  transition: 0.4s;
  cursor: pointer;
`;

export const CompanyIcon = styled.div`
  width: 250px;
  height: 250px;
  background-color: #349beb;

  margin-top: 4%;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid ${shade(0.1, '#c4c4c4')};
  border-radius: 50%;

  ${EditIcon} {
    opacity: 0;
  }

  &:hover {
    ${EditIcon} {
      opacity: 1;
    }
  }
`;

export const CompanyImage = styled.img`
  width: 250px;
  height: 250px;

  border-radius: 50%;
`;

export const Form = styled(Unform)`
  width: 100%;
  margin-top: 8%;

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
