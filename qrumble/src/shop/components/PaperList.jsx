import styled from 'styled-components';
import BlueImg from '../assets/background1.svg?react';
import GreenImg from '../assets/background2.svg?react';
import PinkImg from '../assets/background3.svg?react';

const paperImgMap = {
  1: BlueImg,
  2: GreenImg,
  3: PinkImg,
};

export default function PaperList({ papers, onCardClick }) {
  console.log('PaperList 렌더링, papers:', papers);
  return (
    <PaperGrid>
      {papers.map((paper, idx) => {
        const PaperSvg = paperImgMap[paper.id];
        return (
          <Item
            key={`${paper.id}-${paper.owned ? 'owned' : 'notowned'}`}
            onClick={() => onCardClick(idx)}
            $owned={paper.owned}
          >
            <PaperImg $owned={paper.owned}>
              {paper.img && (
                <img
                  src={paper.img}
                  alt={paper.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
              )}
              {!paper.img && PaperSvg && (
                <PaperSvg
                  width="100%"
                  height="100%"
                  style={{
                    borderRadius: '8px',
                    background: '#fff',
                    display: 'block',
                  }}
                />
              )}
              {paper.owned && <OwnedOverlay>보유중</OwnedOverlay>}
            </PaperImg>
            <ItemNameRow>
              <ItemName $owned={paper.owned}>{paper.name}</ItemName>
              <ItemPrice $owned={paper.owned}>
                {paper.owned ? '보유함' : `${paper.price}P`}
              </ItemPrice>
            </ItemNameRow>
          </Item>
        );
      })}
    </PaperGrid>
  );
}

const PaperGrid = styled.div`
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
  cursor: ${({ $owned }) => ($owned ? 'default' : 'pointer')};
  width: 155px;
`;

const PaperImg = styled.div`
  position: relative;
  width: 155px;
  height: 76px;
  border-radius: 12px;
  border: 1.5px solid ${({ theme }) => theme.colors.brown1};
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  opacity: ${({ $owned }) => ($owned ? 0.6 : 1)};

  & > svg,
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px; /* 이미지 모서리 둥글게 */
  }
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
  color: ${({ $owned, theme }) =>
    $owned ? theme.colors.green : theme.colors.primary};
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