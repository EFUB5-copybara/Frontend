import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';

import EyeIc from '@/community/assets/svgs/eye.svg?react';
import LikeIc from '@/community/assets/svgs/like.svg?react';
import LikeOnIc from '@/community/assets/svgs/like_on.svg?react';
import CommentIc from '@/community/assets/svgs/message.svg?react';
import { useParams } from 'react-router-dom';
import { fetchPostDetail, likePost, unlikePost } from '../api/community';

export default function PostDetailPage() {
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

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

  const handleLikeClick = async () => {
    if (!post || busy) return;
    setBusy(true);

    if (isLiked) {
      if (!likeId) {
        await loadPost();
        setBusy(false);
        return;
      }

      setIsLiked(false);
      setPost((prev) =>
        prev ? { ...prev, likeCount: Math.max(0, prev.likeCount - 1) } : prev
      );

      try {
        await unlikePost(likeId);
        setLikeId(null);
        await loadPost();
      } catch (e) {
        setIsLiked(true);
        setPost((prev) =>
          prev ? { ...prev, likeCount: prev.likeCount + 1 } : prev
        );
        alert(e.response?.data?.message ?? '좋아요 취소에 실패했습니다.');
      } finally {
        setBusy(false);
      }
      return;
    }

    setIsLiked(true);
    setPost((prev) =>
      prev ? { ...prev, likeCount: prev.likeCount + 1 } : prev
    );

    try {
      const res = await likePost(postId);

      const newLikeId = res.data?.likeId ?? null;
      setLikeId(newLikeId);

      if (res.data?.likeCount != null) {
        setPost((prev) =>
          prev ? { ...prev, likeCount: res.data.likeCount } : prev
        );
      }

      await loadPost();
    } catch (e) {
      setIsLiked(false);
      setPost((prev) =>
        prev ? { ...prev, likeCount: Math.max(0, prev.likeCount - 1) } : prev
      );
      alert(e.response?.data?.message ?? '좋아요 처리에 실패했습니다.');
    } finally {
      setBusy(false);
    }
  };

  if (error) return <div>{error}</div>;
  if (!post) return <div>로딩 중...</div>;

  return (
    <Container>
      <TextWrapper>
        <Title>{post.title}</Title>
        <Content>{post.content}</Content>
      </TextWrapper>

      <Stats>
        <Stat
          onClick={handleLikeClick}
          role='button'
          aria-label='좋아요'
          aria-pressed={isLiked}
          title={isLiked ? '좋아요됨' : '좋아요'}>
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

      <CommentList comments={post.comments?.comments ?? []} />
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
  cursor: pointer;
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
