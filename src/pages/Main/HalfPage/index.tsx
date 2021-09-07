import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { useSpring } from 'react-spring';
import { Container, Header } from './styles';

interface HalfPageProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  header: string;
  content: ReactNode;
  $isFull: boolean;
  isHidden: boolean;
  side: 'left' | 'right';
}

const HalfPage: React.FC<HalfPageProps> = ({
  header,
  content,
  style,
  $isFull,
  isHidden,
  side,
  ...props
}) => {
  const animationStates = [
    {
      from: {
        width: '50%',
      },
      to: {
        width: '100%',
        position: 'absolute',
        zIndex: 1,
      },
      config: {
        duration: 500,
      },
    },
    {
      to: {
        position: 'absolute',
        [side]: 0,
        zIndex: -1,
      },
    },
  ];

  const animationProps = useSpring(
    // eslint-disable-next-line no-nested-ternary
    $isFull ? animationStates[0] : isHidden ? animationStates[1] : {},
  );

  return (
    <Container
      style={{ ...style, ...animationProps }}
      $isFull={$isFull}
      {...props}
    >
      <Header>
        <strong>{header}</strong>
      </Header>

      <>{content}</>
    </Container>
  );
};

export default HalfPage;
