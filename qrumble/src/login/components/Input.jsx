import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  border-bottom: 0.0625rem solid ${({ theme }) => theme.colors.brown3};
  outline: none;

  color: ${({ theme }) => theme.colors.black};
  background-color: transparent;
  font-size: ${({ theme }) => theme.typography.body16M};
  &::placeholder {
    color: ${({ theme }) => theme.colors.brown2};
  }
`;

export default Input;
