import React, { ButtonHTMLAttributes } from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { Container } from './styles';

type GoBackButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const GoBackButton: React.FC<GoBackButtonProps> = props => (
  <Container {...props}>
    <MdKeyboardArrowLeft color="#fff" size={48} />
  </Container>
);

export default GoBackButton;
