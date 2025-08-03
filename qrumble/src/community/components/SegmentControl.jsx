// components/SegmentControl.jsx
import React from 'react';
import styled from 'styled-components';

function SegmentControl({ tabs, selected, onSelect }) {
  return (
    <Wrapper>
      {tabs.map((tab) => (
        <TabButton
          key={tab.key}
          selected={selected === tab.key}
          onClick={() => onSelect(tab.key)}>
          {tab.label}
        </TabButton>
      ))}
    </Wrapper>
  );
}

export default SegmentControl;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 15px;
  background-color: transparent;
`;

const TabButton = styled.button`
  width: 160px;
  background-color: transparent;
  border-radius: 0px;
  border-bottom: ${({ selected, theme }) =>
    selected
      ? `3px solid ${theme.colors.primary}`
      : `1px solid ${theme.colors.brown2}`};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : theme.colors.brown2};
  ${({ theme }) => theme.fonts.c14M}
  padding: 8px 0;
  cursor: pointer;
`;
