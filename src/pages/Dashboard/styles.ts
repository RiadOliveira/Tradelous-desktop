import styled from 'styled-components';
import { shade } from 'polished';
import { animated } from 'react-spring';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #dddddd;

  display: flex;
`;

export const MainContent = styled.main`
  width: 65.5%;
  height: 100vh;

  display: flex;
  flex-direction: column;
`;

export const MainScreenContent = styled.div`
  flex: 1;

  & > * {
    width: 100%;
    height: 100%;
  }
`;

export const SelectedScreenContent = styled(animated.div)`
  position: relative;
  max-height: 165px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

export const SelectScreenBar = styled.button`
  border: 0;
  outline: 0;
  cursor: pointer;

  width: 100%;
  height: 165px;

  background-color: #1c274e;
  border-top-right-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  ${SelectedScreenContent} {
    h2,
    svg {
      transition: 0.3s;
    }
  }

  &:hover {
    ${SelectedScreenContent} {
      h2 {
        font-size: 60px;
      }

      svg {
        width: 114px;
        height: 114px;
      }
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

export const SecondaryContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const UserBar = styled.button`
  border: 0;
  outline: 0;
  cursor: pointer;
  position: relative;

  height: 130px;
  border-bottom-left-radius: 20px;

  background-color: #49b454;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

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

export const UserAvatar = styled.img`
  width: 96px;
  height: 96px;

  border-radius: 50%;

  margin-right: 10px;
  border: 1.5px solid #c4c4c4;
`;

export const UserName = styled.h2`
  font-family: Poppins;
  font-weight: bolder;
  color: #fff;

  font-size: 36px;
`;

export const ListOfScreen = styled.div`
  flex: 1;
`;
