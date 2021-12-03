import styled, { css } from 'styled-components';
import { shade } from 'polished';
import { Form as Unform } from '@unform/web';

interface SwitchButtonProps {
  isSelected?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const IconsContainer = styled.div`
  display: flex;
  margin: 3.5% 0;

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

  position: relative;

  &:before {
    width: 254px;
    height: 254px;

    background: transparent;
    border: 20px solid #dddddd;
    border-radius: 50%;

    content: '';

    position: absolute;
    pointer-events: none;

    z-index: 1;
  }
`;

export const SaleContentTitle = styled.aside`
  position: absolute;

  bottom: 10%;

  background-color: rgba(0, 0, 0, 0.65);
  color: #fff;

  font-family: Poppins;
  text-align: center;
  font-weight: bold;
  font-size: 15px;

  width: 80%;

  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

export const SaleContentImage = styled.img`
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

export const SwitchButton = styled.button<SwitchButtonProps>`
  outline: 0;
  border: 0;
  cursor: pointer;

  width: ${({ isSelected }) => (isSelected ? '100%' : '50%')};
  height: 100%;
  border-radius: 18px;

  color: #fff;
  font-family: Poppins;
  font-weight: bolder;
  font-size: 22px;

  transition: 0.5s;

  ${({ isSelected }) =>
    !isSelected &&
    css`
      &:hover {
        width: 65%;
      }
    `}
`;

export const MethodSwitch = styled.div`
  width: 420px;
  min-height: 70px;
  border-radius: 20px;

  background-color: #fff;
  border: 2px solid #c4c4c4;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
`;

export const PlaceHolder = styled.div`
  position: absolute;
  color: #515151;

  top: -70%;

  font-size: 22px;
  font-weight: bold;
  font-family: Poppins;

  display: flex;
  justify-content: center;
  align-items: center;

  user-select: none;

  svg {
    margin-bottom: 2%;
  }
`;
