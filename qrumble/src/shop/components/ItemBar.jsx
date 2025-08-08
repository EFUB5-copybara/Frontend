import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ShieldIcon from '../assets/shield_bar.svg?react';
import KeyIcon from '../assets/key_bar.svg?react';
import { getMyItems } from '../api/shopApi';

export default function ItemBar({ userPoint }) {
  const [counts, setCounts] = useState({ key: 0, shield: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const data = await getMyItems();
        const keyItem = data.find(item => item.type === "KEY");
        const shieldItem = data.find(item => item.type === "SHIELD");
        setCounts({
          key: keyItem ? keyItem.quantity : 0,
          shield: shieldItem ? shieldItem.quantity : 0,
        });
      } catch (e) {
        setCounts({ key: 0, shield: 0 });
      }
    };
    fetchCounts();
  }, []);

  return (
    <Wrapper>
      <Bar>
        <Left>
          <ItemBox>
            <KeyIcon width={20} height={20} />
            <Text>{counts.key}개</Text>
          </ItemBox>
          <ItemBox>
            <ShieldIcon width={20} height={20} />
            <Text>{counts.shield}개</Text>
          </ItemBox>
        </Left>
        <Point>
          <PointText>{userPoint}P</PointText>
        </Point>
      </Bar>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 360px;
  display: flex;
  justify-content: center;
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
