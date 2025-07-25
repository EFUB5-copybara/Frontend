import React from "react";
import styled from "styled-components";
import MedalCard from "../components/MedalCard";
import CookieCard from "../components/CookieCard";
import ReportSummary from "../components/ReportSummary";
import GraphCard from "../components/GraphCard";
import LineGraph from "../components/LineGraph";
import BarGraph from "../components/BarGraph";

function ReportPage() {
  // 임시 데이터
  const stats = {
    medal: "A",
    cookies: 5,
    maxCookies: 6,
    likes: 24,
    streak: 16,
    comments: 32,
    posts: [40, 82, 60, 100, 50], // 주차별
    days: [2, 3, 1, 4, 2, 5, 4], // 요일별
  };

  return (
    <PageWrapper>
      <Container>
        <Title>00님의 3월 리포트</Title>
        <CardContainer>
          <MedalCard medalType={stats.medal} />
          <CookieCard cookies={stats.cookies} maxCookies={stats.maxCookies} />
          <ReportSummary stats={stats} />
          <GraphCard title="글자수">
            <LineGraph data={stats.posts} />
          </GraphCard>
          <GraphCard title="요일별 작성률">
            <BarGraph data={stats.days} />
          </GraphCard>
        </CardContainer>
      </Container>
    </PageWrapper>
  );
}

// 전체 페이지를 감싸는 컴포넌트
const PageWrapper = styled.div`
  background: ${({ theme }) => theme.colors.ivory3};
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-y: auto;
`;

// 컨텐츠를 담는 중앙 컨테이너
const Container = styled.div`
  max-width: 360px;
  width: 100%;
  padding: 24px 16px 80px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 카드들을 담는 컨테이너
const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

const Title = styled.div`
  font-family: ${({ theme }) => theme.fonts.t20SB};
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 24px;
  margin-bottom: 17px;
  width: 100%;
  text-align: center;
`;

export default ReportPage;
