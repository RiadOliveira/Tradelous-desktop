import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: scroll;

  margin-top: 6%;
  height: 84vh;

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #c4c4c4;

    border-radius: 5px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${shade(0.2, '#c4c4c4')};

    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${shade(0.3, '#c4c4c4')};
  }
`;

export const SalesContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  align-items: center;
`;

export const SearchBarContainer = styled.div`
  width: 65%;
  height: 80px;

  border-radius: 16px;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  margin-left: 10px;
  margin-bottom: 40px;

  background-color: #fff;
  border: 2px solid #c4c4c4;
`;

export const SearchBar = styled.input`
  border: 0;
  outline: 0;

  width: 60%;
  height: 75%;

  font-family: Poppins;
  font-size: 24px;

  text-align: center;

  &::placeholder {
    transition: opacity 0.3s;
  }

  &:focus {
    &::placeholder {
      opacity: 0;
    }
  }
`;

export const Sale = styled.button`
  border: 0;
  outline: 0;

  width: 65%;
  height: 80px;

  border-radius: 16px;

  display: flex;
  align-items: center;

  text-align: start;

  margin-left: 10px;
  margin-bottom: 30px;
  gap: 16px;

  background-color: #d6874e;
  transition: background 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${shade(0.1, '#d6874e')};
  }
`;

export const SaleIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 30px;

  margin-left: 16px;
`;

export const SaleImage = styled.img`
  width: 60px;
  height: 60px;

  border-radius: 30px;
`;

export const SaleData = styled.div`
  width: 72%;
  height: 68px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SaleText = styled.div`
  font-family: Poppins;
  font-size: 18px;
  color: #fff;
`;

export const SaleSubText = styled.section`
  display: flex;
  justify-content: space-between;
`;

export const NoContentDiv = styled.div`
  width: 100%;
  height: 80%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    font-family: Poppins;
    text-align: center;
    font-size: 22px;
    color: #1c274e;

    width: 70%;
  }
`;
