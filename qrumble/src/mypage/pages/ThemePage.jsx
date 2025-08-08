import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MyPageTopBar from '../components/MyPageTopBar';
import checkImg from '../assets/check.svg';
import ItemModal from '../components/ItemModal';
import { patchFont, patchPaper } from '../api/mypage';
import { getFontsList, getPapersList } from '@/shop/api/shopApi';

function ThemePage() {
  const [selectedTab, setSelectedTab] = useState('font');

  const [fontItems, setFontItems] = useState([]);
  const [paperItems, setPaperItems] = useState([]);

  const [selectedFontId, setSelectedFontId] = useState(null);
  const [selectedPaperId, setSelectedPaperId] = useState(null);

  const [modalIndex, setModalIndex] = useState(null);
  const currentItems = selectedTab === 'font' ? fontItems : paperItems;

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const fonts = await getFontsList();
        const papers = await getPapersList();

        // 기본 아이템 정의
        const defaultFont = {
          id: -1,
          name: '기본 폰트',
          owned: true,
          selected: true,
        };

        const defaultPaper = {
          id: -1,
          name: '기본 종이',
          owned: true,
          selected: true,
        };

        const ownedFonts = fonts.filter((f) => f.owned);
        const ownedPapers = papers.filter((p) => p.owned);

        // 기본 아이템 + 서버 아이템 합치기
        setFontItems([defaultFont, ...ownedFonts]);
        setPaperItems([defaultPaper, ...ownedPapers]);

        // 기본 선택값 세팅
        setSelectedFontId(-1);
        setSelectedPaperId(-1);
      } catch (error) {
        console.error('테마 불러오기 실패:', error);
      }
    };

    fetchThemes();
  }, []);

  useEffect(() => {
    setModalIndex(null);
  }, [selectedTab]);

  return (
    <Wrapper>
      <MyPageTopBar title='테마' />
      <Container>
        <FontPaperWrapper>
          <FontButton
            selected={selectedTab === 'font'}
            onClick={() => setSelectedTab('font')}
          >
            폰트
          </FontButton>
          <PaperButton
            selected={selectedTab === 'paper'}
            onClick={() => setSelectedTab('paper')}
          >
            종이
          </PaperButton>
        </FontPaperWrapper>
        <ItemContainer>
          {(selectedTab === 'font' ? fontItems : paperItems).map(
            (item, index) => {
              const isSelected =
                selectedTab === 'font'
                  ? selectedFontId === item.id
                  : selectedPaperId === item.id;

              return (
                <Item key={item.id} onClick={() => setModalIndex(index)}>
                  <ItemImg selected={isSelected}>
                    {isSelected && <CheckImg src={checkImg} alt='선택됨' />}
                  </ItemImg>
                  <ItemName>{item.name}</ItemName>
                </Item>
              );
            }
          )}
        </ItemContainer>
      </Container>
      {modalIndex !== null && (
        <ItemModal
          items={currentItems}
          currentIndex={modalIndex}
          setCurrentIndex={setModalIndex}
          isSelected={(idx) => {
            const it = currentItems[idx];
            return selectedTab === 'font'
              ? selectedFontId === it.id
              : selectedPaperId === it.id;
          }}
          onSelect={async (idx) => {
            const chosen = currentItems[idx];
            try {
              if (selectedTab === 'font') {
                setSelectedFontId(chosen.id);
                await patchFont(chosen.id);
                console.log('폰트 적용 성공');
              } else {
                setSelectedPaperId(chosen.id);
                await patchPaper(chosen.id);
                console.log('종이 적용 성공');
              }
              setModalIndex(null);
            } catch (error) {
              console.error('테마 적용 실패', error);
            }
          }}
          onClose={() => setModalIndex(null)}
        />
      )}
    </Wrapper>
  );
}

export default ThemePage;

const Wrapper = styled.div`
  width: 360px;
  height: 800px;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 6px 20px 0px 20px;
`;

const FontPaperWrapper = styled.div`
  gap: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 15px;
`;

const FontButton = styled.button`
  width: 160px;
  border-radius: 0px;
  border-bottom: ${({ selected, theme }) =>
    selected
      ? `3px solid ${theme.colors.primary}`
      : `1px solid ${theme.colors.brown2}`};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : theme.colors.brown2};
`;

const PaperButton = styled(FontButton)``;

const ItemContainer = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  justify-content: space-around;
  place-items: center;
`;

const Item = styled.button`
  width: 155px;
  padding: 0px;
`;

const ItemImg = styled.div`
  position: relative;
  width: 155px;
  height: 76px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.brown1};
  background-color: ${({ selected, theme }) =>
    selected ? 'rgba(0, 0, 0, 0.2)' : theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemName = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
  ${({ theme }) => theme.fonts.c14M};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0px;
`;

const CheckImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;
