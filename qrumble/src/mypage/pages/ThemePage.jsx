import React, { useState } from 'react';
import styled from 'styled-components';
import MyPageTopBar from '../components/MyPageTopBar';
import checkImg from '../assets/check.svg';
import ItemModal from '../components/ItemModal';
import { patchFont, patchPaper } from '../api/mypage';

function ThemePage() {
  const [selectedTab, setSelectedTab] = useState('font');

  const [fontItems, setFontItems] = useState([]);
  const [paperItems, setPaperItems] = useState([]);

  const [selectedFontItem, setSelectedFontItem] = useState(0);
  const [selectedPaperItem, setSelectedPaperItem] = useState(2);

  const [modalIndex, setModalIndex] = useState(null);
  const currentItems = selectedTab === 'font' ? fontItems : paperItems;

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
                  ? selectedFontItem === index
                  : selectedPaperItem === index;

              const handleClick = () => {
                if (selectedTab === 'font') {
                  setSelectedFontItem(index);
                } else {
                  setSelectedPaperItem(index);
                }
              };

              return (
                <Item key={index} onClick={() => setModalIndex(index)}>
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
          isSelected={(idx) =>
            selectedTab === 'font'
              ? selectedFontItem === idx
              : selectedPaperItem === idx
          }
          onSelect={(idx) => {
            if (selectedTab === 'font') {
              setSelectedFontItem(idx);
              patchFont(idx + 1)
                .then(() => {
                  console.log('폰트 적용 성공');
                })
                .catch((error) => {
                  console.error('폰트 적용 실패', error);
                });
            } else {
              setSelectedPaperItem(idx);
              patchPaper(idx + 1)
                .then(() => {
                  console.log('종이 적용 성공');
                })
                .catch((error) => {
                  console.error('종이 적용 실패', error);
                });
            }
            setModalIndex(null);
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
