import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.aside`
  position: absolute;
  top: -100px;
  left: 40px;

  width: 160px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;

  display: flex;
  align-items: center;
  flex-direction: column;

  background-color: ${shade(0.15, '#dddddd')};

  transition: top 0.4s;

  button {
    border: 0;
    outline: 0;
    background-color: #dddddd;

    font-family: Poppins;
    font-size: 14px;
    border-radius: 5px;

    width: 140px;
    height: 40px;

    margin-top: 10px;
    cursor: pointer;

    transition: 0.3s;

    &:hover {
      background-color: #1c274e;
      color: #fff;
    }
  }

  &:hover {
    top: 0;
  }
`;