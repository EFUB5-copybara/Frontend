import styled from 'styled-components';
import CookieIc from '../assets/svgs/cookie.svg?react';

export default function DateSelector({ dates, onSelect }) {
  return (
    <ScrollWrapper>
      {dates.map(({ day, type }) => (
        <DateItem key={day}>
          {type === 'cookie' ? (
            <CookieIcon alt='cookie' />
          ) : (
            <DateButton
              selected={type === 'today'}
              onClick={() => onSelect(day)}>
              {day}
            </DateButton>
          )}
        </DateItem>
      ))}
    </ScrollWrapper>
  );
}

const ScrollWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 7px;
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 0.8125rem 1.1875rem;
`;

const DateItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CookieIcon = styled(CookieIc)`
  width: 32px;
  height: 32px;
`;

const DateButton = styled.button`
  width: 39px;
  height: 39px;
  display: flex;
  justify-content: center;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : 'transparent'};
  color: ${({ selected, theme }) =>
    selected ? 'white' : theme.colors.primary};
  border: none;
`;
