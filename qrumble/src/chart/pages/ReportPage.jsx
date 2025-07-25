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

const PageWrapper = styled.div`
  background: ${({ theme }) => theme.colors.ivory3};
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Container = styled.div`
  width: 100%;
  max-width: 360px;
  padding: 24px 16px 80px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
