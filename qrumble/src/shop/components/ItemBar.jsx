import styled from 'styled-components';
import ShieldIcon from '../assets/shield.svg?react';
import KeyIcon from '../assets/key.svg?react';

// 목업 데이터
const shieldCount = 2;
const keyCount = 0;
const point = 120;

export default function ItemBar() {
  return (
    <Wrapper>
      <Bar>
        <Left>
          <ItemBox>
            <KeyIcon width={20} height={20} />
            <Text>{keyCount}개</Text>
          </ItemBox>
          <ItemBox>
            <ShieldIcon width={20} height={20} />
            <Text>{shieldCount}개</Text>
          </ItemBox>
        </Left>
        <Point>
          <PointText>{point}P</PointText>
        </Point>
      </Bar>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 360px;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const Bar = styled.div`
  width: 322px;
  padding: 2px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ItemBox = styled.div`
  display: flex;
  align-items: center;
  height: 29px;
  padding: 6px 8px;
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.ivory1};
  gap: 4px;
`;

const Point = styled.div`
  display: flex;
  height: 29px;
  padding: 6px 14px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.green};
`;

const Text = styled.span`
  ${({ theme }) => theme.fonts.c14M};
  color: ${({ theme }) => theme.colors.primary};
`;

const PointText = styled.span`
  ${({ theme }) => theme.fonts.sub14SB};
  color: ${({ theme }) => theme.colors.primary};
`;