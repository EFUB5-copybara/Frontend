import React from 'react';
import UserInfo from '../components/UserInfo';
import styled from 'styled-components';
import UserStatsCard from '../components/UserStatsCard';
import BackButton from '@/login/components/BackButton';
import { useNavigate } from 'react-router-dom';
import AnswerList from '../components/AnswerList';

export default function UserProfilePage() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Container>
      <BackButton onClick={handleGoBack} />
      <UserInfo />
      <UserStatsCard likes={24} comments={16} diaries={32} />
      <HistorySection>
        <Text>최근 작성한 일기</Text>
        <AnswerList />
      </HistorySection>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1.25rem;
  padding-bottom: 65px;
  gap: 0.75rem;
  
`;

const Text = styled.p`
  ${({ theme }) => theme.fonts.b16M}
  margin: 0;
`;

const HistorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
