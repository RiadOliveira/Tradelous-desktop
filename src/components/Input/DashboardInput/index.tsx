import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { IconType } from 'react-icons';
import { Container, InputContainer, PlaceHolder } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  Icon: IconType;
}

const DashboardInput: React.FC<InputProps> = ({
  name,
  placeholder,
  style,
  Icon,
  disabled,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField, defaultValue } = useField(name);
  const inputValueRef = useRef({ value: defaultValue });

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container style={style}>
      <PlaceHolder>
        <Icon size={42} />
        <p>{placeholder}</p>
      </PlaceHolder>

      <InputContainer
        ref={inputRef}
        onKeyPress={key => key.code === 'Enter' && inputRef.current?.blur()}
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={value => {
          inputValueRef.current.value = value;
        }}
        spellCheck={false}
        {...props}
      />
    </Container>
  );
};

export default DashboardInput;
