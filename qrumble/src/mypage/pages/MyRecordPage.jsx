import React, { useState } from "react";
import styled from "styled-components";
import MyPageTopBar from "../components/MyPageTopBar";

function MyRecordPage() {
  return (
    <Wrapper>
      <MyPageTopBar title="내 기록" />
      <MyRecordWrapper>
        <Title>00님의 일기</Title>
        <RecordDetail>
          <DetailTitle>작성 개수</DetailTitle>
          <DetailContent>10개</DetailContent>
        </RecordDetail>
        <RecordDetail>
          <DetailTitle>글자 수</DetailTitle>
          <DetailContent>234자</DetailContent>
        </RecordDetail>
      </MyRecordWrapper>
    </Wrapper>
  );
}

export default MyRecordPage;

const Wrapper = styled.div`
  width: 360px;
  height: 800px;
  position: relative;
`;

const MyRecordWrapper = styled.div`
  margin: 17px 20px 0 20px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => theme.colors.brown1};
  justify-content: first baseline;
  padding: 14px 20px;
  width: 320px;
  height: 130px;
  gap: 8px;
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.brown1};
  font-family: ${({ theme }) => theme.fonts.b16B};
  padding: 0;
  margin: 0;
`;

const RecordDetail = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const DetailTitle = styled.p`
  color: ${({ theme }) => theme.colors.brown2};
  font-family: ${({ theme }) => theme.fonts.b16M};
  margin: 0;
`;

const DetailContent = styled.p`
  color: ${({ theme }) => theme.colors.brown1};
  font-family: ${({ theme }) => theme.fonts.b16B};
  margin: 0;
`;
