import React from "react";
import styled from "styled-components";

export default function ReportSummary({ stats }) {
  return (
    <SummaryCard>
      <StatsRow>
        <NumberOfInfo>
          <Count>{stats.likes}</Count>
          좋아요
        </NumberOfInfo>
        <NumberOfInfo>
          <Count>{stats.streak}</Count>
          연속 작성
        </NumberOfInfo>
        <NumberOfInfo>
          <Count>{stats.comments}</Count>
          받은 댓글
        </NumberOfInfo>
      </StatsRow>
    </SummaryCard>
  );
}

const SummaryCard = styled.div`
  width: 100%;
  max-width: 320px;
  height: 100px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.brown1};
  background: ${({ theme }) => theme.colors.white};
  padding: 16px 42px 16px 43px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StatsRow = styled.div`
  width: 235px;
  display: flex;
  gap: 47px;
  justify-content: space-between;
  margin: 0;
`;

const NumberOfInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.brown2};
  font-family: ${({ theme }) => theme.fonts.c12M};
  padding: 0px;
  white-space: nowrap;
  width: 47px;
`;

const Count = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 47px;
  border-radius: 100px;
  padding: 10px 5px 9px 6px;
  background-color: ${({ theme }) => theme.colors.ivory1};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.t20SB};
  margin-bottom: 4px;
`;