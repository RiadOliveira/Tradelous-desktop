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

  option {
    font-size: 14px;
  }
`;
