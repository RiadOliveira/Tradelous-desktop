import React, {
  AllHTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useModal } from 'hooks/modal';
import { AnimatedProps } from 'react-spring';
import {
  Container,
  ModalContainer,
  ModalText,
  PickerContainer,
  ModalButton,
} from './styles';

type ModalProps = AnimatedProps<AllHTMLAttributes<HTMLDivElement>>;

interface DateType {
  day: number;
  month: number;
  year: number;
}

const ModalDatePicker: React.FC<ModalProps> = ({ style }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const { modalProps, hideModal } = useModal();
  const { buttonsProps } = modalProps;

  const actualDateObject = useMemo(() => {
    const actualDate = new Date(Date.now());

    return {
      day: actualDate.getDate(),
      month: actualDate.getMonth(),
      year: actualDate.getFullYear(),
    };
  }, []);

  const [pickerValue, setPickerValue] = useState<DateType>(actualDateObject);

  useEffect(() => {
    if (modalProps.type === 'datePicker') {
      modalRef.current?.focus();
    }

    return () => setPickerValue(actualDateObject);
  }, [actualDateObject, modalProps.type]);

  const confirmData = () => {
    setPickerValue(actualDateObject);
    buttonsProps?.first.actionFunction(
      `${pickerValue.day}-${pickerValue.month}-${pickerValue.year}`,
    );
    hideModal();
  };

  return (
    <Container
      ref={modalRef}
      tabIndex={0}
      onKeyUp={event => {
        if (event.key === 'Escape') {
          setPickerValue(actualDateObject);
          hideModal();
        }
      }}
      style={style}
    >
      <ModalContainer>
        {/* onMouseLeave={hideModal} */}
        <ModalText>{modalProps.text}</ModalText>

        <PickerContainer
          onKeyPress={key => key.code === 'Enter' && confirmData()}
        >
          <input
            type="text"
            pattern="\d*"
            maxLength={2}
            defaultValue={pickerValue.day.toString()}
          />
          /
          <input
            type="text"
            pattern="\d*"
            maxLength={2}
            defaultValue={pickerValue.month.toString()}
          />
          /
          <input
            style={{
              width: '28%',
              marginLeft: '1%',
              textAlign: 'start',
            }}
            type="text"
            pattern="\d*"
            maxLength={4}
            defaultValue={pickerValue.year.toString()}
          />
        </PickerContainer>

        <ModalButton
          onClick={() => buttonsProps && confirmData()}
          color={buttonsProps?.first.color}
        >
          {buttonsProps?.first.text}
        </ModalButton>
      </ModalContainer>
    </Container>
  );
};

export default ModalDatePicker;
