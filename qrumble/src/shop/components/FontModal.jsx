import { useState, useEffect } from "react";
import styled from "styled-components";
import { getFontsDetail } from '../api/shopApi';

export default function FontModal({
  fonts,
  currentIndex,
  setCurrentIndex,
  onBuy,
  onClose,
  userPoint = 120,
  updateOwnership
}) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false);
  
  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const font = fonts[currentIndex];
        if (font && font.id) {
          const res = await getFontsDetail(font.id);
          
          console.log(`폰트 ${font.id} 상세 조회 결과:`, {
            name: font.name,
            apiOwned: res.owned
          });
          
          setDetail({
            ...res,
            owned: res.owned || font.owned
          });
          
          if (res.owned && !font.owned && updateOwnership) {
            updateOwnership('font', font.id, true);
          }
        }
      } catch (e) {
        console.error('폰트 상세 조회 실패:', e);
        const font = fonts[currentIndex];
        if (font) {
          setDetail({
            ...font,
            owned: font.owned
          });
        } else {
          setDetail(null);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [currentIndex, fonts, updateOwnership]);


  const handleBuy = (index) => {
    console.log('폰트 구매 시작:', index);
    
    if (detail && updateOwnership) {
      updateOwnership('font', detail.id, true);
      console.log('폰트 보유 상태 업데이트:', detail.id);
    }
    
    onBuy(index);
    
    setShowPurchaseSuccess(true);
    setTimeout(() => {
      setShowPurchaseSuccess(false);
    }, 3000);
    
    if (detail) {
      setDetail({
        ...detail,
        owned: true
      });
    }
  };

  if (loading || !detail) {
    return (
      <Overlay onClick={onClose}>
        <ModalWrap onClick={e => e.stopPropagation()}>
          <LoadingBox>로딩 중...</LoadingBox>
        </ModalWrap>
      </Overlay>
    );
  }

  const insufficient = userPoint < detail.price;

  return (
    <Overlay onClick={onClose}>
      <ModalWrap onClick={e => e.stopPropagation()}>
        <SwipeContainer $currentIndex={currentIndex} $deltaX={0} $isSwiping={false}>
          <ModalContainer>
            <PreviewBox>
              <FontPreview $fontName={detail.name}>{detail.name}</FontPreview>
            </PreviewBox>
            <ItemText>
              <ItemName>{detail.name}</ItemName>
              <ItemDesc>{detail.description}</ItemDesc>
            </ItemText>
            <Points>{detail.price}P</Points>
            <BuyButton
              disabled={detail.owned || insufficient}
              $owned={detail.owned}
              $insufficient={insufficient}
              onClick={() => {
                if (!detail.owned && !insufficient) handleBuy(currentIndex);
              }}
            >
              {detail.owned ? "보유함" : "구매하기"}
            </BuyButton>
            {insufficient && !detail.owned && (
              <Message>포인트가 부족합니다</Message>
            )}
            
            {showPurchaseSuccess && (
              <SuccessPopup>
                구매가 완료되었습니다!
              </SuccessPopup>
            )}
          </ModalContainer>
        </SwipeContainer>
      </ModalWrap>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalWrap = styled.div`
  width: 100%;
  max-width: 380px;
  overflow: hidden;
  position: relative;
`;

const SwipeContainer = styled.div`
  display: flex;
  gap: 10.75px;
  padding: 0 21.5px;
  transform: ${({ currentIndex, deltaX }) =>
    `translateX(calc(-${currentIndex * (317 + 10.75)}px + ${deltaX}px))`};
  transition: ${({ isSwiping }) =>
    isSwiping ? "none" : "transform 0.3s ease"};
  touch-action: pan-y;
`;

const ModalContainer = styled.div`
  width: 317px;
  height: 343px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  padding: 12px 14px 15px 14px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
`;

const PreviewBox = styled.div`
  width: 288px;
  height: 146px;
  background-color: ${({ theme }) => theme.colors.ivory3};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  margin-bottom: 18px;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 7.8px 10px 7.8px 10px;
`;

const FontPreview = styled.div`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primary};
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

const ItemText = styled.div`
  padding: 4px 8px;
  gap: 8px;
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.h3`
  font-family: ${({ theme }) => theme.fonts.t20B};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const ItemDesc = styled.p`
  font-family: ${({ theme }) => theme.fonts.c12M};
  color: ${({ theme }) => theme.colors.brown1};
  margin: 0;
`;

const Points = styled.div`
  display: flex;
  padding: 8px;
  font-family: ${({ theme }) => theme.fonts.d24SB};
  color: ${({ theme }) => theme.colors.error};
`;

const BuyButton = styled.button`
  width: 100%;
  height: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  border-radius: 10px;
  font-family: ${({ theme }) => theme.fonts.b16B};
  
  background-color: ${({ $owned, $insufficient, theme }) => 
    $owned ? theme.colors.brown3 : 
    $insufficient ? theme.colors.white : theme.colors.primary};
  
  color: ${({ $owned, $insufficient, theme }) => 
    $owned ? theme.colors.brown2 : 
    $insufficient ? theme.colors.error : theme.colors.white};
  
  border: ${({ $insufficient, theme }) => 
    $insufficient ? `1.5px solid ${theme.colors.error}` : 'none'};
  
  cursor: ${({ $owned, $insufficient }) => 
    $owned || $insufficient ? 'default' : 'pointer'};
  
  &:hover {
    background-color: ${({ $owned, $insufficient, theme }) => 
      $owned ? theme.colors.brown3 : 
      $insufficient ? theme.colors.white : 'rgba(92, 57, 20, 1)'};
  }

  &:active {
    background-color: ${({ $owned, $insufficient, theme }) => 
      $owned ? theme.colors.brown3 : 
      $insufficient ? theme.colors.white : 'rgba(78, 46, 13, 1)'};
  }
`;

const Message = styled.div`
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.error};
  font-size: 13px;
  margin-top: 4px;
`;

const LoadingBox = styled.div`
  width: 317px;
  height: 343px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

const QuantityText = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.brown2};
`;

const SuccessPopup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px 25px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-family: ${({ theme }) => theme.fonts.b16B};
  color: ${({ theme }) => theme.colors.green};
  z-index: 110;
`;