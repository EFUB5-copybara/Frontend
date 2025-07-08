import React from "react";
import styled from "styled-components";
import starIcon from "../../assets/star.svg";
import fireIcon from "../../assets/fire.svg";
import fortunecookieIcon from "../../assets/fortunecookie.svg";

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 322px;
  height: 40px;
  padding-bottom: 14px;
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
  background: var(--Qrumble-Primary, #543310);
`;

const DayIcon = styled.div`
  display: flex;
  padding: 5px 6px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 100px;
  background: var(--Qrumble-Ivory1, #f7eed3);
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
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 26px;
  color: var(--Qrumble-error, #dd4e3e);
`;

const FortuneButton = styled.button`
  display: flex;
  width: 40px;
  height: 40px;
  padding: 5px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: var(--Qrumble-Green, #aab396);
`;

const CookieIcon = styled.img`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
`;

const MissionBar = () => {
  return (
    <Bar>
      <Left>
        <MissionButton>
          <StarIcon src={starIcon} alt="미션 버튼" />
        </MissionButton>
        <DayIcon>
          <FireIcon src={fireIcon} alt="fire" />
          <Text>7일</Text>
        </DayIcon>
        <FortuneButton>
          <CookieIcon src={fortunecookieIcon} alt="포춘쿠키 버튼" />
        </FortuneButton>
      </Left>
    </Bar>
  );
};

export default MissionBar;
