import styled from 'styled-components';

export const DayCell = styled.div`
  width: 39px;
  height: 39px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DateBox = styled.div`
  width: 39px;
  height: 39px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ $isToday, theme }) =>
    $isToday && `background-color: ${theme.colors.primary};`}
`;

export const DateText = styled.div`
  ${({ theme }) => theme.fonts.ns14SB};
  color: ${({ $color, theme }) => theme.colors[$color || 'primary']};
`;

export const CookieIcon = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  pointer-events: none;
  z-index: 10;
`;
