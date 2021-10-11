import React from 'react';
import { Container, SpinnerContainer, Spinner } from './styles';

interface SpinnerProps {
  color: string;
  hasBackground?: boolean;
  loadingText?: string;
}

const LoadingSpinner: React.FC<SpinnerProps> = ({
  color,
  hasBackground = false,
  loadingText,
}) => (
  <Container hasBackground={hasBackground}>
    <SpinnerContainer
      style={{ background: loadingText ? '#fff' : 'transparent' }}
    >
      <Spinner bigSpinner={!loadingText} color={color} />
      <p>{loadingText}</p>
    </SpinnerContainer>
  </Container>
);

export default LoadingSpinner;
