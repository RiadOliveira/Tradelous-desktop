import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface SpinnerContainerProps {
  hasBackground?: boolean;
}

interface SpinnerProps {
  color: string;
  bigSpinner?: boolean;
}

export const Container = styled.div<SpinnerContainerProps>`
  position: ${({ hasBackground }) => (hasBackground ? 'absolute' : 'relative')};
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ hasBackground }) =>
    hasBackground ? 'rgba(0, 0, 0, 0.55)' : 'transparent'};

  z-index: 1;
`;

export const SpinnerContainer = styled.div`
  border-radius: 10px;
  padding: 20px 18px 4px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    color: ${shade(0.8, '#fff')};
    font-weight: bold;
  }
`;

export const Spinner = styled.div<SpinnerProps>`
  display: flex;
  justify-content: center;

  &::after {
    content: '';

    border: solid ${shade(0.3, '#fff')};

    ${({ bigSpinner }) =>
      bigSpinner
        ? css`
            width: 64px;
            height: 64px;

            border-width: 12px;
          `
        : css`
            width: 46px;
            height: 46px;

            border-width: 10px;
          `}

    border-radius: 50%;

    border-top-color: ${({ color }) => color};

    animation: loading 1s linear infinite;
  }

  @keyframes loading {
    to {
      transform: rotate(1turn);
    }
  }
`;
