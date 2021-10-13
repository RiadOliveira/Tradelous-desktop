import React, { useState } from 'react';
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

  return (
    <>
      {modalTransition(
        (style, item) =>
          item.isVisible &&
          !item.buttonsProps?.second && (
            <Container style={style}>
              <ModalContainer onMouseLeave={hideModal}>
                <ModalText>{modalProps.text}</ModalText>

                <InputContainer
                  type="password"
                  value={inputValue}
                  onChange={event => setInputValue(event.target.value)}
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
