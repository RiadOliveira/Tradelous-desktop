import React from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { Container } from './styles';

const TopOptions: React.FC = ({ children }) => {
  return (
    <Container>
      {children}
      <MdArrowDropDown size={32} />
    </Container>
  );
};

export default TopOptions;
