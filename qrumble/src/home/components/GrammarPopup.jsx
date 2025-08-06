import React from 'react';
import styled from 'styled-components';

function GrammarPopup({ x, y, message, replacements, onSelect }) {
  return (
    <Popup style={{ top: y, left: x }}>
      <ErrorMessage>{message}</ErrorMessage>
      {replacements.map((r, i) => (
        <Option key={i} onClick={() => onSelect(r)}>
          {r}
        </Option>
      ))}
    </Popup>
  );
}

export default GrammarPopup;

const Popup = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.colors.ivory3};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 10px;
  border-radius: 10px;
  z-index: 999;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: 6px;
  ${({ theme }) => theme.fonts.ns14SB};
`;

const Option = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black};
  padding: 2px 0;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
