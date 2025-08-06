import styled from 'styled-components';

export default function FontList({ fonts, onCardClick }) {
  return (
    <FontGrid>
      {fonts.map((font, idx) => (
        <Item key={font.id} onClick={() => onCardClick(idx)}>
          <FontImg $owned={font.owned}>
            <FontText $fontName={font.name}>{font.name}</FontText>
          </FontImg>
          <ItemNameRow>
            <ItemName>{font.name}</ItemName>
            <ItemPrice $owned={font.owned}>
              {font.owned ? '보유함' : `${font.price}P`}
            </ItemPrice>
          </ItemNameRow>
        </Item>
      ))}
    </FontGrid>
  );
}

const FontGrid = styled.div`
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

const FontImg = styled.div`
  width: 155px;
  height: 76px;
  border-radius: 12px;
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ $owned, theme }) =>
    $owned ? theme.colors.brown4 : theme.colors.brown1};
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ $owned }) => ($owned ? 0.6 : 1)};
`;

const FontText = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  font-weight: ${({ $fontName }) => {
    switch ($fontName) {
      case 'Como':
        return '500';
      case 'MuseoModerno':
        return '400';
      case 'The Seasons':
        return '700';
      case 'Tangier':
        return '300';
      default:
        return '500';
    }
  }};
  font-family: ${({ $fontName }) => {
    switch ($fontName) {
      case 'Como':
        return 'Arial, sans-serif';
      case 'MuseoModerno':
        return 'Georgia, serif';
      case 'The Seasons':
        return '"Courier New", monospace';
      case 'Tangier':
        return 'Verdana, sans-serif';
      default:
        return 'system-ui';
    }
  }};
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
  max-width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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