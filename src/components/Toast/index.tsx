import React, { useState } from 'react';
import { useTransition } from 'react-spring';
import { Container, MainText, SubText } from './styles';

const Toast: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toastTransition = useTransition(isVisible, {
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
          {item && (
            <Container onClick={() => setIsVisible(false)} style={style}>
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
