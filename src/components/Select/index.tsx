import React, { useEffect, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { differenceInSeconds } from 'date-fns';
import removeAccentuation from 'utils/RemoveAccentuation';
import {
  Container,
  PlaceHolder,
  SelectContainer,
  Option,
  ArrowIcon,
} from './styles';
import ScrollBar from './ScrollBar';

interface OptionProps {
  id: string;
  [key: string]: string;
}

interface SelectProps {
  placeHolder: string;
  Icon: IconType;
  data: OptionProps[];
  optionValueReference: string;
  isOfDashboard?: boolean;
  initialOptionPosition?: number;
  disabled?: boolean;
  setFunction: (optionId: string) => void;
}

interface ISearchedTextProps {
  text: string;
  time: Date;
}

const Select: React.FC<SelectProps> = ({
  placeHolder,
  Icon,
  data,
  optionValueReference,
  setFunction,
  isOfDashboard = false,
  initialOptionPosition = 0,
  disabled = false,
}) => {
  const selectRef = useRef<HTMLDivElement>(null);

  const [searchedTextProps, setSearchedTextProps] =
    useState<ISearchedTextProps>({} as ISearchedTextProps);

  const [selectedOption, setSelectedOption] = useState(initialOptionPosition);
  const [isShowingOptions, setIsShowingOptions] = useState(false);

  const [scrollTopDistance, setScrollTopDistance] = useState(0);

  const handleSelectOption = (index: number) => {
    setIsShowingOptions(false);
    setSelectedOption(index);
  };

  useEffect(() => {
    if (selectRef.current) {
      if (isShowingOptions) {
        selectRef.current.scrollTo({ top: selectedOption * 60 });

        selectRef.current.addEventListener('keydown', event => {
          if (event.code === 'Space') {
            event.preventDefault();
          }
        });
      } else {
        selectRef.current?.removeEventListener('keydown', () => null);
      }
    }
  }, [selectedOption, isShowingOptions]);

  useEffect(() => {
    if (data.length > 0) {
      setFunction(data[selectedOption].id);
    }
  }, [data, selectedOption, setFunction]);

  const handleKeyPress = (key: string) =>
    setSelectedOption(() => {
      let searchText: string;

      if (key === 'Enter') {
        setIsShowingOptions(false);
        searchText = searchedTextProps.text;
      } else {
        searchText = removeAccentuation(key.toLowerCase());

        if (
          searchedTextProps.time &&
          differenceInSeconds(new Date(Date.now()), searchedTextProps.time) < 1
        ) {
          searchText = removeAccentuation(
            (searchedTextProps.text + key).toLowerCase(),
          );
        }
      }

      const findedIndex = data.findIndex(value =>
        removeAccentuation(
          value[optionValueReference].toLowerCase(),
        ).startsWith(searchText),
      );

      if (findedIndex === -1) {
        setSearchedTextProps({ text: '', time: new Date(Date.now()) });

        return 0;
      }

      setSearchedTextProps({ text: searchText, time: new Date(Date.now()) });

      return findedIndex;
    });

  return (
    <Container isOfDashboard={isOfDashboard} disabled={disabled}>
      <PlaceHolder>
        <div>
          <Icon size={32} />
          <p>{placeHolder}</p>
        </div>
      </PlaceHolder>

      <SelectContainer
        tabIndex={0}
        onKeyUp={({ key }) => handleKeyPress(key)}
        onScroll={({ currentTarget: { scrollTop } }) =>
          setScrollTopDistance(scrollTop)
        }
        onMouseLeave={() => setIsShowingOptions(false)}
        isShowingOptions={isShowingOptions}
        ref={selectRef}
        style={{ overflowY: isShowingOptions ? 'scroll' : 'hidden' }}
      >
        {!isShowingOptions ? (
          <Option
            onClick={() => {
              if (!disabled) {
                setIsShowingOptions(true);
                selectRef.current?.focus();
              }
            }}
          >
            {!disabled && <ArrowIcon size={40} />}
            {data.length > 0 && data[selectedOption][optionValueReference]}
          </Option>
        ) : (
          <>
            {data.length > 4 && (
              <ScrollBar
                dataLength={data.length}
                scrollTop={scrollTopDistance}
                isOfDashboard={isOfDashboard}
              />
            )}

            {data?.map((value, index) => (
              <Option onClick={() => handleSelectOption(index)} key={value.id}>
                <p>{value[optionValueReference]}</p>
              </Option>
            ))}
          </>
        )}
      </SelectContainer>
    </Container>
  );
};

export default Select;
