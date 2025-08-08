import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import starIcon from '../assets/svgs/star.svg';
import fireIcon from '../assets/svgs/fire.svg';
import fortunecookieIcon from '../assets/svgs/fortune-button.svg';
import fortunecookieOpenedIcon from '../assets/svgs/broken-fortune-button.svg';
import {
  getAnswerStreak,
  checkFortuneCookieUsed,
  getMonthlyAnswer,
} from '../api/homepage';
import { format, parseISO, subDays } from 'date-fns';

function MissionBar() {
  const navigate = useNavigate();
  const [fortuneUsed, setFortuneUsed] = useState(false);
  const [clicked, setClicked] = useState(false);
  const isFortuneDisabled = clicked || fortuneUsed;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [streakData, usedDateString] = await Promise.all([
          getAnswerStreak(),
          checkFortuneCookieUsed(), // ex) "2025-08-07"
        ]);

        setStreak(streakData);

        const today = format(new Date(), 'yyyy-MM-dd'); // "YYYY-MM-DD"
        const isUsedToday = usedDateString === today;

        setFortuneUsed(isUsedToday); // 오늘 쓴 기록이 있을 때만 true
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      }
    };

    fetchData();
  }, []);

  // 오늘(답했으면 포함) 또는 어제부터 뒤로 연속 계산
  const calcDisplayStreak = async () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth() + 1;

    // 지난 달 구하기 (JS Date로 안전하게)
    const prevMonthDate = new Date(y, m - 2, 1);
    const py = prevMonthDate.getFullYear();
    const pm = prevMonthDate.getMonth() + 1;

    // 이번 달 + 지난 달 답변 목록
    const [answersThis, answersPrev] = await Promise.all([
      getMonthlyAnswer(y, m),
      getMonthlyAnswer(py, pm),
    ]);

    // 답변한 날짜들을 로컬(KST) yyyy-MM-dd로 변환해서 Set에 저장
    const answeredDates = new Set(
      [...answersThis, ...answersPrev].map((item) =>
        format(parseISO(item.createdAt), 'yyyy-MM-dd')
      )
    );

    const todayStr = format(now, 'yyyy-MM-dd');
    const yesterdayStr = format(subDays(now, 1), 'yyyy-MM-dd');

    // 오늘 답변했으면 오늘부터 뒤로, 아니면 어제부터 뒤로 연속 계산
    let cursor = answeredDates.has(todayStr) ? todayStr : yesterdayStr;

    let count = 0;
    while (answeredDates.has(cursor)) {
      count += 1;
      // cursor는 'yyyy-MM-dd' 문자열이라 parseISO로 Date 만든 뒤 하루씩 빼줍니다
      const curDate = parseISO(cursor);
      cursor = format(subDays(curDate, 1), 'yyyy-MM-dd');
    }

    return count;
  };

  const handleFortuneClick = () => {
    if (isFortuneDisabled) return;

    setClicked(true);
    setTimeout(() => {
      navigate('/home/fortune');
    }, 100);
  };

  const handleMissionClick = () => {
    setClicked(true);
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
