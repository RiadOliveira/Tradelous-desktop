import { useToast } from 'hooks/toast';
import React, { useEffect } from 'react';
import { useTransition } from 'react-spring';
import { Container, ToastContainer, MainText, SubText } from './styles';

const Toast: React.FC = () => {
  const { toastProps, setToastProps } = useToast();

  const toastColors = {
    info: '#1c274e',
    success: '#1b6b1b',
    error: '#cf2b2b',
  };

  const toastTransition = useTransition(toastProps, {
    from: {
      marginTop: -80,
      opacity: 0,
    },
    enter: {
      marginTop: 0,
      opacity: 1,
    },
    leave: {
      marginTop: -80,
      opacity: 0,
    },
    config: {
      duration: 300,
    },
  });

  useEffect(() => {
    if (toastProps.isVisible) {
      setTimeout(
        () => setToastProps({ ...toastProps, isVisible: false }),
        4000,
      );
    }
  }, [setToastProps, toastProps]);

  const handleToastClick = () => {
    clearTimeout();

    setToastProps({
      ...toastProps,
      isVisible: false,
    });
  };

  return (
    <Container>
      {toastTransition((style, item) => (
        <>
          {item.isVisible && (
            <ToastContainer
              onClick={handleToastClick}
              style={{
                ...style,
                background: toastProps.type && toastColors[toastProps.type],
              }}
            >
              <MainText>
                <p>{toastProps.text?.main}</p>
              </MainText>

              <SubText>
                <p>{toastProps.text?.sub}</p>
              </SubText>
            </ToastContainer>
          )}
        </>
      ))}
    </Container>
  );
};

export default Toast;
