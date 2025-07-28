// src/community/components/AnswerList.jsx
import AnswerCard from '@/home/components/AnswerCard';
import React from 'react';
import styled from 'styled-components';

const dummyAnswers = [
  {
    rank: 1,
    title: 'name',
    subtitle: 'about a diary in english...',
    userId: '아이디',
  },
  {
    rank: 2,
    title: 'name',
    subtitle: 'about a diary in english...',
    userId: '아이디',
  },
  {
    rank: 3,
    title: 'name',
    subtitle: 'about a diary in english...',
    userId: '아이디',
  },
  {
    rank: 4,
    title: 'name',
    subtitle: 'about a diary in english...',
    userId: '아이디',
  },
  {
    rank: 5,
    title: 'name',
    subtitle: 'about a diary in english...',
    userId: '아이디',
  },
  {
    rank: 6,
    title: 'name',
    subtitle: 'about a diary in english...',
    userId: '아이디',
  },
  {
    rank: 7,
    title: 'name',
    subtitle: 'about a diary in english...',
    userId: '아이디',
  },
];

export default function AnswerList() {
  return (
    <ListWrapper>
      {dummyAnswers.map((answer) => (
        <AnswerCard
          key={answer.rank}
          rank={answer.rank}
          title={answer.title}
          subtitle={answer.subtitle}
          userId={answer.userId}
        />
      ))}
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 16px;

  height: 600px;
  overflow-y: auto;
  scrollbar-width: none;
`;
