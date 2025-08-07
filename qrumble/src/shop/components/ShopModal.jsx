import { useState, useEffect } from "react";
import styled from "styled-components";
import KeyIcon from '../assets/key.svg?react';
import ShieldIcon from '../assets/shield.svg?react';
import EraserIcon from '../assets/eraser.svg?react';
import { getItemDetail } from '../api/shopApi';

export default function ShopModal({
  items,
  currentIndex,
  setCurrentIndex,
  onBuy,
  onClose,
  userPoint = 120,
}) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const item = items[currentIndex];
        if (item && item.id) {
          const res = await getItemDetail(item.id);
          setDetail({
            ...res,
            isOwned: res.isOwned === true
          });
        }
      } catch (e) {
        setDetail(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [currentIndex, items]);

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
      <ModalWrap onClick={(e) => e.stopPropagation()}>
        <SwipeContainer>
          <ModalContainer>
            <PreviewBox>
              {detail.img && (
                <img
                  src={detail.img}
                  alt={detail.name}
                  style={{
                    width: '158px',
                    height: '130px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    background: '#fff'
                  }}
                />
              )}
              {!detail.img && detail.name === '열쇠' && <KeyIcon width="158" height="130" />}
              {!detail.img && detail.name === '방패' && <ShieldIcon width="158" height="130" />}
              {!detail.img && detail.name === '지우개' && <EraserIcon width="158" height="130" />}
              {!detail.img && detail.name !== '열쇠' && detail.name !== '방패' && detail.name !== '지우개' && (
                <FontPreview $fontName={detail.name}>{detail.name}</FontPreview>
              )}
            </PreviewBox>
            <ItemText>
              <ItemName>{detail.name}</ItemName>
              <ItemDesc>{detail.description}</ItemDesc>
            </ItemText>
            <Points>{detail.price}P</Points>
            {detail.isOwned ? (
              <OwnedButton disabled>
                보유함
              </OwnedButton>
            ) : insufficient ? (
              <>
                <InsufficientButton disabled>
                  구매하기
                </InsufficientButton>
                <Message>포인트가 부족합니다</Message>
              </>
            ) : (
              <BuyButton
                onClick={() => onBuy(currentIndex)}
              >
                구매하기
              </BuyButton>
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

const OwnedButton = styled.button`
  width: 100%;
  height: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.brown3};
  color: ${({ theme }) => theme.colors.brown2};
  border: none;
  border-radius: 10px;
  font-family: ${({ theme }) => theme.fonts.b16B};
  cursor: default;
  margin-top: 8px;
`;

const BuyButton = styled.button`
  width: 100%;
  height: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 10px;
  font-family: ${({ theme }) => theme.fonts.b16B};
  cursor: pointer;
  margin-top: 8px;
  
  &:hover {
    background-color: rgba(92, 57, 20, 1);
  }

  &:active {
    background-color: rgba(78, 46, 13, 1);
  }
`;

const InsufficientButton = styled.button`
  width: 100%;
  height: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.error};
  border: 1.5px solid ${({ theme }) => theme.colors.error};
  border-radius: 10px;
  font-family: ${({ theme }) => theme.fonts.b16B};
  cursor: default;
  margin-top: 8px;
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