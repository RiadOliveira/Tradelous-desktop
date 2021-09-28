import styled from 'styled-components';
import { animated } from 'react-spring';
import { shade } from 'polished';

export const Container = styled(animated.button)`
  border: 0;
  outline: 0;
  color: #fff;
  cursor: pointer;

  position: absolute;
  top: 16px;
  right: 4%;

  width: 310px;
  padding: 10px 0;

  background-color: #1c274e;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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

  border-bottom: 1px solid ${shade(0.2, '#fff')};
`;

export const SubText = styled.section`
  font-size: 18px;
`;
