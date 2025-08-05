import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import starIcon from '../assets/svgs/star.svg';
import fireIcon from '../assets/svgs/fire.svg';
import fortunecookieIcon from '../assets/svgs/fortune-button.svg';
import fortunecookieOpenedIcon from '../assets/svgs/broken-fortune-button.svg';
import { getAnswerStreak, checkFortuneCookieUsed } from '../api/homepage';

function MissionBar() {
  const navigate = useNavigate();
  const [fortuneUsed, setFortuneUsed] = useState(false);
  const [clicked, setClicked] = useState(false);
  const isFortuneDisabled = clicked || fortuneUsed;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [streakData, opened] = await Promise.all([
          getAnswerStreak(),
          checkFortuneCookieUsed(),
        ]);
        setStreak(streakData);
        setFortuneUsed(opened);
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      }
    };

    fetchData();
  }, []);

  const handleFortuneClick = () => {
    if (isFortuneDisabled) return;

    setClicked(true);
    setTimeout(() => {
      navigate('/home/fortune');
    }, 100);
  };

  const handleMissionClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      navigate('/home/mission');
    }, 100);
  };

  const [streak, setStreak] = useState(0);

  return (
    <Bar>
      <Left>
        <MissionButton onClick={handleMissionClick}>
          <StarIcon src={starIcon} alt='미션 버튼' />
        </MissionButton>
        <DayIcon>
          <FireIcon src={fireIcon} alt='fire' />
          <Text>{streak}일</Text>
        </DayIcon>
      </Left>
      <FortuneButton onClick={handleFortuneClick} disabled={isFortuneDisabled}>
        <CookieIcon
          src={fortuneUsed ? fortunecookieOpenedIcon : fortunecookieIcon}
          alt='포춘쿠키 버튼'
        />
      </FortuneButton>
    </Bar>
  );
}

export default MissionBar;

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 322px;
  height: 40px;
  padding: none;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MissionButton = styled.button`
  display: flex;
  width: 40px;
  height: 40px;
  padding: 5px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.primary};
`;

const DayIcon = styled.div`
  display: flex;
  padding: 5px 6px;
  height: 40px;
  width: 75px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.ivory1};
  white-space: nowrap;
`;

const StarIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const FireIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const Text = styled.span`
  ${({ theme }) => theme.fonts.s16SB};
  color: ${({ theme }) => theme.colors.error};
  padding-right: 4px;
`;

const FortuneButton = styled.button`
  display: flex;
  width: 40px;
  height: 40px;
  padding: 0px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CookieIcon = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
`;
