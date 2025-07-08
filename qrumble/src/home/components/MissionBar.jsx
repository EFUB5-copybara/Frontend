import React from "react";
import styled from "styled-components";
import MissionIcon from "../../assets/MissionButton.png";

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 322px;
  height: 40px;
  border-bottom: 14px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MissionButton = styled.button`
  padding: 0;
  margin: 0;
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

const MissionBar = () => {
  return (
    <Bar>
      <Left>
        <MissionButton>
          <img src={MissionIcon} alt="미션 버튼" />
        </MissionButton>
      </Left>
    </Bar>
  );
};

export default MissionBar;
