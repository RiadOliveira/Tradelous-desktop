import { MdArrowDropDown } from 'react-icons/md';
import styled from 'styled-components';

export const Container = styled.div`
  width: 560px;
  height: 80px;
  cursor: pointer;

  position: relative;
`;

export const PlaceHolder = styled.div`
  position: absolute;
  color: #fff;
  cursor: default;

  font-size: 32px;
  font-weight: bold;
  left: 50%;
  top: -105%;

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

  right: 10px;
  top: 30%;
`;

export const SelectContainer = styled.select`
  width: 100%;
  height: 100%;
  border: 0;
  outline: 0;

  background-color: #fff;
  border-radius: 5px;

  font-family: Poppins;
  font-weight: bold;
  font-size: 28px;

  text-align-last: center;
  text-align: center;

  appearance: none;
  -moz-appearance: none;
  cursor: pointer;

  option {
    font-size: 14px;
  }
`;
