import { useSpring } from 'react-spring';
import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';

import { IconType } from 'react-icons';
import { Container, InputContainer, PlaceHolder } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  Icon: IconType;
}

const Input: React.FC<InputProps> = ({
  name,
  placeholder,
  style,
  Icon,
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
      top: -78,
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

  // PlaceHolde action
  const placeHolderHandle = useCallback(() => {
    setPlaceHolderState('out');
    inputRef.current?.focus();
  }, []);

  return (
    <Container style={style}>
      <PlaceHolder
        type="button"
        onClick={placeHolderHandle}
        onFocus={placeHolderHandle}
        style={placeHolderAnimation}
      >
        <div>
          <Icon size={32} />
          <p>{placeholder}</p>
        </div>
      </PlaceHolder>

      <InputContainer
        ref={inputRef}
        onBlur={() => !inputRef.current?.value && setPlaceHolderState('in')}
        onFocus={() => setPlaceHolderState('out')}
        onKeyPress={key => key.code === 'Enter' && inputRef.current?.blur()}
        {...props}
      />
    </Container>
  );
};

export default Input;
