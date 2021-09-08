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
  max-width: 460px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  gap: 24px;
`;
