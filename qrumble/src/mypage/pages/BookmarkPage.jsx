import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import MyPageTopBar from '../components/MyPageTopBar';
import Article from '../components/Article';
import { getMyBookmarks } from '../api/mypage';
import { profileImageMap } from '@/assets/profileImages';

function BookmarkPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [order, setOrder] = useState('latest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        const data = await getMyBookmarks();

        const list = Array.isArray(data?.bookmarkedAnswers)
          ? data.bookmarkedAnswers
          : [];

        const mapped = list.map((item) => ({
          id: item.id,
          title: item.question,
          subtitle: item.content,
          userId: item.writerUsername,
          createdAt: item.createdAt,
          likeCount: item.likesCount, // 🔁 likes → likeCount
          commentCount: item.commentsCount,
          profileImg:
            profileImageMap[item.writerProfileImageId] || profileImageMap[1],
        }));

        setBookmarks(mapped);
      } catch (error) {
        console.error('북마크 로딩 실패', error);
        setBookmarks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const sortedBookmarks = useMemo(() => {
    const copy = [...bookmarks];
    if (order === 'latest') {
      return copy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    if (order === 'popular') {
      return copy.sort((a, b) => (b.likeCount ?? 0) - (a.likeCount ?? 0));
    }
    return copy;
  }, [bookmarks, order]);

  return (
    <Wrapper>
      <MyPageTopBar title='북마크' />
      <OrderWrapper>
        <LatestButton onClick={() => setOrder('latest')}>최신순</LatestButton>
        <PopularityButton onClick={() => setOrder('popular')}>
          인기순
        </PopularityButton>
      </OrderWrapper>
      {loading ? (
        <Empty>불러오는 중…</Empty>
      ) : sortedBookmarks.length === 0 ? (
        <Empty>북마크가 없습니다.</Empty>
      ) : (
        <ArticleWrapper>
          {sortedBookmarks.map((item) => (
            <Article key={item.id} data={item} />
          ))}
        </ArticleWrapper>
      )}
    </Wrapper>
  );
}

export default BookmarkPage;

const Wrapper = styled.div`
  width: 360px;
  height: 800px;
  position: relative;
`;

const OrderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  height: 31px;
  margin: 9px 20px 26px 20px;
  ${({ theme }) => theme.fonts.c14M};
`;

const LatestButton = styled.button`
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.brown3};
  border-radius: 100px;
  width: 83px;
`;

const PopularityButton = styled.button`
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.brown3};
  border-radius: 100px;
  width: 83px;
`;

const ArticleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 14px;
  margin: 0 20px 0 20px;
`;

const Empty = styled.div`
  margin: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.brown2};
`;
