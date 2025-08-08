import AnswerCard from '@/home/components/AnswerCard';
import React from 'react';
import styled from 'styled-components';

export default function AnswerList({ answers, ranked = false }) {
  return (
    <ListWrapper>
      {answers.map((answer, index) => (
        <AnswerCard
          key={answer.id}
          postId={answer.id}
          rank={ranked ? index + 1 : undefined}
          title={answer.title}
          subtitle={answer.content}
          userId={answer.username}
          bookmarkCount={answer.bookmarkCount}
          commentCount={answer.commentCount}
          likeCount={answer.likeCount}
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
