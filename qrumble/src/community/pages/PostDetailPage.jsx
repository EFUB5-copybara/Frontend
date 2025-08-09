import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';

import EyeIc from '@/community/assets/svgs/eye.svg?react';
import LikeIc from '@/community/assets/svgs/like.svg?react';
import LikeOnIc from '@/community/assets/svgs/like_on.svg?react';
import CommentIc from '@/community/assets/svgs/message.svg?react';
import { useParams } from 'react-router-dom';
import { fetchPostDetail, likePost } from '../api/community';

export default function PostDetailPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  const storageKey = (postId) => `liked:${postId}`;

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(localStorage.getItem(storageKey(postId)) === '1');
  }, [postId]);

  const handleLikeClick = async () => {
    if (isLiked) {
      return;
    }

    setIsLiked(true);
    setPost((prev) => ({ ...prev, likeCount: prev.likeCount + 1 }));
    try {
      const res = await likePost(postId);

      if (res.data?.likeCount != null) {
        setPost((prev) => ({ ...prev, likeCount: res.data.likeCount }));
      }
      localStorage.setItem(storageKey(postId), '1');
    } catch (e) {
      setIsLiked(false);
      setPost((prev) => ({ ...prev, likeCount: prev.likeCount - 1 }));
      alert(e.response?.data?.message ?? '좋아요 처리에 실패했습니다.');
    }
  };
  const loadPost = useCallback(async () => {
    try {
      const { data } = await fetchPostDetail(postId);
      setPost(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || '게시글을 불러오지 못했습니다.');
    }
  }, [postId]);

  useEffect(() => {
    loadPost();
  }, [loadPost]);

  if (error) return <div>{error}</div>;
  if (!post) return <div>로딩 중...</div>;

  return (
    <Container>
      <TextWrapper>
        <Title>{post.title}</Title>
        <Content>{post.content}</Content>
      </TextWrapper>
      <Stats>
        <Stat onClick={handleLikeClick} role='button' aria-label='좋아요'>
          {isLiked ? <LikeFillIcon /> : <LikeLineIcon />}
          {post.likeCount}
        </Stat>
        <Stat>
          <EyeIcon /> {post.viewCount}
        </Stat>
        <Stat>
          <CommentIcon /> {post.commentCount}
        </Stat>
      </Stats>
      <CommentList comments={post.comments.comments ?? []} />
      <CommentInput postId={postId} onAdded={loadPost} />
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
const LikeLineIcon = styled(LikeIc)`
  width: 20px;
  height: 20px;
`;
const LikeFillIcon = styled(LikeOnIc)`
  width: 20px;
  height: 20px;
`;
const CommentIcon = styled(CommentIc)`
  width: 20px;
  height: 20px;
`;
