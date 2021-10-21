import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface IActionButton {
  adminButton: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: scroll;

  margin-top: 6%;
  height: 84vh;

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #c4c4c4;

    border-radius: 5px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${shade(0.2, '#c4c4c4')};

    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${shade(0.3, '#c4c4c4')};
  }
`;

export const ActionButton = styled.button<IActionButton>`
  border: 0;
  outline: 0;
  cursor: pointer;

  width: 65%;
  height: 80px;

  margin-bottom: 50px;
  margin-left: 10px;

  border-radius: 16px;
  gap: ${({ adminButton }) => (adminButton ? 16 : 8)}px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ adminButton }) =>
    adminButton ? '#1c274e' : shade(0.1, '#db3b3b')};

  strong {
    color: #fff;
    font-family: Poppins;
    font-size: 22px;
  }

  svg {
    transition: 0.4s;
  }

  &:hover {
    svg {
      ${({ adminButton }) =>
        !adminButton
          ? css`
              transform: rotate(-90deg);
            `
          : css`
              width: 64px;
              height: 64px;
            `}
    }
  }
`;

export const EmployeesContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  align-items: center;
`;

export const Employee = styled.button`
  border: 0;
  outline: 0;

  width: 65%;
  height: 80px;

  border-radius: 16px;

  display: flex;
  align-items: center;

  text-align: start;

  margin-left: 10px;
  margin-bottom: 30px;
  gap: 16px;

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
