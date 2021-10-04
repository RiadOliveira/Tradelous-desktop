import styled from 'styled-components';
import { shade } from 'polished';
import { animated } from 'react-spring';

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

  transition: background 0.3s;

  &:hover {
    background-color: ${shade(0.1, '#49b454')};
  }

  &::after {
    content: '';

    position: absolute;
    left: 0;
    bottom: -68.5vh;

    height: 66vh;
    width: 2px;

    background-color: #c4c4c4;
    pointer-events: none;
  }
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

export const SelectScreenBar = styled.button`
  position: absolute;
  left: 0;
  bottom: 0;

  border: 0;
  outline: 0;
  cursor: pointer;

  width: 65.5%;
  height: 165px;

  background-color: #1c274e;
  border-top-right-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SelectedScreenContent = styled(animated.div)`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;

  h2,
  svg {
    transition: 0.3s;
  }

  &:hover {
    h2 {
      font-size: 60px;
    }

    svg {
      width: 114px;
      height: 114px;
    }
  }
`;

export const SelectedScreen = styled.h2`
  font-family: Poppins;
  font-weight: bolder;
  color: #fff;

  font-size: 56px;

  margin-top: 60px;
`;
