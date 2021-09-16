import React, { SelectHTMLAttributes } from 'react';
import { IconType } from 'react-icons';
import { Container, PlaceHolder, SelectContainer } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  placeHolder: string;
  Icon: IconType;
}

const Select: React.FC<SelectProps> = ({
  children,
  placeHolder,
  Icon,
  ...props
}) => {
  return (
    <Container>
      <PlaceHolder>
        <div>
          <Icon size={32} />
          <p>{placeHolder}</p>
        </div>
      </PlaceHolder>

      <SelectContainer {...props}>{children}</SelectContainer>
    </Container>
  );
};

export default Select;
