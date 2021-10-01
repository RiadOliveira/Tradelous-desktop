import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { Container } from './styles';

const GoBackButton: React.FC = () => (
  <Container>
    <MdKeyboardArrowLeft color="#fff" size={48} />
  </Container>
);

export default GoBackButton;
