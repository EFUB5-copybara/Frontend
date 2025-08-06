import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import AnswerList from '../components/AnswerList';
import DateSelector from '../components/DateSelector';
import SegmentControl from '../components/SegmentControl';
import {
  fetchAnsweredDates,
  fetchNewPosts,
  fetchPopularPosts,
} from '../api/community';
import { addDays, format, isToday } from 'date-fns';

export default function CommunityPage() {
  const tabs = [
    { key: 'popular', label: '인기 답변' },
    { key: 'recent', label: '최신 답변' },
  ];

  const [selectedTab, setSelectedTab] = useState('popular');
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );
  const [answers, setAnswers] = useState([]);
  const [cookieDays, setCookieDays] = useState([]);
  const [error, setError] = useState(null);

  const dates = useMemo(() => {
    const base = new Date();
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const day = addDays(base, -i);
      result.push(day);
    }
    return result;
  }, []);

  useEffect(() => {
    const fetchCookies = async () => {
      const now = new Date();
      try {
        const result = await fetchAnsweredDates({
          year: now.getFullYear(),
          month: now.getMonth() + 1,
        });
        console.log('답변 완료일 조회: ', result);
        setCookieDays(result.data.answeredDates);
      } catch (err) {
        console.error('쿠키 날짜 불러오기 실패', err);
      }
    };
    fetchCookies();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result =
          selectedTab === 'popular'
            ? await fetchPopularPosts(selectedDate)
            : await fetchNewPosts(selectedDate);
        console.log('결과:', result.data.posts);

        setAnswers(result.data.posts);
        setError(null);
      } catch (err) {
        const message =
          err.response?.data?.message ||
          '커뮤니티 포스트를 불러오지 못했습니다.';
        setError(message);
      }
    };
    fetchData();
  }, [selectedTab, selectedDate]);

  const decoratedDates = dates.map((date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return {
      day: date.getDate(),
      type: isToday(date)
        ? 'today'
        : cookieDays.includes(dateStr)
        ? 'cookie'
        : 'text',
      fullDate: dateStr,
    };
  });

  return (
    <Container>
      <DateSelector
        dates={decoratedDates}
        selected={selectedDate}
        onSelect={(dateObj) => setSelectedDate(dateObj.fullDate)}
      />
      <SegmentControl
        tabs={tabs}
        selected={selectedTab}
        onSelect={setSelectedTab}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <AnswerList answers={answers} ranked={selectedTab === 'popular'} />
    </Container>
  );
}

const Container = styled.div`
  height: 800px;
  padding: 30px 20px 65px 20px;
  background-color: ${({ theme }) => theme.colors.ivory3};
`;

const ErrorMessage = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  margin-top: 300px;
  text-align: center;
`;
