import styled from 'styled-components';

interface SpinnerProps {
  color: string;
}

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.5);

  z-index: 1;
`;

export const SpinnerContainer = styled.div``;

export const Spinner = styled.div<SpinnerProps>`
  display: flex;
  justify-content: center;

  &::after {
    content: '';
    width: 50px;
    height: 50px;

    border: 10px solid #ddd;
    border-radius: 50%;

    border-top-color: ${({ color }) => color};

    animation: loading 0.8s linear infinite;
  }

  @keyframes loading {
    to {
      transform: rotate(1turn);
    }
  }
`;
