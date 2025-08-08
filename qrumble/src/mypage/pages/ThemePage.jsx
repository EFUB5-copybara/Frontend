import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MyPageTopBar from '../components/MyPageTopBar';
import checkImg from '../assets/check.svg';
import ItemModal from '../components/ItemModal';
import { patchFont, patchPaper } from '../api/mypage';
import { getFontsList, getPapersList } from '@/shop/api/shopApi';
import { paperImageExMap } from '../components/paperMap';
import { fontImageExMap } from '../components/fontMap';

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

        const defaultFont = { id: -1, name: '기본 폰트', owned: true };
        const defaultPaper = { id: -1, name: '기본 종이', owned: true };

        const ownedFonts = [defaultFont, ...fonts.filter((f) => f.owned)];
        const ownedPapers = [defaultPaper, ...papers.filter((p) => p.owned)];

        setFontItems(ownedFonts);
        setPaperItems(ownedPapers);

        // 서버에서 selected=true인 것 찾아서 세팅
        const selectedFont = ownedFonts.find((f) => f.selected) ?? defaultFont;
        const selectedPaper =
          ownedPapers.find((p) => p.selected) ?? defaultPaper;

        setSelectedFontId(selectedFont.id);
        setSelectedPaperId(selectedPaper.id);
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
                  <ItemImg
                    $selected={isSelected}
                    $selectedTab={selectedTab} //  현재 탭 정보
                    $paperId={selectedTab === 'paper' ? item.id : undefined} // 종이 탭 paperId
                    $fontId={selectedTab === 'font' ? item.id : undefined} // 폰트 탭 fontId
                  >
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
          selectedTab={selectedTab}
          onSelect={async (idx) => {
            const chosen = currentItems[idx];
            try {
              if (selectedTab === 'font') {
                setSelectedFontId(chosen.id);

                if (chosen.id !== -1) {
                  await patchFont(chosen.id);
                  localStorage.setItem('fontId', String(chosen.id));
                } else {
                  // 기본 폰트 선택: 서버 호출 없이 로컬만 정리
                  localStorage.removeItem('fontId');
                }

                console.log('폰트 적용 성공');
              } else {
                setSelectedPaperId(chosen.id);

                if (chosen.id !== -1) {
                  await patchPaper(chosen.id);
                  localStorage.setItem('paperId', String(chosen.id));
                } else {
                  localStorage.removeItem('paperId');
                }

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
  /* 탭별 미리보기 이미지 적용 */
  background-image: ${({ $paperId, $fontId, $selectedTab }) => {
    if ($selectedTab === 'paper') {
      const src = $paperId != null ? paperImageExMap[$paperId] : null;
      return src ? `url(${src})` : 'none';
    }
    if ($selectedTab === 'font') {
      const src = $fontId != null ? fontImageExMap[$fontId] : null;
      return src ? `url(${src})` : 'none';
    }
    return 'none';
  }};
  background-position: center;
  background-color: ${({ $selected }) =>
    $selected ? 'rgba(0, 0, 0, 0.2)' : 'transparent'};
  background-blend-mode: multiply;
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
