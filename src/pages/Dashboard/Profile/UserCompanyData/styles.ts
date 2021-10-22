import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 80%;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  font-family: Poppins;

  strong {
    font-size: 48px;
    margin-top: 40px;
  }

  small {
    font-size: 24px;
  }
`;

export const CompanyIcon = styled.div`
  width: 300px;
  height: 300px;
  background-color: #349beb;

  margin-top: 4%;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 3px solid ${shade(0.1, '#c4c4c4')};
  border-radius: 50%;
`;

export const CompanyImage = styled.img`
  width: 300px;
  height: 300px;

  border-radius: 50%;
`;

export const NoCompanyText = styled.h2`
  width: 80%;
  text-align: center;
`;
