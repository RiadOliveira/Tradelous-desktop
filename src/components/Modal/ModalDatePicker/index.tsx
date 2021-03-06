import React, { AllHTMLAttributes, useEffect, useMemo, useRef } from 'react';
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

const ModalDatePicker: React.FC<ModalProps> = ({ style }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const dayInput = useRef<HTMLInputElement>(null);
  const monthInput = useRef<HTMLInputElement>(null);
  const yearInput = useRef<HTMLInputElement>(null);

  const { modalProps, hideModal } = useModal();
  const { buttonsProps } = modalProps;

  // Generate and get actualDateObject.
  const actualDateObject = useMemo(() => {
    let actualDate: { day: string; month: string; year: string };

    if (modalProps.initialValue) {
      const [day, month, year] = modalProps.initialValue.split('-');

      actualDate = {
        day,
        month,
        year,
      };
    } else {
      const actualDateValue = new Date(Date.now());

      actualDate = {
        day: actualDateValue.getDate().toString(),
        month: (actualDateValue.getMonth() + 1).toString(),
        year: actualDateValue.getFullYear().toString(),
      };
    }

    return actualDate;
  }, [modalProps.initialValue]);

  useEffect(() => {
    if (modalProps.type === 'datePicker') modalRef.current?.focus();
  }, [modalProps.type]);

  const confirmData = () => {
    buttonsProps?.first.actionFunction(
      `${dayInput.current?.value}-${monthInput.current?.value}-${yearInput.current?.value}`,
    );
    hideModal();
  };

  return (
    <Container
      ref={modalRef}
      tabIndex={0}
      onKeyUp={event => {
        if (event.key === 'Escape') hideModal();
      }}
      style={style}
    >
      <ModalContainer onMouseLeave={hideModal}>
        <ModalText>{modalProps.text}</ModalText>

        <PickerContainer
          onKeyPress={key => key.code === 'Enter' && confirmData()}
        >
          <input
            type="text"
            pattern="\d*"
            maxLength={2}
            defaultValue={actualDateObject.day}
            ref={dayInput}
          />
          /
          <input
            type="text"
            pattern="\d*"
            maxLength={2}
            defaultValue={actualDateObject.month}
            ref={monthInput}
          />
          /
          <input
            style={{
              width: '36%',
              textAlign: 'start',
            }}
            type="text"
            pattern="\d*"
            maxLength={4}
            defaultValue={actualDateObject.year}
            ref={yearInput}
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
