import React from 'react';
import { Container, SpinnerContainer, Spinner } from './styles';

interface SpinnerProps {
  color: string;
  loadingText: string;
}

const LoadingSpinner: React.FC<SpinnerProps> = ({ color, loadingText }) => (
  <Container>
    <SpinnerContainer>
      <Spinner color={color} />
      <p>{loadingText}</p>
    </SpinnerContainer>
  </Container>
);

export default LoadingSpinner;
