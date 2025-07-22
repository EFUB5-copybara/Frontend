import styled from 'styled-components';
import ShopItemCard from './ShopItemCard';

export default function ItemList({ onCardClick }) {
  // 임시로 5개 카드 렌더링
  return (
    <ScrollRow>
      {[...Array(5)].map((_, idx) => (
        <ShopItemCard key={idx} onClick={onCardClick} />
      ))}
    </ScrollRow>
  );
}

const ScrollRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  overflow-x: auto;
  width: 100%;
  padding: 0 0 16px 0;
  box-sizing: border-box;
  /* 스크롤바 숨기기 (선택) */
  &::-webkit-scrollbar {
    display: none;
  }
`;