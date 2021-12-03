import styled, { css } from 'styled-components';
import { shade } from 'polished';
import { MdArrowDropDown } from 'react-icons/md';

interface SelectProps {
  isOfDashboard?: boolean;
  disabled?: boolean;
}

interface OptionProps {
  isShowingOptions?: boolean;
  hasScrollBar?: boolean;
}

export const PlaceHolder = styled.div`
  position: absolute;
  font-family: Poppins;

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

export const Option = styled.button`
  border: 0;
  outline: 0;
  background-color: #fff;

  width: 100%;
  cursor: pointer;

  font-family: Poppins;

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
  outline: 0;

  display: flex;
  flex-direction: column;
  -ms-overflow-style: none;

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
            width: ${props.hasScrollBar ? '96%' : '100%'};

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

export const Container = styled.div<SelectProps>`
  width: ${({ isOfDashboard }) => (!isOfDashboard ? '560' : '420')}px;
  height: 80px;

  position: relative;

  ${({ disabled }) =>
    disabled &&
    css`
      ${Option} {
        color: ${shade(0.5, '#fff')};
        cursor: auto;

        &:hover {
          background-color: #fff;
        }
      }
    `}

  ${PlaceHolder} {
    ${({ isOfDashboard }) =>
      isOfDashboard
        ? css`
            color: #515151;
            font-size: 24px;
          `
        : css`
            color: #fff;
            font-size: 32px;
          `};
  }

  ${SelectContainer} {
    ${({ isOfDashboard }) =>
      isOfDashboard
        ? css`
            border: 2px solid #c4c4c4;
            border-radius: 20px;
          `
        : css`
            border-radius: 5px;
          `};
  }

  ${Option} {
    font-size: ${props => (props.isOfDashboard ? '26' : '28')}px;
    font-weight: ${props => (props.isOfDashboard ? 'normal' : 'bold')};
  }
`;

export const ArrowIcon = styled(MdArrowDropDown)`
  position: absolute;
  cursor: pointer;

  right: 10px;
  top: 30%;
`;
