import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import XImg from '../assets/svgs/X.svg';
import bigfortuneImg from '../assets/svgs/fortune.svg';
import { useNavigate } from 'react-router-dom';
import { openFortuneCookie, checkFortuneCookieUsed } from '../api/homepage';
import { getPaperImage } from '@/mypage/components/paperMap';
import { getPapersList } from '@/shop/api/shopApi';

function FortuneCookiePage() {
  const [opened, setOpened] = useState(false);
  const [fortuneData, setFortuneData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleOpen = async () => {
    try {
      setLoading(true);
      const result = await openFortuneCookie(); // 랜덤 과거 데이터 받아오기
      setFortuneData(result);
      setOpened(true);
    } catch (error) {
      console.error('포춘쿠키 열기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkIfUsedToday = async () => {
      try {
        const result = await checkFortuneCookieUsed();
        if (result?.isUsed) {
          setFortuneData(result.fortuneAnswer);
          setOpened(true);
        }
      } catch (error) {
        console.error('포춘쿠키 사용 여부 조회 실패:', error);
      }
    };

    checkIfUsedToday();
  }, []);

  const [selectedPaperId, setSelectedPaperId] = useState(null);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const papers = await getPapersList();
        const selectedPaper = papers.find((paper) => paper.selected);
        if (selectedPaper) {
          setSelectedPaperId(selectedPaper.id);
        }
      } catch (e) {
        console.error('종이 목록 불러오기 실패:', e);
      }
    };

    fetchPapers();
  }, []);

  return (
    <Background>
      {opened && <TitleText $opened={opened}>오늘의 포춘 쿠키</TitleText>}
      <Container $opened={opened} $paperId={selectedPaperId}>
        <XButton onClick={() => navigate('/home')}>
          <img src={XImg} alt='닫기' />
        </XButton>

        {!opened ? (
          <>
            <CookieButton onClick={handleOpen} disabled={loading}>
              <img src={bigfortuneImg} alt='포춘쿠키 버튼' />
            </CookieButton>
            <TouchCookieMsg>쿠키를 터치하세요!</TouchCookieMsg>
            <TextWrapper>
              <Text1>오늘의 포춘 쿠키</Text1>
              <Text2>10P</Text2>
            </TextWrapper>
          </>
        ) : (
          <OpenedContent>
            <DateText>{fortuneData?.date}</DateText>
            <Question>{fortuneData?.question}</Question>
            <Answer>{fortuneData?.answer}</Answer>
            <TagList>
              {fortuneData?.tags?.map((tag, idx) => (
                <Tag key={idx}>#{tag}</Tag>
              ))}
            </TagList>
          </OpenedContent>
        )}
        {opened && <DoneText>10P 지급 완료!</DoneText>}
      </Container>
    </Background>
  );
}

export default FortuneCookiePage;

const Background = styled.div`
  background-color: ${({ theme }) => theme.colors.green};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${({ $opened }) => ($opened ? '96px 20px 20px' : '72px 20px 28px')};
  width: 320px;
  height: ${({ $opened }) => ($opened ? '684px' : '700px')};
  border-radius: 20px;
  border: 1px solid black;
  background-color: ${({ theme }) => theme.colors.white};
  transition: all 0.4s ease;
  padding: 0;
  background-image: ${({ $opened, $paperId }) => {
    if (!$opened || !$paperId) return 'none';
    const img = getPaperImage($paperId);
    return img ? `url(${img})` : 'none';
  }};
  round-size: cover;
  background-position: center;
`;

const XButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;

const CookieButton = styled.button`
  position: absolute;
  top: 135px;
  left: 53px;
  width: 201px;
  height: 201px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

const TouchCookieMsg = styled.span`
  position: absolute;
  top: 336px;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.fonts.b16M};
  color: ${({ theme }) => theme.colors.green};
`;

const TextWrapper = styled.div`
  position: absolute;
  top: 387px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text1 = styled.span`
  ${({ theme }) => theme.fonts.d24SB};
  color: ${({ theme }) => theme.colors.primary};
`;

const Text2 = styled.span`
  ${({ theme }) => theme.fonts.d32SB};
  color: ${({ theme }) => theme.colors.green};
`;

const TitleText = styled.div`
  position: absolute;
  top: 59px;
  left: 50%;
  transform: ${({ $opened }) =>
    $opened
      ? 'translateX(-50%) translateY(0)'
      : 'translateX(-50%) translateY(-8px)'};
  opacity: ${({ $opened }) => ($opened ? 1 : 0)};
  transition: opacity 1s ease, transform 1s ease;
  ${({ theme }) => theme.fonts.t20SB};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  pointer-events: none;
  z-index: 10;
`;

const OpenedContent = styled.div`
  width: 264px;
  opacity: 0;
  animation: fadeIn 1s ease forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const DateText = styled.div`
  ${({ theme }) => theme.fonts.ns14SB};
  color: ${({ theme }) => theme.colors.green};
  margin-bottom: 23px;
`;

const Question = styled.div`
  ${({ theme }) => theme.fonts.nd18B};
  color: ${({ theme }) => theme.colors.black};
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.brown2};
`;

const Answer = styled.div`
  ${({ theme }) => theme.fonts.ns16M};
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 20px;
  padding: 0;
`;

const TagList = styled.div`
  display: flex;
  gap: 7px;
  justify-content: flex-start;
  width: 100%;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  padding: 6px 14px;
  background-color: ${({ theme }) => theme.colors.green};
  border-radius: 100px;
  ${({ theme }) => theme.fonts.ns14SB};
  color: ${({ theme }) => theme.colors.white};
`;

const DoneText = styled.div`
  position: absolute;
  bottom: 38px;
  left: 50%;
  transform: translateX(-50%);
  ${({ theme }) => theme.fonts.t20SB};
  color: ${({ theme }) => theme.colors.brown1};
  text-align: center;
`;
