import React, { useMemo } from 'react';
import { useSpring } from 'react-spring';
import GetScreenVhInPixels from 'utils/GetScreenVhInPixels';
import { Container, ScrollIndicator } from './styles';

interface ScrollBarProps {
  scrollTop: number;
  dataLength: number;
}

const ScrollBar: React.FC<ScrollBarProps> = ({ scrollTop, dataLength }) => {
  const maxDistance = useMemo(() => GetScreenVhInPixels(20.5), []);
  const margin =
    4 + (4 * scrollTop) / (dataLength * (dataLength < 50 ? 1 : 1.158));

  const animations = useSpring({
    to: {
      marginTop: margin > maxDistance ? maxDistance : margin,
    },
  });

  return (
    <Container>
      <ScrollIndicator style={animations} />
    </Container>
  );
};

export default ScrollBar;
