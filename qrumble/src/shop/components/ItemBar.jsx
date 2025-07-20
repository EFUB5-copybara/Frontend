import styled from 'styled-components';
import ShieldIcon from '../assets/shield.svg?react';
import KeyIcon from '../assets/key.svg?react';

// 목업 데이터
const shieldCount = 2;
const keyCount = 0;
const point = 120;

export default function ItemBar() {
  return (
    <Bar>
      <Left>
        <Shield>
          <ShieldIcon />
          <Count>{shieldCount}개</Count>
        </Shield>
        <Key>
          <KeyIcon />
          <Count>{keyCount}개</Count>
        </Key>
      </Left>
      <Point>
        {point}P
      </Point>
    </Bar>
  );
}

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 29px;
  padding: 6px 14px;
  gap: 10px;
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.ivory1};
  margin-top: 18px;
  margin-bottom: 12px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Shield = styled.div`
  display: flex;
  align-items: center;
  height: 29px;
  padding: 6px 8px;
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.ivory1};
  gap: 6px;
`;

const Key = styled.div`
  display: flex;
  align-items: center;
  height: 29px;
  padding: 6px 8px;
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.green};
  gap: 6px;
`;

const Count = styled.span`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const Point = styled.div`
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.green};
  padding: 6px 14px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;