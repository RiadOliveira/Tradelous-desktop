import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { useAuth } from 'hooks/auth';
import { RiArchiveFill } from 'react-icons/ri';
import { MdDomain, MdPerson, MdShoppingBasket } from 'react-icons/md';
import { IconType } from 'react-icons';
import {
  Container,
  UserBar,
  UserImage,
  UserName,
  SelectPageBar,
  SelectedPage,
} from './styles';

import Company from './Company';
import Products from './Products';
import Profile from './Profile';
import Sales from './Sales';

interface Screen {
  name: string;
  text: string;
  Icon: IconType;
}

const screens: Record<string, Screen> = {
  company: {
    name: 'Company',
    text: 'Empresa',
    Icon: MdDomain,
  },
  profile: {
    name: 'Profile',
    text: 'Perfil',
    Icon: MdPerson,
  },
  products: {
    name: 'Products',
    text: 'Produtos',
    Icon: RiArchiveFill,
  },
  sales: {
    name: 'Sales',
    text: 'Vendas',
    Icon: MdShoppingBasket,
  },
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedPage, setSelectedPage] = useState<Screen>(screens.company);

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

      <SelectPageBar>
        <selectedPage.Icon size={106} color="#fff" />

        <SelectedPage>{selectedPage.text}</SelectedPage>
      </SelectPageBar>
    </Container>
  );
};

export default Dashboard;
