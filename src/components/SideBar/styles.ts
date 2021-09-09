import styled, { css } from 'styled-components';

interface SideBarProps {
  side: 'left' | 'right';
}

export const Container = styled.button<SideBarProps>`
  position: absolute;
  top: 0;
  ${({ side }) =>
    css`
      ${side === 'left' ? 'left: 0' : 'right: 0'};
    `}

  border: 0;
  outline: 0;
  cursor: pointer;

  height: 100%;
  width: 45px;

  background-color: rgba(0, 0, 0, 0.15);

  display: flex;

  align-items: center;
  justify-content: center;

  svg {
    width: 35px;
    height: 35px;

    color: #fff;

    transition: 0.2s;
  }

  &:hover {
    svg {
      width: 45px;
      height: 45px;
    }
  }
`;
