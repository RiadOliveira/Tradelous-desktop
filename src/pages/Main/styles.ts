import styled from 'styled-components';
import { animated } from 'react-spring';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
`;

export const Content = styled(animated.div)`
  font-family: Poppins;
  font-size: 22px;
  width: 48%;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 24px;
`;
