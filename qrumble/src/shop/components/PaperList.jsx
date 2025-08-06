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
  return (
    <PaperGrid>
      {papers.map((paper, idx) => {
        const PaperSvg = paperImgMap[paper.id];
        return (
          <Item key={paper.id} onClick={() => onCardClick(idx)}>
            <PaperImg $owned={paper.owned}>
              {paper.img && (
                <img
                  src={paper.img}
                  alt={paper.name}
                  style={{
                    width: '74.9px',
                    height: '74.9px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    background: '#fff',
                  }}
                />
              )}
              {!paper.img && PaperSvg && (
                <PaperSvg
                  width="74.9"
                  height="74.9"
                  style={{
                    borderRadius: '8px',
                    background: '#fff',
                    display: 'block',
                  }}
                />
              )}
            </PaperImg>
            <ItemNameRow>
              <ItemName>{paper.name}</ItemName>
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
  cursor: pointer;
  width: 155px;
`;

const PaperImg = styled.div`
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