import React from 'react';
import styled from 'styled-components';

export default function UserStatsCard({ likes, comments, diaries }) {
  const stats = [
    { label: '좋아요', value: likes },
    { label: '댓글 수', value: comments },
    { label: '작성한 일기', value: diaries },
  ];

  return (
    <Card>
      {stats.map(({ label, value }, index) => (
        <Stat key={index}>
          <Circle>
            <Value>{value}</Value>
          </Circle>
          <Label>{label}</Label>
        </Stat>
      ))}
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.brown1};
  padding: 1.375rem 2.6875rem;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
`;

const Circle = styled.div`
  width: 47px;
  height: 47px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.ivory1};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Value = styled.div`
  ${({ theme }) => theme.fonts.t20SB};
  color: ${({ theme }) => theme.colors.primary};
`;

const Label = styled.div`
  ${({ theme }) => theme.fonts.c14M};
  color: ${({ theme }) => theme.colors.brown2};
  white-space: nowrap;
`;
