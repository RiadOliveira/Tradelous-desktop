import { useSpring } from 'react-spring';
import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';

import { Container, InputContainer, PlaceHolder } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = ({
  name,
  placeholder,
  style,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [placeHolderState, setPlaceHolderState] = useState<
    'in' | 'out' | 'none'
  >('none');

  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

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
    <Container style={style}>
      <PlaceHolder
        type="button"
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
        onFocus={() => setPlaceHolderState('out')}
        {...props}
      />
    </Container>
  );
};

export default Input;
