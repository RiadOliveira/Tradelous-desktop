import React, { useMemo } from 'react';
import { useSpring } from 'react-spring';
import { Container, ScrollIndicator } from './styles';

interface ScrollBarProps {
  scrollTop: number;
  dataLength: number;
}

const getScreenVh = (value: number) => {
  const screenHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0,
  );

  return (value * screenHeight) / 100;
};

const ScrollBar: React.FC<ScrollBarProps> = ({ scrollTop, dataLength }) => {
  const maxDistance = useMemo(() => getScreenVh(20.5), []);
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
