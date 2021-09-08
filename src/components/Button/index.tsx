import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color: string;
}

const Button: React.FC<ButtonProps> = ({ text, color, ...props }) => {
  return (
    <Container background={color} {...props}>
      {text}
    </Container>
  );
};

export default Button;
