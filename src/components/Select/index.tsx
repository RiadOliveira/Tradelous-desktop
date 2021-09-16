import React, { useState } from 'react';
import { IconType } from 'react-icons';
import {
  Container,
  PlaceHolder,
  SelectContainer,
  Option,
  ArrowIcon,
} from './styles';

interface OptionProps {
  id: string;
  [key: string]: string;
}

interface SelectProps {
  placeHolder: string;
  Icon: IconType;
  data: OptionProps[];
  optionValueReference: string;
}

const Select: React.FC<SelectProps> = ({
  placeHolder,
  Icon,
  data,
  optionValueReference,
}) => {
  return (
    <Container>
      <PlaceHolder>
        <div>
          <Icon size={32} />
          <p>{placeHolder}</p>
        </div>
      </PlaceHolder>

      <ArrowIcon size={40} />

      <SelectContainer>
        {data?.map(value => (
          <Option key={value.id}>{value[optionValueReference]}</Option>
        ))}
      </SelectContainer>
    </Container>
  );
};

export default Select;
