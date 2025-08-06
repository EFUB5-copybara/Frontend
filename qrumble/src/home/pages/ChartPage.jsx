import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ShareModal from '../components/ShareModal';
import arrowbackImg from '../assets/svgs/arrow_back.svg';
import thumbsupImg from '../assets/svgs/thumbsup.svg';
import eyeImg from '../assets/svgs/eye.svg';
import commentImg from '../assets/svgs/comments.svg';
import shareImg from '../assets/svgs/share.svg';
import background1Img from '../assets/svgs/background1.svg';
import background2Img from '../assets/svgs/background2.svg';
import background3Img from '../assets/svgs/background3.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAnswer, getDailyQuestion } from '../api/homepage';
import { format } from 'date-fns';
import { fetchPostDetail } from '@/community/api/community';

function ChartPage() {
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleShareClick = () => {
    setIsShareOpen(true);
  };

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [date, setDate] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const [likeCount, setLikeCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const targetDate = location.state?.date;

      if (!targetDate) {
        alert('날짜 정보가 없습니다.');
        return;
      }

      const dateString = format(new Date(targetDate), 'yyyy-MM-dd');
      setDate(dateString);

      try {
        const questionRes = await getDailyQuestion(dateString);
        setQuestion(questionRes.content);
      } catch (error) {
        console.error('질문 불러오기 실패:', error);
      }

      try {
        const answerRes = await getAnswer(dateString);
        setAnswer(answerRes.content);
      } catch (error) {
        console.error('답변 불러오기 실패:', error);
      }

      try {
        const postRes = await fetchPostDetail(postId);
        setLikeCount(postRes.likeCount || 0);
        setViewCount(postRes.viewCount || 0);
        setCommentCount(postRes.commentCount || 0);
      } catch (error) {
        console.error('게시글 정보 불러오기 실패:', error);
      }
    };

    fetchData();
  }, [location, navigate]);

  return (
    <Background>
      <Container>
        <Button onClick={() => navigate(-1)}>
          <ArrowIcon src={arrowbackImg} alt='arrow back' />
        </Button>

        <Datetext>{date}</Datetext>
        <Wrapper>
          <Question>{question}</Question>
          <Answer>{answer}</Answer>
          <ChartBottomBar>
            <BottomBtn>
              <BottomBtnImg src={thumbsupImg} alt='like' />
              {likeCount}
            </BottomBtn>
            <BottomBtn>
              <BottomBtnImg src={eyeImg} alt='eye' />
              {viewCount}
            </BottomBtn>
            <BottomBtn>
              <BottomBtnImg src={commentImg} alt='comment' />
              {commentCount}
            </BottomBtn>
            <BottomBtn onClick={handleShareClick}>
              <BottomBtnImg src={shareImg} alt='share' />
            </BottomBtn>
          </ChartBottomBar>
        </Wrapper>
      </Container>
      {isShareOpen && <ShareModal onClose={() => setIsShareOpen(false)} />}
    </Background>
  );
}

export default ChartPage;

const Background = styled.div`
  background-color: ${({ theme }) => theme.colors.ivory3};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 55px 20px 22px 20px;
  width: 320px;
  height: 723px;
  border-radius: 20px;
  border: 1px solid black;
  background-color: ${({ theme }) => theme.colors.white};
  background-image: url(${background1Img});
  background-size: cover;
  background-position: center;
`;

const Button = styled.button`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 46px;
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
`;

const ArrowIcon = styled.img`
  width: 100%;
  height: auto;
`;

const Datetext = styled.div`
  position: absolute;
  top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.fonts.ns14SB};
  color: ${({ theme }) => theme.colors.green};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  padding: 62px 28px 0px 28px;
  position: relative;
  height: 100%;
`;

const Question = styled.div`
  ${({ theme }) => theme.fonts.nd18SB};
  color: ${({ theme }) => theme.colors.black};
  padding-bottom: 19px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.brown1};
`;

const Answer = styled.div`
  ${({ theme }) => theme.fonts.ns16M};
  color: ${({ theme }) => theme.colors.black};
  padding-top: 14px;
`;

const ChartBottomBar = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  width: 245px;
  height: 40px;
  bottom: 41px;
  justify-content: space-around;
  gap: 20px;
  padding-left: 16px;
  border-radius: 100px;
  background-color: rgba(255, 255, 255, 0.9);
`;

const BottomBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  ${({ theme }) => theme.fonts.c12M};
  color: ${({ theme }) => theme.colors.brown1};
  padding-left: 0px;
  padding-right: 0px;
  background-color: transparent;
  border: none;
  &:focus {
    outline: none;
  }
`;

const BottomBtnImg = styled.img`
  width: 20px;
  height: 20px;
`;
