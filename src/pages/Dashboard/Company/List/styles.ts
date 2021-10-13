import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: scroll;

  margin-top: 6%;
  height: 84vh;
`;

export const Employee = styled.button`
  border: 0;
  outline: 0;

  width: 60%;
  height: 80px;

  border-radius: 16px;

  display: flex;
  align-items: center;

  text-align: start;

  margin-bottom: 30px;

  &:first-child {
    background-color: ${shade(0.3, '#d6874e')};
  }

  &:not(&:first-child) {
    background-color: #d6874e;
    transition: background 0.3s;
  }

  &:not(&:first-child):hover {
    background-color: ${shade(0.1, '#d6874e')};
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
