import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CompanyIcon = styled.div`
  max-width: 250px;
  max-height: 250px;

  margin-top: 5%;
  margin-bottom: 7%;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid ${shade(0.1, '#c4c4c4')};
  border-radius: 50%;
`;

export const CompanyImage = styled.img`
  width: 250px;
  height: 250px;

  border-radius: 50%;
`;
