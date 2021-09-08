import styled from 'styled-components';
import { shade } from 'polished';

interface ButtonProps {
  background: string;
}

export const Container = styled.button<ButtonProps>`
  border: 0;
  outline: 0;
  background: ${props => props.background};

  font-family: Poppins;
  font-size: 38px;
  font-weight: bold;
  color: #fff;

  width: 280px;
  height: 120px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  cursor: pointer;

  transition: background 0.4s;

  &:hover {
    background: ${({ background }) => shade(0.2, background)};
  }
`;
