import styled from 'styled-components';

export const Container = styled.button`
  outline: 0;
  border: 0;

  width: 64px;
  height: 64px;

  background: rgba(0, 0, 0, 0.2);
  border-radius: 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 5%;
  left: 2.5%;

  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.35);
  }
`;
