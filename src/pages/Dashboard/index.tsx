import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { useAuth } from 'hooks/auth';
import { MdPerson } from 'react-icons/md';
import {
  Container,
  UserBar,
  UserImage,
  UserName,
  SelectPageBar,
} from './styles';

import Company from './Company';
import Products from './Products';
import Profile from './Profile';
import Sales from './Sales';

type Screen = 'Company' | 'Profile' | 'Products' | 'Sales';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedPage, setSelectedPage] = useState<Screen>('Company');

  return (
    <Container>
      <UserBar>
        {user.avatar ? (
          <UserImage src={user.avatar} />
        ) : (
          <MdPerson size={90} color="#1c274e" />
        )}

        <UserName>Ríad Oliveira de Morais</UserName>
      </UserBar>
    </Container>
  );
};

export default Dashboard;
