import AnswerCard from '@/home/components/AnswerCard';
import React from 'react';
import styled from 'styled-components';

export default function HistoryPostList({
  recentDiaries,
  userProfile,
  ranked = false,
}) {
  return (
    <ListWrapper>
      {recentDiaries.map((diary, index) => (
        <AnswerCard
          key={diary.id}
          postId={diary.id}
          rank={ranked ? index + 1 : undefined}
          title={diary.title}
          subtitle={diary.content}
          userId={userProfile.username}
          bookmarkCount={diary.bookmarkCount}
          commentCount={diary.commentCount}
          likeCount={diary.likeCount}
          profileImageId={userProfile.profileImageId}
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
