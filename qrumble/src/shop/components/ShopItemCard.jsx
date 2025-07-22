import styled from 'styled-components';

export default function ShopModal({ onClose, children }) {
  return (
    <Overlay onClick={onClose}>
      <Card onClick={e => e.stopPropagation()}>
        <ItemContent />
        {/* 아래 영역은 추후 아이템명, 가격, 버튼 등 추가 */}
        {children}
      </Card>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.25);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  width: 317px;
  height: 343px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 0 0;
  box-sizing: border-box;
`;

const ItemContent = styled.div`
  width: 288px;
  height: 146px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.brown1};
  background: ${({ theme }) => theme.colors.ivory3};
  margin-bottom: 16px;
`;

const ItemName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.brown1};
  margin-bottom: 4px;
`;

const ItemDesc = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.brown2};
  margin-bottom: 8px;
  text-align: center;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #C05A1B;
  margin-bottom: 8px;
`;

const BuyButton = styled.button`
  width: 100%;
  height: 32px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.brown1};
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  border: none;
  cursor: pointer;
`;