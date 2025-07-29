import styled from 'styled-components';
import KeyIcon from '../assets/key.svg?react';
import ShieldIcon from '../assets/shield.svg?react';
import EraserIcon from '../assets/eraser.svg?react';

export default function ItemList({ items, onCardClick }) {
  return (
    <ItemGrid>
      {items.map((item, idx) => (
        <Item key={item.id} onClick={() => onCardClick(idx)}>
          <ItemImg $owned={item.owned}>
            <IconWrapper>
              {item.name === '열쇠' && <KeyIcon width="36" height="36" />}
              {item.name === '방패' && <ShieldIcon width="36" height="36" />}
              {item.name === '지우개' && <EraserIcon width="36" height="36" />}
            </IconWrapper>
          </ItemImg>
          <ItemName>{item.name}</ItemName>
          <ItemPrice $owned={item.owned}>
            {item.owned ? '보유함' : `${item.price}P`}
          </ItemPrice>
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

const Item = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  width: 155px;
`;

const ItemImg = styled.div`
  width: 155px;
  height: 76px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.brown1};
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

const ItemName = styled.div`
  ${({ theme }) => theme.fonts.c14M};
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 4px;
  text-align: center;
`;

const ItemPrice = styled.div`
  ${({ theme }) => theme.fonts.c14M};
  color: ${({ $owned, theme }) =>
    $owned ? theme.colors.green : theme.colors.brown2};
  margin-top: 2px;
  text-align: center;
`;