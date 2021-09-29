import styled from 'styled-components';
import { animated } from 'react-spring';
import { shade } from 'polished';

export const Container = styled.aside`
  position: absolute;
  top: 16px;
  right: 4%;

  z-index: 1;
`;

export const ToastContainer = styled(animated.button)`
  border: 0;
  outline: 0;
  color: #fff;

  background-color: #1c274e;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 400px;
  padding: 10px 0;

  border-radius: 10px;

  line-height: 0px;

  &:hover {
    animation: shake 0.4s;
  }

  @keyframes shake {
    0% {
      margin-right: 1.5px;
    }
    20% {
      margin-right: 0px;
    }
    40% {
      margin-right: -1.5px;
    }
    60% {
      margin-right: 0px;
    }
    80% {
      margin-right: 1.5px;
    }
    100% {
      margin-right: 0px;
    }
  }
`;

export const MainText = styled.section`
  font-size: 22px;

  display: flex;
  align-items: center;
  gap: 8px;

  position: relative;

  svg {
    width: 24px;
    height: 24px;
  }

  &::after {
    content: '';
    width: 340px;
    height: 1px;

    right: -40px;
    top: 100%;

    position: absolute;

    background-color: ${shade(0.2, '#fff')};
  }
`;

export const SubText = styled.section`
  font-size: 18px;
`;
