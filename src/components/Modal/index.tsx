import React, { AllHTMLAttributes, useEffect, useRef } from 'react';
import { useModal } from 'hooks/modal';
import { AnimatedProps } from 'react-spring';
import {
  Container,
  ModalContainer,
  ModalText,
  ButtonsContainer,
  ModalButton,
} from './styles';

type ModalProps = AnimatedProps<AllHTMLAttributes<HTMLDivElement>>;

const Modal: React.FC<ModalProps> = ({ style }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const { modalProps, hideModal } = useModal();
  const { buttonsProps } = modalProps;

  useEffect(() => {
    if (modalProps.type === 'ordinary') {
      modalRef.current?.focus();
    }
  }, [modalProps.type]);

  return (
    <Container
      ref={modalRef}
      tabIndex={0}
      onKeyUp={event => event.key === 'Escape' && hideModal()}
      style={style}
    >
      <ModalContainer onMouseLeave={hideModal}>
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

          {buttonsProps?.second && (
            <ModalButton
              onClick={() => {
                if (buttonsProps?.second) {
                  buttonsProps.second.actionFunction();
                  hideModal();
                }
              }}
              color={buttonsProps?.second?.color}
            >
              {buttonsProps?.second?.text}
            </ModalButton>
          )}
        </ButtonsContainer>
      </ModalContainer>
    </Container>
  );
};

export default Modal;
