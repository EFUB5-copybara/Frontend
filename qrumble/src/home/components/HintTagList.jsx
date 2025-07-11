import React from "react";
import styled from "styled-components";

function HintTagList({ hints = [], onClick }) {
  return (
    <TagContainer>
      {hints.map((hint) => (
        <Tag key={hint} onClick={() => onClick?.(hint)}>
          #{hint}
        </Tag>
      ))}
    </TagContainer>
  );
}

export default HintTagList;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin: 10px 0;
`;

const Tag = styled.div`
  background-color: ${({ theme }) => theme.colors.green};
  color: white;
  padding: 6px 14px;
  border-radius: 100px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.nunitoSubtitle14SB};
  white-space: nowrap;
`;
