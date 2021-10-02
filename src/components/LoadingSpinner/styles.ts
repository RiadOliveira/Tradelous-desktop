import { shade } from 'polished';
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

  background-color: rgba(0, 0, 0, 0.55);

  z-index: 1;
`;

export const SpinnerContainer = styled.div`
  background-color: #fff;

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
    width: 46px;
    height: 46px;

    border: 10px solid ${shade(0.3, '#fff')};
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
