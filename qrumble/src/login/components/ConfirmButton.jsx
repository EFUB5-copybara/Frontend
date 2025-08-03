import styled, { css } from 'styled-components';

const ConfirmButton = styled.button`
  ${({ theme }) => theme.fonts.t20SB};
  padding: 0.75rem 8.375rem;
  border-radius: 10px;
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  border: 0.0625rem solid ${({ theme }) => theme.colors.primary};

  ${({ $variant, theme }) =>
    $variant === 'fill'
      ? css`
          background-color: ${theme.colors.primary};
          color: white;
        `
      : css`
          background-color: transparent;
          color: ${theme.colors.primary};
        `}
`;

export default ConfirmButton;
