import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';

import EyeIc from '@/community/assets/svgs/eye.svg?react';
import LikeIc from '@/community/assets/svgs/like.svg?react';
import CommentIc from '@/community/assets/svgs/message.svg?react';
import { useParams } from 'react-router-dom';
import { fetchPostDetail } from '../api/community';

export default function PostDetailPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await fetchPostDetail(postId);
        setPost(data);
        console.log('post:', data);
      } catch (err) {
        setError(
          err.response?.data?.message || '게시글을 불러오지 못했습니다.'
        );
      }
    };
    getPost();
  }, [postId]);

  if (error) return <div>{error}</div>;
  if (!post) return <div>로딩 중...</div>;

  return (
    <Container>
      <TextWrapper>
        <Title>{post.title}</Title>
        <Content>{post.content}</Content>
      </TextWrapper>
      <Stats>
        <Stat>
          <LikeIcon />
          {post.likeCount}
        </Stat>
        <Stat>
          <EyeIcon /> {post.viewCount}
        </Stat>
        <Stat>
          <CommentIcon /> {post.commentCount}
        </Stat>
      </Stats>
      <CommentList comments={post.comments.comments} />
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
  ${({ theme }) => theme.fonts.nd18B}
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
