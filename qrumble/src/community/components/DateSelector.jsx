import styled from 'styled-components';
import CookieIc from '../assets/svgs/cookie.svg?react';

export default function DateSelector({ dates, onSelect, selected }) {
  return (
    <Container>
      {dates.map(({ day, type, fullDate }) => (
        <DateItem key={day}>
          {type === 'cookie' ? (
            <CookieIcon alt='cookie' />
          ) : (
            <DateButton
              selected={selected === fullDate}
              onClick={() => onSelect({ fullDate })}>
              {day}
            </DateButton>
          )}
        </DateItem>
      ))}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DateItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CookieIcon = styled(CookieIc)`
  width: 39px;
  height: 39px;
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
