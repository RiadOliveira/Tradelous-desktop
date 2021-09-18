import styled, { css } from 'styled-components';
import { shade } from 'polished';
import { MdArrowDropDown } from 'react-icons/md';

interface OptionProps {
  isShowingOptions?: boolean;
}

export const Container = styled.div`
  width: 560px;
  height: 80px;

  position: relative;
`;

export const PlaceHolder = styled.div`
  position: absolute;
  color: #fff;

  font-size: 32px;
  height: 50%;

  font-weight: bold;
  left: 50%;
  top: -58%;

  display: flex;
  user-select: none;

  div {
    position: relative;
    left: -50%;

    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const ArrowIcon = styled(MdArrowDropDown)`
  position: absolute;
  cursor: pointer;

  right: 10px;
  top: 30%;
`;

export const Option = styled.button`
  border: 0;
  outline: 0;
  background-color: #fff;

  width: 100%;
  cursor: pointer;

  font-family: Poppins;
  font-weight: bold;
  font-size: 28px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.3s;

  &:hover {
    background-color: ${shade(0.05, '#fff')};
  }
`;

export const SelectContainer = styled.div<OptionProps>`
  width: 100%;
  height: ${props => (props.isShowingOptions ? '25vh' : '100%')};

  background-color: #fff;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  -ms-overflow-style: none;

  outline: 0;

  transition: height 0.3s;

  &::-webkit-scrollbar {
    display: none;
  }

  ${props =>
    props.isShowingOptions
      ? css`
          & button:first-of-type {
            margin-top: 10px;
            border: none;
          }

          ${Option} {
            min-height: 60px;
            width: 96%;

            p {
              margin-left: 4.2%;
            }
          }
        `
      : css`
          ${Option} {
            min-height: 80px;
          }
        `}
`;
