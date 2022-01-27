import React, {
  ButtonHTMLAttributes,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSpring } from 'react-spring';
import { Container, ButtonContainer, Header } from './styles';

interface HalfPageProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  header: string;
  content: ReactNode;
  $isFull: boolean;
  isHidden: boolean;
}

const HalfPage: React.FC<HalfPageProps> = ({
  header,
  content,
  style,
  $isFull,
  isHidden,
  ...props
}) => {
  const animationStates = useMemo(
    () => [
      {
        from: {
          width: '50%',
        },
        to: {
          width: '100%',
          zIndex: 1,
          position: 'absolute',
        },
        config: {
          duration: 500,
        },
      },
      {
        from: {
          width: '50%',
        },
        to: {
          position: 'absolute',
          zIndex: -1,
          width: '30%',
        },
        config: {
          duration: 170,
        },
      },
      {
        from: {
          position: 'absolute',
          zIndex: -1,
        },
        to: {
          zIndex: 1,
          position: 'relative',
          width: '50%',
        },
        config: {
          duration: 300,
        },
      },
    ],
    [],
  );

  const hoverStates = useMemo(
    () => [
      {
        from: {
          width: '50%',
        },
        to: {
          width: '56%',
        },
        config: {
          duration: 250,
        },
      },
      {
        from: {
          width: '56%',
        },
        to: {
          width: '50%',
        },
        config: {
          duration: 250,
        },
      },
    ],
    [],
  );

  const [selectedAnimation, setSelectedAnimation] = useState({});
  const [selectedHoverState, setSelectedHoverState] = useState({});

  useEffect(() => {
    if (
      // When goes back to HalfPage style.
      (selectedAnimation === animationStates[0] && !$isFull) ||
      (selectedAnimation === animationStates[1] && !isHidden)
    ) {
      setTimeout(() => setSelectedAnimation(animationStates[2]), 600);
      setTimeout(() => true, 300); // In order to wait animation time to set another state.
    } else if (!$isFull && !isHidden) setSelectedAnimation(selectedHoverState);
    else if ($isFull) setSelectedAnimation(animationStates[0]);
    else if (isHidden) setSelectedAnimation(animationStates[1]);
  }, [
    $isFull,
    animationStates,
    isHidden,
    selectedAnimation,
    selectedHoverState,
  ]);

  const handleHoverState = (state: number) => {
    if (!$isFull && !isHidden) setSelectedHoverState(hoverStates[state]);
  };

  const animationProps = useSpring(selectedAnimation);

  return (
    <Container
      style={{ ...style, ...animationProps }}
      onMouseOver={() => handleHoverState(0)}
      onMouseOut={() => handleHoverState(1)}
    >
      {!$isFull && <ButtonContainer {...props} />}

      <Header>
        <strong>{header}</strong>
      </Header>

      <>{content}</>
    </Container>
  );
};

export default HalfPage;
