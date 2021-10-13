import React, { useEffect, useRef } from 'react';
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
  const modalRef = useRef<HTMLDivElement>(null);

  const { modalProps, hideModal } = useModal();
  const { buttonsProps } = modalProps;

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
          item.buttonsProps?.second && (
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
                </ButtonsContainer>
              </ModalContainer>
            </Container>
          ),
      )}
    </>
  );
};

export default Modal;
