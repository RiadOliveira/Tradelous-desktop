import React, { useEffect, useRef, useState } from 'react';
import { useModal } from 'hooks/modal';
import { useTransition } from 'react-spring';
import {
  Container,
  ModalContainer,
  ModalText,
  InputContainer,
  ModalButton,
} from './styles';

const ModalInput: React.FC = () => {
  const modalRef = useRef<HTMLDivElement>(null);

  const { modalProps, hideModal } = useModal();
  const { buttonsProps } = modalProps;

  const [inputValue, setInputValue] = useState('');

  const modalTransition = useTransition(modalProps, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      delay: 200,
    },
    leave: {
      opacity: 0,
    },
    config: {
      duration: 400,
    },
  });

  useEffect(() => {
    if (modalProps.isVisible) {
      modalRef.current?.focus();
    }
  }, [modalProps.isVisible]);

  return (
    <>
      {modalTransition(
        (style, item) =>
          item.isVisible &&
          !item.buttonsProps?.second && (
            <Container
              ref={modalRef}
              tabIndex={0}
              onKeyUp={event => event.key === 'Escape' && hideModal()}
              style={style}
            >
              <ModalContainer onMouseLeave={hideModal}>
                <ModalText>{modalProps.text}</ModalText>

                <InputContainer
                  type={buttonsProps?.first.isSecureEntry ? 'password' : 'text'}
                  value={inputValue}
                  onChange={event => setInputValue(event.target.value)}
                  onKeyPress={key => {
                    if (key.code === 'Enter') {
                      setInputValue('');
                      hideModal();
                      buttonsProps?.first.actionFunction(inputValue);
                    }
                  }}
                />

                <ModalButton
                  onClick={() => {
                    if (buttonsProps) {
                      buttonsProps.first.actionFunction(inputValue);
                      hideModal();
                    }
                  }}
                  color={buttonsProps?.first.color}
                >
                  {buttonsProps?.first.text}
                </ModalButton>
              </ModalContainer>
            </Container>
          ),
      )}
    </>
  );
};

export default ModalInput;
