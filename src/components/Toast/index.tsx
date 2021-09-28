import React from 'react';
import { Container, MainText, SubText } from './styles';

const Toast: React.FC = () => {
  return (
    <Container>
      <MainText>
        <p>Cadastro concluído!</p>
      </MainText>

      <SubText>
        <p>Pronto para criar produtos</p>
      </SubText>
    </Container>
  );
};

export default Toast;
