import React, { useEffect, useRef, useState } from 'react';
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
  setFunction: (optionId: string) => void;
}

const Select: React.FC<SelectProps> = ({
  placeHolder,
  Icon,
  data,
  optionValueReference,
  setFunction,
}) => {
  const selectRef = useRef<HTMLDivElement>(null);

  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [isShowingOptions, setIsShowingOptions] = useState(false);

  const handleSelectOption = (index: number) => {
    setIsShowingOptions(false);
    setSelectedOption(index);
  };

  useEffect(() => {
    if (isShowingOptions && selectRef.current) {
      selectRef.current.scrollTo({ top: selectedOption * 60 });
    }
  }, [selectedOption, isShowingOptions]);

  useEffect(() => {
    if (data.length > 0) {
      setFunction(data[selectedOption].id);
    }
  }, [data, selectedOption, setFunction]);

  const handleKeyPress = (key: string) =>
    setSelectedOption(() => {
      const findedIndex = data.findIndex(
        value => value[optionValueReference][0] === key.toUpperCase(),
      );

      if (findedIndex === -1) {
        return 0;
      }

      return findedIndex;
    });

  return (
    <Container>
      <PlaceHolder>
        <div>
          <Icon size={32} />
          <p>{placeHolder}</p>
        </div>
      </PlaceHolder>

      <SelectContainer
        tabIndex={0}
        onKeyUp={({ key }) => handleKeyPress(key)}
        onMouseLeave={() => setIsShowingOptions(false)}
        isShowingOptions={isShowingOptions}
        ref={selectRef}
        style={{ overflowY: isShowingOptions ? 'scroll' : 'hidden' }}
      >
        {!isShowingOptions ? (
          <Option
            onClick={() => {
              setIsShowingOptions(true);
              selectRef.current?.focus();
            }}
          >
            <ArrowIcon size={40} />
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
