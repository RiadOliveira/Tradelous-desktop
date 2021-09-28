import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  border: 0;
  outline: 0;
  color: #fff;
  cursor: pointer;

  position: absolute;
  top: 10px;
  right: 10%;

  width: 310px;
  padding: 10px 0;

  background-color: #1c274e;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 10px;

  line-height: 0px;
`;

export const MainText = styled.section`
  font-size: 22px;

  border-bottom: 1px solid ${shade(0.3, '#fff')};
`;

export const SubText = styled.section`
  font-size: 18px;
`;
