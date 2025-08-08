import styled from 'styled-components';
import CookieIc from '../assets/svgs/cookie.svg?react';

export default function DateSelector({ dates, onSelect, selected }) {
  return (
    <Container>
      {dates.map(({ day, isCookie, fullDate }) => {
        const isSelected = selected === fullDate;

        return (
          <DateItem key={fullDate}>
            <DateButton
              selected={isSelected}
              onClick={() => onSelect({ fullDate })}
              title={fullDate}>
              {isSelected ? day : isCookie ? <CookieIcon /> : day}
            </DateButton>
          </DateItem>
        );
      })}
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

const DateButton = styled.div`
  width: 39px;
  height: 39px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : 'transparent'};
  color: ${({ selected, theme }) =>
    selected ? 'white' : theme.colors.primary};
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
`;

const CookieIcon = styled(CookieIc)`
  width: 40px;
  height: 40px;
`;
