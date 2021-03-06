import React, { AllHTMLAttributes, useEffect, useRef, useState } from 'react';
import { useModal } from 'hooks/modal';
import { AnimatedProps } from 'react-spring';
import {
  Container,
  ModalContainer,
  ModalText,
  InputContainer,
  ModalButton,
} from './styles';

type ModalProps = AnimatedProps<AllHTMLAttributes<HTMLDivElement>>;

const ModalInput: React.FC<ModalProps> = ({ style }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { modalProps, hideModal } = useModal();
  const { buttonsProps } = modalProps;

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (modalProps.type === 'withInput') inputRef.current?.focus();
  }, [modalProps.type]);

  const confirmData = () => {
    buttonsProps?.first.actionFunction(inputValue);
    hideModal();
  };

  return (
    <Container
      tabIndex={0}
      onKeyUp={event => event.key === 'Escape' && hideModal()}
      style={style}
    >
      <ModalContainer onMouseLeave={hideModal}>
        <ModalText>{modalProps.text}</ModalText>

        <InputContainer
          ref={inputRef}
          type={modalProps.isSecureEntry ? 'password' : 'text'}
          value={modalProps.initialValue || inputValue}
          spellCheck={false}
          onChange={event => setInputValue(event.target.value)}
          onKeyPress={key => key.code === 'Enter' && confirmData()}
        />

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

export default ModalInput;
