import styled, { css } from 'styled-components';
import { shade } from 'polished';
import { Form as Unform } from '@unform/web';

interface BarCodeContainerProps {
  hasCode: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const ProductIcon = styled.div`
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

export const BarCodePlaceHolder = styled.div`
  color: #515151;

  font-size: 22px;
  font-weight: bold;
  font-family: Poppins;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  user-select: none;

  margin-bottom: 4px;

  transition: 1s;
`;

export const BarCodeContainer = styled.div<BarCodeContainerProps>`
  margin-top: 45px;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-family: Poppins;
    text-align: center;

    padding: 8px;
    background-color: #fff;
    border-radius: 4px;

    border: 1px solid #c4c4c4;

    opacity: 0;

    position: absolute;
    top: -30%;

    transition: 1s;
  }

  ${({ hasCode }) =>
    hasCode &&
    css`
      &:hover {
        p {
          opacity: 0.5;
          top: -15%;
        }

        ${BarCodePlaceHolder} {
          opacity: 0;
        }
      }
    `}
`;

export const BarCodeButton = styled.button`
  width: 420px;
  min-height: 74px;

  outline: 0;
  border: 0;
  font-family: Poppins;
  font-size: 26px;

  border-radius: 20px;
  background-color: #fff;
  border: 2px solid #c4c4c4;

  text-align: center;

  cursor: pointer;

  transition: 0.4s;

  &:hover {
    background-color: ${shade(0.4, '#fff')};
    color: #fff;
  }
`;
