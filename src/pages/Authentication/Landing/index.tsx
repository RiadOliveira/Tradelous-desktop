import React, { useState } from 'react';
import { useTransition } from 'react-spring';
import { MdDomain, MdPersonAdd } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { Container, Content } from './styles';

import SignIn from './SignIn';
import SignUp from './SignUp';
import HalfPage from './HalfPage';

const Landing: React.FC = () => {
  const { state } = useLocation() as { state: 'SignUp' | 'SignIn' | '' };

  const [selectedPage, setSelectedPage] = useState<'SignUp' | 'SignIn' | ''>(
    typeof state === 'string' ? state : '',
  );

  const transition = useTransition(selectedPage, {
    from: {
      opacity: 0,
      display: 'none',
    },
    enter: {
      opacity: 1,
      display: 'flex',
      delay: 500,
    },
    leave: {
      opacity: 0,
    },
    config: {
      duration: 500,
    },
  });

  const resetScreen = () => setSelectedPage('');

  return (
    <Container>
      <HalfPage
        header="Criar conta"
        content={
          <>
            {transition((style, item) =>
              !item ? (
                <Content style={style}>
                  <MdPersonAdd size={160} />
                  Ainda não possui uma conta? Crie-a agora para iniciar a
                  gestão.
                </Content>
              ) : (
                item === 'SignUp' && (
                  <SignUp animatedStyle={style} resetFunction={resetScreen} />
                )
              ),
            )}
          </>
        }
        style={{
          background: '#49B454',
          left: 0,
        }}
        isHidden={selectedPage === 'SignIn'}
        $isFull={selectedPage === 'SignUp'}
        disabled={!!selectedPage}
        onClick={() => setSelectedPage('SignUp')}
      />

      <HalfPage
        header="Fazer login"
        content={
          <>
            {transition((style, item) =>
              !item ? (
                <Content style={style}>
                  <MdDomain size={160} />
                  Entrar no Tradelous para gerenciar produtos e vendas de sua
                  empresa.
                </Content>
              ) : (
                item === 'SignIn' && (
                  <SignIn animatedStyle={style} resetFunction={resetScreen} />
                )
              ),
            )}
          </>
        }
        style={{
          background: '#1c274e',
          right: 0,
        }}
        isHidden={selectedPage === 'SignUp'}
        $isFull={selectedPage === 'SignIn'}
        disabled={!!selectedPage}
        onClick={() => setSelectedPage('SignIn')}
      />
    </Container>
  );
};

export default Landing;
