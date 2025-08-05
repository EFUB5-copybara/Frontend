import styled from 'styled-components';
import CookieIc from '../assets/svgs/cookie.svg?react';

export default function DateSelector({ dates, onSelect }) {
  return (
    <Container>
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
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const ScrollWrapper = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
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
