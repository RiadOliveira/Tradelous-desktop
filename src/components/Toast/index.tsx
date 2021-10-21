import React, { useEffect, useState } from 'react';
import { MdInfo, MdCheck, MdCancel } from 'react-icons/md';
import { useToast } from 'hooks/toast';
import { useTransition } from 'react-spring';
import { Container, ToastContainer, MainText, SubText } from './styles';

const Toast: React.FC = () => {
  const { toastProps, hideToast } = useToast();

  const [isRunningTimer, setIsRunningTimer] = useState(false);

  const toastTypesProps = {
    info: {
      color: '#1c274e',
      icon: <MdInfo />,
    },
    success: { color: '#1b6b1b', icon: <MdCheck /> },
    error: { color: '#c43535', icon: <MdCancel /> },
  };

  const toastTransition = useTransition(isRunningTimer, {
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
    if (!isRunningTimer && toastProps.isVisible) {
      setTimeout(() => {
        hideToast();
        setIsRunningTimer(false);
      }, 4000);

      setIsRunningTimer(true);
    }
  }, [hideToast, toastProps, isRunningTimer]);

  const handleToastClick = () => {
    clearTimeout();

    setIsRunningTimer(false);
    hideToast();
  };

  return (
    <Container isOfAuth={toastProps.isOfAuth}>
      {toastTransition((style, item) => (
        <>
          {item && (
            <ToastContainer
              onClick={handleToastClick}
              style={{
                ...style,
                background:
                  toastProps.type && toastTypesProps[toastProps.type].color,
              }}
            >
              <MainText>
                <p>{toastProps.text?.main}</p>
                {toastProps.type && toastTypesProps[toastProps.type].icon}
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
