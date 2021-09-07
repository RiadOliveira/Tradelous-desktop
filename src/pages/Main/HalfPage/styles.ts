import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface HalfPageProps {
  $isFull: boolean;
}

export const Container = styled(animated.button)<HalfPageProps>`
  width: 50%;
  height: 100%;

  color: #fff;
  border: none;
  position: relative;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  ${props =>
    !props.$isFull &&
    css`
      cursor: pointer;
      transition: width 0.5s;

      &:hover {
        width: 56%;
      }
    `}

  div {
    font-family: Poppins;
    font-size: 22px;
    width: 48%;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 24px;
  }
`;

export const Header = styled.header`
  position: absolute;
  top: 5%;

  display: flex;
  justify-content: center;

  font-size: 50px;
  font-family: Poppins;
`;
