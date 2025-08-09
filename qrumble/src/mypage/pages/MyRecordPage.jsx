import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MyPageTopBar from '../components/MyPageTopBar';
import { getMyRecords, getMyPage } from '../api/mypage';

function MyRecordPage() {
  const [record, setRecord] = useState({
    totalAnswersCount: 0,
    totalCharacterCount: 0,
  });

  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [recordRes, userRes] = await Promise.all([
          getMyRecords(),
          getMyPage(),
        ]);

        setRecord(
          recordRes || { totalAnswersCount: 0, totalCharacterCount: 0 }
        );

        // nickname이 없으면 username 사용, 그래도 없으면 빈 문자열
        const name = userRes?.userName ?? '';
        setDisplayName(name);
      } catch (error) {
        console.error('내 기록/내 정보 로딩 실패', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <Wrapper>
      <MyPageTopBar title='내 기록' />
      <MyRecordWrapper>
        <Title>{displayName}님의 일기</Title>
        <RecordDetail>
          <DetailTitle>작성 개수</DetailTitle>
          <DetailContent>{record.totalAnswersCount}개</DetailContent>
        </RecordDetail>
        <RecordDetail>
          <DetailTitle>글자 수</DetailTitle>
          <DetailContent>{record.totalCharacterCount}자</DetailContent>
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
