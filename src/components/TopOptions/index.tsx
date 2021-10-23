import React, { useRef } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { Container } from './styles';

const TopOptions: React.FC = ({ children }) => {
  const optionsRef = useRef<HTMLElement>(null);

  return (
    <Container
      ref={optionsRef}
      childrenQuantity={(optionsRef.current?.children.length || 5) - 1}
    >
      {children}
      <MdArrowDropDown size={32} />
    </Container>
  );
};

export default TopOptions;
