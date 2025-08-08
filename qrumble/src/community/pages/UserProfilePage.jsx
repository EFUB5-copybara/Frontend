import React, { useEffect, useState } from 'react';
import UserInfo from '../components/UserInfo';
import styled from 'styled-components';
import UserStatsCard from '../components/UserStatsCard';
import BackButton from '@/login/components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import AnswerList from '../components/AnswerList';
import { getUserProfile } from '../api/community';
import HistoryPostList from '../components/HistoryPostList';

export default function UserProfilePage() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userProfile, setUserProfile] = useState(null);
  const [stats, setStats] = useState({
    likes: 0,
    comments: 0,
    diaries: 0,
  });
  const [recentDiaries, setRecentDiaries] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await getUserProfile(userId);

        const data = res.data || {};

        setUserProfile(data.userProfile || data);
        setStats({
          likes: data.stats?.likes ?? 0,
          comments: data.stats?.comments ?? 0,
          diaries: data.stats?.diaries ?? 0,
        });
        setRecentDiaries(data.recentDiaries ?? []);

        setError(null);
      } catch (err) {
        setError(
          err.response?.data?.message || '사용자 정보를 불러오지 못했습니다.'
        );
      } finally {
        setLoading(false);
      }
    };
    if (userId) load();
  }, [userId]);
  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Container>
        <BackButton onClick={handleGoBack} />
        <div>Loading...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <BackButton onClick={handleGoBack} />
        <ErrorText>{error}</ErrorText>
      </Container>
    );
  }
  return (
    <Container>
      <BackButton onClick={handleGoBack} />
      <UserInfo
        username={userProfile.username}
        email={userProfile.email}
        profileImageId={userProfile?.profileImageId}
      />
      <UserStatsCard
        likes={stats.likes}
        comments={stats.comments}
        diaries={stats.diaries}
      />
      <HistorySection>
        <Text>최근 작성한 답변</Text>
        <HistoryPostList
          recentDiaries={recentDiaries}
          userProfile={userProfile}
          ranked={false}
        />
      </HistorySection>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.875rem 1.25rem 4.0625rem 1.25rem;
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
