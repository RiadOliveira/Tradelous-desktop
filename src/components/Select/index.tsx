import React, { SelectHTMLAttributes } from 'react';
import { Container } from './styles';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const Select: React.FC<SelectProps> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default Select;
