import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MyPageTopBar from '../components/MyPageTopBar';
import Article from '../components/Article';
import { getMyBookmarks } from '../api/mypage';

function BookmarkPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [order, setOrder] = useState('latest');

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const data = await getMyBookmarks();
        setBookmarks(data);
      } catch (error) {
        throw error;
      }
    };

    fetchBookmarks();
  }, []);

  const sortedBookmarks = [...bookmarks].sort((a, b) => {
    if (order === 'latest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (order === 'popular') {
      return b.likes - a.likes;
    }
    return 0;
  });

  return (
    <Wrapper>
      <MyPageTopBar title='북마크' />
      <OrderWrapper>
        <LatestButton onClick={() => setOrder('latest')}>최신순</LatestButton>
        <PopularityButton onClick={() => setOrder('popular')}>
          인기순
        </PopularityButton>
      </OrderWrapper>
      <ArticleWrapper>
        {sortedBookmarks.map((item) => (
          <Article key={item.id} data={item} />
        ))}
      </ArticleWrapper>
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
