import { MdArrowDropDown } from 'react-icons/md';
import styled from 'styled-components';

export const Container = styled.div`
  width: 560px;
  height: 80px;

  position: relative;
`;

export const PlaceHolder = styled.div`
  position: absolute;
  color: #fff;

  font-size: 32px;
  height: 50%;

  font-weight: bold;
  left: 50%;
  top: -56%;

  display: flex;
  user-select: none;

  div {
    position: relative;
    left: -50%;

    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const ArrowIcon = styled(MdArrowDropDown)`
  position: absolute;
  color: #000;
  cursor: pointer;

  right: 10px;
  top: 30%;
`;

export const SelectContainer = styled.div`
  width: 100%;
  min-height: 100%;
  max-height: 25vh;

  background-color: #fff;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Option = styled.button`
  border: 0;
  outline: 0;
  background-color: transparent;

  width: 100%;
  min-height: 80px;

  cursor: pointer;

  font-family: Poppins;
  font-weight: bold;
  font-size: 28px;
`;
