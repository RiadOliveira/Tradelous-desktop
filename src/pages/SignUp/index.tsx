import React from 'react';
import { useSpring } from 'react-spring';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, InputLine, CheckBoxInput } from './styles';

const SignUp: React.FC = () => {
  const animatedProps = useSpring({
    from: {
      opacity: 0,
      display: 'none',
    },
    to: {
      opacity: 1,
      display: 'flex',
    },
    config: {
      duration: 1000,
    },
    delay: 1000,
  });

  return (
    <Container style={animatedProps}>
      <InputLine>
        <Input placeholder="Nome" />
        <Input placeholder="E-mail" />
      </InputLine>

      <InputLine>
        <Input placeholder="Senha" />
        <Input placeholder="Cpf" />
      </InputLine>

      <InputLine>
        <Input placeholder="Confirmar senha" />
        <CheckBoxInput>
          <p>Dono da empresa?</p>
          <input type="checkbox" />
        </CheckBoxInput>
      </InputLine>

      <Button
        color="#1c274e"
        text="Confirmar"
        style={{ position: 'absolute', bottom: 80 }}
      />
    </Container>
  );
};

export default SignUp;
