import React from 'react';
import styled from 'styled-components';

function Article() {
  return (
    <Container>
      <ArticleTopBar>
        <ArticleTitle>제목</ArticleTitle>
        <ArticleDate>2025.04.06</ArticleDate>
      </ArticleTopBar>
      <ArticleContents>내용</ArticleContents>
      <ArticleUser>
        <ArticleUserProfile />
        <ArticleUserId>user456</ArticleUserId>
      </ArticleUser>
    </Container>
  );
}

export default Article;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => theme.colors.brown1};
  justify-content: first baseline;
  padding: 14px 16px;
  width: 320px;
  gap: 4px;
`;

const ArticleTopBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
`;

const ArticleTitle = styled.p`
  ${({ theme }) => theme.fonts.b16B};
  color: ${({ theme }) => theme.colors.black};
  margin: 0;
`;

const ArticleDate = styled.p`
  ${({ theme }) => theme.fonts.c12M};
  color: ${({ theme }) => theme.colors.green};
  margin: 0;
`;

const ArticleContents = styled.p`
  ${({ theme }) => theme.fonts.c14M};
  color: ${({ theme }) => theme.colors.black};
  margin: 0;
`;

const ArticleUser = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const ArticleUserProfile = styled.div`
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.green};
  margin: 0;
`;

const ArticleUserId = styled.div`
  ${({ theme }) => theme.fonts.c12L};
  color: ${({ theme }) => theme.colors.black};
  margin: 0;
`;
