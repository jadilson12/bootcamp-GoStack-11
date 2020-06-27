import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.button`
  background: #ff9000;
  border-radius: 10px;
  height: 56px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  font-weight: 500;
  width: 100%;
  transition: background-color 0.2s;

  margin-top: 16px;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
