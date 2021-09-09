import styled from 'styled-components';
import { MdKeyboardArrowRight } from 'react-icons/md';

export const Icon = styled(MdKeyboardArrowRight)`
  width: 35px;
  height: 35px;

  transition: 0.2s;
`;

export const Container = styled.button`
  position: absolute;
  right: 0;
  top: 0;

  border: 0;
  outline: 0;
  cursor: pointer;

  height: 100%;
  width: 45px;

  background-color: rgba(0, 0, 0, 0.15);

  display: flex;

  align-items: center;
  justify-content: center;

  &:hover {
    ${Icon} {
      width: 45px;
      height: 45px;
    }
  }
`;
