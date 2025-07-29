import styled from 'styled-components';

export default function PaperList({ papers, onCardClick }) {
  return (
    <PaperGrid>
      {papers.map((paper, idx) => (
        <Item key={paper.id} onClick={() => onCardClick(idx)}>
          <PaperImg $owned={paper.owned}>
            {paper.img && <img src={paper.img} alt={paper.name} />}
          </PaperImg>
          <ItemName>{paper.name}</ItemName>
          <ItemPrice $owned={paper.owned}>
            {paper.owned ? '보유함' : `${paper.price}P`}
          </ItemPrice>
        </Item>
      ))}
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
  border: 1px solid ${({ theme }) => theme.colors.brown1};
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  opacity: ${({ $owned }) => ($owned ? 0.6 : 1)};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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