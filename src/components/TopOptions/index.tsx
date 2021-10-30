import React, { useRef } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { Container } from './styles';

interface TopOptionsProps {
  buttonsQuantity: number;
}

const TopOptions: React.FC<TopOptionsProps> = ({
  children,
  buttonsQuantity,
}) => {
  const optionsRef = useRef<HTMLElement>(null);

  return (
    <Container ref={optionsRef} childrenQuantity={buttonsQuantity}>
      {children}
      <MdArrowDropDown size={32} />
    </Container>
  );
};

export default TopOptions;
