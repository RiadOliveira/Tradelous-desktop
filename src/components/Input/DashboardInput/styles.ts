import styled from 'styled-components';

export const Container = styled.div`
  max-width: 420px;
  min-height: 70px;
  border-radius: 20px;

  background-color: #fff;
  border: 2px solid #c4c4c4;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
`;

export const InputContainer = styled.input`
  width: 92%;
  height: 75%;

  outline: 0;
  border: 0;
  font-family: Poppins;
  font-size: 26px;

  text-align: center;

  &[type='number'] {
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

export const PlaceHolder = styled.div`
  position: absolute;
  color: #515151;

  top: -90%;

  font-size: 22px;
  font-weight: bold;
  font-family: Poppins;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  user-select: none;

  svg {
    margin-bottom: 4%;
  }
`;
