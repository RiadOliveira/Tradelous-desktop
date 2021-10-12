import React from 'react';
import { useModal } from 'hooks/modal';
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

  return (
    <>
      {modalProps.isVisible && (
        <Container>
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
                {buttonsProps?.first.text}Atualizar
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
                {buttonsProps?.second.text}Deletar
              </ModalButton>
            </ButtonsContainer>
          </ModalContainer>
        </Container>
      )}
    </>
  );
};

export default Modal;
