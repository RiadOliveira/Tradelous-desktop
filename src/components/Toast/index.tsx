import { useToast } from 'hooks/toast';
import React from 'react';
import { useTransition } from 'react-spring';
import { Container, MainText, SubText } from './styles';

const Toast: React.FC = () => {
  const { toastProps, setToastProps } = useToast();

  const toastColors = {
    info: '#1c274e',
    success: '#1b6b1b',
    error: '#cf2b2b',
  };

  const toastTransition = useTransition(toastProps, {
    from: {
      top: -80,
      opacity: 0,
    },
    enter: {
      top: 16,
      opacity: 1,
    },
    leave: {
      top: -80,
      opacity: 0,
    },
    config: {
      duration: 300,
    },
  });

  return (
    <>
      {toastTransition((style, item) => (
        <>
          {item.isVisible && (
            <Container
              onClick={() =>
                setToastProps({
                  isVisible: false,
                })
              }
              style={{
                ...style,
                background: toastProps.type && toastColors[toastProps.type],
              }}
            >
              <MainText>
                <p>Cadastro concluído!</p>
              </MainText>

              <SubText>
                <p>Pronto para criar produtos</p>
              </SubText>
            </Container>
          )}
        </>
      ))}
    </>
  );
};

export default Toast;
