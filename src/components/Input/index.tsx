import { useSpring } from 'react-spring';
import React, { InputHTMLAttributes, useRef, useState } from 'react';

import { Container, InputContainer, PlaceHolder } from './styles';

const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  placeholder,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [placeHolderState, setPlaceHolderState] = useState<
    'in' | 'out' | 'none'
  >('none');

  // PlaceHolder animation
  const placeHolderStyles = {
    in: {
      top: -10,
      color: '#000',
    },
    out: {
      top: -76,
      color: '#fff',
    },
  };

  const placeHolderAnimations = {
    in: {
      from: placeHolderStyles.out,
      to: placeHolderStyles.in,
      config: {
        duration: 200,
      },
    },
    out: {
      from: placeHolderStyles.in,
      to: placeHolderStyles.out,
      config: {
        duration: 200,
      },
    },
    none: {},
  };

  const placeHolderAnimation = useSpring(
    placeHolderAnimations[placeHolderState],
  );

  return (
    <Container>
      <PlaceHolder
        onClick={() => {
          setPlaceHolderState('out');
          inputRef.current?.focus();
        }}
        style={placeHolderAnimation}
      >
        <p>{placeholder}</p>
      </PlaceHolder>

      <InputContainer
        ref={inputRef}
        onBlur={() => !inputRef.current?.value && setPlaceHolderState('in')}
        onClick={() => setPlaceHolderState('out')}
        {...props}
      />
    </Container>
  );
};

export default Input;
