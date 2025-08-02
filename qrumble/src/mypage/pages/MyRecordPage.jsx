import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MyPageTopBar from '../components/MyPageTopBar';
import { getMyRecords } from '../api/mypage';

function MyRecordPage() {
  const [record, setRecord] = useState({
    nickname: '',
    totalAnswers: 0,
    totalCharacters: 0,
  });

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await getMyRecords();
        setRecord(data);
      } catch (error) {
        throw error;
      }
    };

    fetchRecord();
  }, []);

  return (
    <Wrapper>
      <MyPageTopBar title='내 기록' />
      <MyRecordWrapper>
        <Title>{record.nickname}님의 일기</Title>
        <RecordDetail>
          <DetailTitle>작성 개수</DetailTitle>
          <DetailContent>{record.totalAnswers}개</DetailContent>
        </RecordDetail>
        <RecordDetail>
          <DetailTitle>글자 수</DetailTitle>
          <DetailContent>{record.totalCharacters}자</DetailContent>
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
  ${({ theme }) => theme.fonts.b16B};
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
  ${({ theme }) => theme.fonts.b16M};
  margin: 0;
`;

const DetailContent = styled.p`
  color: ${({ theme }) => theme.colors.brown1};
  ${({ theme }) => theme.fonts.b16B};
  margin: 0;
`;
