import { animated } from 'react-spring';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #dddddd;
`;

export const UserBar = styled.button`
  position: absolute;
  right: 0;
  top: 0;

  border: 0;
  outline: 0;
  cursor: pointer;

  width: 640px;
  height: 130px;
  border-bottom-left-radius: 20px;

  background-color: #49b454;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

export const UserImage = styled.img`
  width: 90px;
  height: 90px;

  border-radius: 50%;
`;

export const UserName = styled.h2`
  font-family: Poppins;
  font-weight: bolder;
  color: #fff;

  font-size: 36px;
`;

export const SelectPageBar = styled.button`
  position: absolute;
  left: 0;
  bottom: 0;

  border: 0;
  outline: 0;
  cursor: pointer;

  width: 1210px;
  height: 165px;

  background-color: #1c274e;
  border-top-right-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SelectedPageContent = styled(animated.div)`
  position: relative;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

export const SelectedPage = styled.h2`
  font-family: Poppins;
  font-weight: bolder;
  color: #fff;

  font-size: 56px;

  margin-top: 60px;
`;
