import React from 'react';
import { useModal } from 'hooks/modal';
import { useTransition } from 'react-spring';
import {
  Container,
  ModalContainer,
  ModalText,
  ButtonsContainer,
  ModalButton,
} from './styles';

const Modal: React.FC = () => {
  const { modalProps, hideModal } = useModal();
  const { buttonsProps } = modalProps;

  const modalTransition = useTransition(modalProps.isVisible, {
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
          item && (
            <Container style={style}>
              <ModalContainer>
                <ModalText>{modalProps.text}</ModalText>

                <ButtonsContainer>
                  <ModalButton
                    onClick={() => {
                      if (buttonsProps) {
                        buttonsProps.first.actionFunction();
                        hideModal();
                      }
                    }}
                    color={buttonsProps?.first.color}
                  >
                    {buttonsProps?.first.text}
                  </ModalButton>

                  <ModalButton
                    onClick={() => {
                      if (buttonsProps) {
                        buttonsProps.second.actionFunction();
                        hideModal();
                      }
                    }}
                    color={buttonsProps?.second.color}
                  >
                    {buttonsProps?.second.text}
                  </ModalButton>
                </ButtonsContainer>
              </ModalContainer>
            </Container>
          ),
      )}
    </>
  );
};

export default Modal;
