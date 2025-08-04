import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AnswerList from '../components/AnswerList';
import DateSelector from '../components/DateSelector';
import SegmentControl from '../components/SegmentControl';
import { fetchNewPosts, fetchPopularPosts } from '../api/community';

export default function CommunityPage() {
  const tabs = [
    { key: 'popular', label: '인기 답변' },
    { key: 'recent', label: '최신 답변' },
  ];

  const dates = [
    { day: 6, type: 'cookie' },
    { day: 7, type: 'cookie' },
    { day: 8, type: 'cookie' },
    { day: 9, type: 'today' },
    { day: 10, type: 'text' },
    { day: 11, type: 'text' },
    { day: 12, type: 'text' },
  ];

  const [selectedTab, setSelectedTab] = useState('popular');
  const [selectedDate, setSelectedDate] = useState(dates[0].day);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result =
          selectedTab === 'popular'
            ? await fetchPopularPosts()
            : await fetchNewPosts();

        setAnswers(result.data.posts);
      } catch (err) {
        console.error('커뮤니티 포스트를 불러올 수 없습니다.', err);
      }
    };
    fetchData();
  }, [selectedTab, selectedDate]);

  return (
    <Container>
      <DateSelector
        dates={dates}
        selected={selectedDate}
        onSelect={setSelectedDate}
      />
      <SegmentControl
        tabs={tabs}
        selected={selectedTab}
        onSelect={setSelectedTab}
      />
      <Wrapper>
        <AnswerList answers={answers} ranked={selectedTab === 'popular'} />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  padding-bottom: 65px;
  background-color: ${({ theme }) => theme.colors.ivory3};
`;

const Wrapper = styled.div`
  margin: 0 16px;
`;
