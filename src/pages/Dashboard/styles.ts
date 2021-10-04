import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #dddddd;
`;

export const UserBar = styled.button`
  position: absolute;

  border: 0;
  outline: 0;
  cursor: pointer;

  right: 0;
  top: 0;

  width: 630px;
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

export const SelectPageBar = styled.button``;
