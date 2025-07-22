import styled from 'styled-components';
import ShopItemCard from './ShopItemCard';

const items = [
  { id: 1, name: '열쇠', desc: '사용 시 다른 사람들의 답변을 볼 수 있는 아이템', price: 200 },
  { id: 2, name: '방패', desc: '연속일수가 깨지지 않도록 방어해주는 아이템', price: 300 },
  { id: 3, name: '지우개', desc: '이미 작성한 답변을 새로 쓸 수 있는 아이템', price: 100 },
];

export default function ItemList({ onCardClick }) {
  return (
    <ContentWrapper>
      {items.map((item) => (
        <ShopItemCard key={item.id} name={item.name} desc={item.desc} price={item.price} onClick={onCardClick} />
      ))}
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
  width: 320px;
  min-height: 222px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-start;
  align-content: flex-start;
  background: ${({ theme }) => theme.colors.ivory3};
  box-sizing: border-box;
`;