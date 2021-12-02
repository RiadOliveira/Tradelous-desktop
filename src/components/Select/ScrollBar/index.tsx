import React, { useMemo } from 'react';
import { useSpring } from 'react-spring';
import GetScreenVhInPixels from 'utils/getScreenVhInPixels';
import { Container, ScrollIndicator } from './styles';

interface ScrollBarProps {
  scrollTop: number;
  dataLength: number;
  isOfDashboard?: boolean;
}

const ScrollBar: React.FC<ScrollBarProps> = ({
  scrollTop,
  dataLength,
  isOfDashboard = false,
}) => {
  const maxDistance = useMemo(() => GetScreenVhInPixels(20.5), []);
  const margin =
    4 +
    (scrollTop * (dataLength > 25 ? 4 : 4.2)) /
      (dataLength * (dataLength < 50 ? 1 : 1.158));

  const scrollAnimation = useSpring({
    to: {
      marginTop: margin > maxDistance ? maxDistance : margin,
    },
  });

  const appearAnimation = useSpring({
    from: { minHeight: GetScreenVhInPixels(2) },
    to: { minHeight: GetScreenVhInPixels(24) },
    config: {
      duration: 300,
    },
  });

  return (
    <Container style={{ ...appearAnimation, top: isOfDashboard ? 6 : 4 }}>
      <ScrollIndicator style={scrollAnimation} />
    </Container>
  );
};

export default ScrollBar;
