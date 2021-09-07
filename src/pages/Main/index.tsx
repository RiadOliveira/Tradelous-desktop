import React, { useState } from 'react';
import { useSpring } from 'react-spring';
import { MdStoreMallDirectory, MdPersonAdd } from 'react-icons/md';
import { Container, Content } from './styles';

import SignIn from '../SignIn';
import SignUp from '../SignUp';
import HalfPage from './HalfPage';

const Main: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<'SignUp' | 'SignIn' | ''>(
    '',
  );

  const animationProps = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: {
      duration: 1000,
    },
  });

  return (
    <Container>
      <HalfPage
        header="Criar conta"
        content={
          selectedPage === 'SignUp' ? (
            <SignUp />
          ) : (
            <Content style={animationProps}>
              <MdPersonAdd size={160} />
              Ainda não possui uma conta? Crie-a agora para iniciar a gestão.
            </Content>
          )
        }
        style={{
          background: '#49B454',
          left: 0,
        }}
        side="left"
        isHidden={selectedPage === 'SignIn'}
        $isFull={selectedPage === 'SignUp'}
        onClick={() => setSelectedPage('SignUp')}
      />

      <HalfPage
        header="Fazer login"
        content={
          selectedPage === 'SignIn' ? (
            <SignIn />
          ) : (
            <Content style={animationProps}>
              <MdStoreMallDirectory size={160} />
              Entrar no Tradelous para gerenciar produtos e vendas de sua
              empresa.
            </Content>
          )
        }
        style={{
          background: '#1c274e',
          right: 0,
        }}
        side="right"
        isHidden={selectedPage === 'SignUp'}
        $isFull={selectedPage === 'SignIn'}
        onClick={() => setSelectedPage('SignIn')}
      />
    </Container>
  );
};

export default Main;
