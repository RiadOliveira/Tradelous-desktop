import React, { useState } from 'react';
import { MdStoreMallDirectory, MdPersonAdd } from 'react-icons/md';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import HalfPage from './HalfPage';

import { Container } from './styles';

const Main: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<'SignUp' | 'SignIn' | ''>(
    '',
  );

  return (
    <Container>
      <HalfPage
        header="Criar conta"
        content={
          selectedPage === 'SignUp' ? (
            <SignUp />
          ) : (
            <>
              <MdPersonAdd size={160} />
              Ainda não possui uma conta? Crie-a agora para iniciar a gestão.
            </>
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
            <>
              <MdStoreMallDirectory size={160} />
              Entrar no Tradelous para gerenciar produtos e vendas de sua
              empresa.
            </>
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
