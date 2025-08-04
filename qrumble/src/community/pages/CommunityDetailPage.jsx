import CommunityLayout from '@/layout/CommunityLayout';
import React from 'react';
import styled from 'styled-components';
import CommentList from '../components/CommentList';
import CommentInput from '../components/CommentInput';

import EyeIc from '@/community/assets/svgs/eye.svg?react';
import LikeIc from '@/community/assets/svgs/like.svg?react';
import CommentIc from '@/community/assets/svgs/message.svg?react';

export default function CommunityDetailPage() {
  const comments = Array.from({ length: 7 }, (_, i) => ({
    user: '아이디',
    text: '글 잘 쓰시네요^^',
  }));

  return (
    <Container>
      <TextWrapper>
        <Title>How was your relationship with your friends?</Title>
        <Content>
          I felt good to meet my high school friend after a long time. We went
          to a cafe, played games, and had fun together
        </Content>
      </TextWrapper>
      <Stats>
        <Stat>
          <LikeIcon />
          101
        </Stat>
        <Stat>
          <EyeIcon /> 101
        </Stat>
        <Stat>
          <CommentIcon /> 101
        </Stat>
      </Stats>
      <CommentList comments={comments} />
      <CommentInput />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 800px;
  background-color: white;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-block: 1.5rem;
  gap: 1.5rem;
`;

const Title = styled.p`
  ${({ theme }) => theme.fonts.nd18SB}
  margin: 0;
`;

const Content = styled.p`
  ${({ theme }) => theme.fonts.ns16M}
  margin: 0;
`;

const Stats = styled.div`
  display: flex;
  gap: 1.25rem;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.brown3};
  padding-bottom: 1.25rem;
`;

const Stat = styled.div`
  ${({ theme }) => theme.fonts.c12M}
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const EyeIcon = styled(EyeIc)`
  width: 20px;
  height: 20px;
`;
const LikeIcon = styled(LikeIc)`
  width: 20px;
  height: 20px;
`;
const CommentIcon = styled(CommentIc)`
  width: 20px;
  height: 20px;
`;
