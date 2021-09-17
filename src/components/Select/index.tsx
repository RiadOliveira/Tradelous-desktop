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
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [isShowingOptions, setIsShowingOptions] = useState(false);

  const handleSelectOption = (index: number) => {
    setIsShowingOptions(false);
    setSelectedOption(index);
  };

  return (
    <Container>
      <PlaceHolder>
        <div>
          <Icon size={32} />
          <p>{placeHolder}</p>
        </div>
      </PlaceHolder>

      <ArrowIcon size={40} display={isShowingOptions ? 'none' : 'flex'} />

      <SelectContainer
        style={{ overflowY: isShowingOptions ? 'scroll' : 'hidden' }}
      >
        {!isShowingOptions ? (
          <Option onClick={() => setIsShowingOptions(true)}>
            {data.length > 0 && data[selectedOption][optionValueReference]}
          </Option>
        ) : (
          data?.map((value, index) => (
            <Option onClick={() => handleSelectOption(index)} key={value.id}>
              {value[optionValueReference]}
            </Option>
          ))
        )}
      </SelectContainer>
    </Container>
  );
};

export default Select;
