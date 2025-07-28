// src/community/components/AnswerList.jsx
import AnswerCard from '@/home/components/AnswerCard';
import React from 'react';
import styled from 'styled-components';

const dummyAnswers = [
  {
    id: 1,
    title: 'name',
    subtitle: 'about a diary in english...',
    userId: '아이디',
  },
  {
    id: 2,
    title: 'name',
    subtitle: 'about a diary in english...',
    userId: '아이디',
  },
  {
    id: 3,
    title: 'name',
    subtitle: 'about a diary in english...',
    userId: '아이디',
  },
  {
    id: 4,
    title: 'name',
    subtitle: 'about a diary in english...',
    userId: '아이디',
  },
  {
    id: 5,
    title: 'name',
    subtitle: 'about a diary in english...',
    userId: '아이디',
  },
  {
    id: 6,
    title: 'name',
    subtitle: 'about a diary in english...',
    userId: '아이디',
  },
  {
    id: 7,
    title: 'name',
    subtitle: 'about a diary in english...',
    userId: '아이디',
  },
];

export default function AnswerList({ ranked = false }) {
  return (
    <ListWrapper>
      {dummyAnswers.map((answer, index) => (
        <AnswerCard
          key={answer.id}
          id={answer.id}
          rank={ranked ? index + 1 : undefined}
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

  height: 600px;
  overflow-y: auto;
  scrollbar-width: none;
`;
