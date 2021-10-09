import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 6%;
  max-height: 95%;
`;

export const Employee = styled.button`
  border: 0;
  outline: 0;

  background-color: #d6874e;
  width: 60%;
  height: 80px;

  border-radius: 16px;

  display: flex;
  align-items: center;

  text-align: start;

  gap: 16px;

  &:first-child {
    background-color: ${shade(0.2, '#d6874e')};
  }

  & + & {
    margin-top: 30px;
  }
`;

export const EmployeeIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 30px;

  margin-left: 16px;
`;

export const EmployeeImage = styled.img`
  width: 60px;
  height: 60px;

  border-radius: 30px;
`;

export const EmployeeData = styled.div`
  width: 75%;
  height: 68px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const EmployeeText = styled.div`
  font-family: Poppins;
  font-size: 18px;
  color: #fff;
`;
