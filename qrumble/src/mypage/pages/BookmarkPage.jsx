import React, { useState } from "react";
import styled from "styled-components";
import MyPageTopBar from "../components/MyPageTopBar";
import Article from "../components/Article";

function BookmarkPage() {
  return (
    <Wrapper>
      <MyPageTopBar title="북마크" />
      <OrderWrapper>
        <LatestButton>최신순</LatestButton>
        <PopularityButton>인기순</PopularityButton>
      </OrderWrapper>
      <ArticleWrapper>
        <Article />
        <Article />
        <Article />
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
  font-family: ${({ theme }) => theme.fonts.c14M};
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
