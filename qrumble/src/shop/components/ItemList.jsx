import styled from 'styled-components';
import KeyIcon from '../assets/key.svg?react';
import ShieldIcon from '../assets/shield.svg?react';
import EraserIcon from '../assets/eraser.svg?react';

export default function ItemList({ items, onCardClick }) {
  if (!items || items.length === 0) {
    return <EmptyState>아이템이 없습니다.</EmptyState>
  }

  return (
    <ItemGrid>
      {items.map((item, idx) => (
        <Item 
          key={item.id} 
          onClick={() => onCardClick(idx)}
          $owned={item.owned}
        >
          <ItemImg $owned={item.owned}>
            <IconWrapper>
              {item.name === '열쇠' && <KeyIcon width="74.9" height="74.9" />}
              {item.name === '방패' && <ShieldIcon width="74.9" height="74.9" />}
              {item.name === '지우개' && <EraserIcon width="74.9" height="74.9" />}
            </IconWrapper>
            {item.owned && <OwnedOverlay>보유중</OwnedOverlay>}
          </ItemImg>
          <ItemNameRow>
            <ItemName>{item.name}</ItemName>
            <ItemPrice $owned={item.owned}>
              {item.owned ? '보유함' : `${item.price}P`}
            </ItemPrice>
          </ItemNameRow>
        </Item>
      ))}
    </ItemGrid>
  );
}

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px 10px;
  justify-content: center;
  width: 320px;
  margin: 20px auto 0;
  padding: 0 10px;
`;

const OwnedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.b16B};
  border-radius: 12px;
`;

const Item = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  border: none;
  padding: 0;
  cursor: ${({ $owned }) => ($owned ? 'default' : 'pointer')};
  width: 155px;
`;

const ItemImg = styled.div`
  position: relative;
  width: 155px;
  height: 76px;
  border-radius: 12px;
  border: 1.5px solid ${({ theme }) => theme.colors.brown1};
  background-color: ${({ $owned, theme }) =>
    $owned ? theme.colors.brown4 : theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ $owned }) => ($owned ? 0.6 : 1)};
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemNameRow = styled.div`
  display: flex;
  width: 155px;
  padding: 0 8px;
  justify-content: space-between;
  align-items: center;
  height: 26px;
  margin-top: 8px;
`;

const ItemName = styled.div`
  ${({ theme }) => theme.fonts.c14M};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 16px;
  font-weight: 700;
  font-family: Pretendard, sans-serif;
  line-height: 26px;
`;

const ItemPrice = styled.div`
  color: ${({ $owned, theme }) =>
    $owned ? theme.colors.green : theme.colors.primary};
  font-size: 16px;
  font-weight: 700;
  font-family: Pretendard, sans-serif;
  line-height: 26px;
  text-align: right;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 0;
  color: ${({ theme }) => theme.colors.brown2};
  font-family: ${({ theme }) => theme.fonts.c14M};
`;