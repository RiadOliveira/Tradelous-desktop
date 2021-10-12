import React from 'react';
import { useModal } from 'hooks/modal';
import { useTransition } from 'react-spring';
import { Container, ModalContainer, ModalText, ModalButton } from './styles';

const ModalInput: React.FC = () => {
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

  return (
    <>
      {modalTransition(
        (style, item) =>
          item.isVisible &&
          !item.buttonsProps?.second && (
            <Container style={style}>
              <ModalContainer>
                <ModalText>{modalProps.text}</ModalText>

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
              </ModalContainer>
            </Container>
          ),
      )}
    </>
  );
};

export default ModalInput;
