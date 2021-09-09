import React from 'react';

import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { Container } from './styles';

interface SideBarProps {
  side: 'left' | 'right';
  actionFunction: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ side, actionFunction }) => {
  return (
    <Container side={side} onClick={actionFunction}>
      <aside>
        {side === 'left' ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
      </aside>
    </Container>
  );
};

export default SideBar;
