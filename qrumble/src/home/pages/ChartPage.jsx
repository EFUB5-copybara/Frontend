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
import { getAnswer } from '../api/homepage';

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

  useEffect(() => {
    const fetchAnswer = async () => {
      const targetDate = location.state?.date;

      if (!targetDate) {
        alert('날짜 정보가 없습니다.');
        navigate('/home'); // fallback
        return;
      }

      try {
        const res = await getAnswer(targetDate);
        setDate(targetDate);
        setQuestion(res.question);
        setAnswer(res.answer);
      } catch (error) {
        console.error('답변 로딩 실패:', error);
        alert('답변을 불러오지 못했습니다.');
        navigate('/home'); // fallback
      }
    };

    fetchAnswer();
  }, [location, navigate]);

  return (
    <Background>
      <Container>
        <Button>
          <ArrowIcon src={arrowbackImg} alt='arrow back' />
        </Button>
        <Date>{date}</Date>
        <Wrapper>
          <Question>{question}</Question>
          <Answer>{answer}</Answer>
          <ChartBottomBar>
            <BottomBtn>
              <BottomBtnImg src={thumbsupImg} alt='like' />
              101
            </BottomBtn>
            <BottomBtn>
              <BottomBtnImg src={eyeImg} alt='eye' />
              101
            </BottomBtn>
            <BottomBtn>
              <BottomBtnImg src={commentImg} alt='comment' />
              101
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

const Date = styled.div`
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
