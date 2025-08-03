import { useState } from "react";
import styled from "styled-components";
import KeyIcon from '../assets/key.svg?react';
import ShieldIcon from '../assets/shield.svg?react';
import EraserIcon from '../assets/eraser.svg?react';

export default function ShopModal({
  items,
  currentIndex,
  setCurrentIndex,
  onBuy,
  onClose,
  userPoint = 120,
}) {
  const [startX, setStartX] = useState(null);
  const [deltaX, setDeltaX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleStart = (e) => {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setStartX(x);
    setIsSwiping(true);
  };

  const handleMove = (e) => {
    if (startX !== null) {
      const currentX = e.touches ? e.touches[0].clientX : e.clientX;
      setDeltaX(currentX - startX);
    }
  };

  const handleEnd = () => {
    if (deltaX > 50 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (deltaX < -50 && currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    setDeltaX(0);
    setStartX(null);
    setIsSwiping(false);
  };

  return (
    <Overlay onClick={onClose}>
      <ModalWrap onClick={(e) => e.stopPropagation()}>
        <SwipeContainer
          currentIndex={currentIndex}
          deltaX={deltaX}
          isSwiping={isSwiping}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          onMouseDown={handleStart}
          onMouseMove={(e) => isSwiping && handleMove(e)}
          onMouseUp={handleEnd}
          onMouseLeave={() => isSwiping && handleEnd()}
        >
          {items.map((item, idx) => {
            const insufficient = userPoint < item.price;
            return (
              <ModalContainer key={idx}>
                <PreviewBox>
                  {item.img && <img src={item.img} alt={item.name} />}
                  {!item.img && item.name === '열쇠' && <KeyIcon width="70" height="70" />}
                  {!item.img && item.name === '방패' && <ShieldIcon width="70" height="70" />}
                  {!item.img && item.name === '지우개' && <EraserIcon width="70" height="70" />}
                  {!item.img && item.name !== '열쇠' && item.name !== '방패' && item.name !== '지우개' && (
                    <FontPreview fontName={item.name}>{item.name}</FontPreview>
                  )}
                </PreviewBox>
                <ItemText>
                  <ItemName>{item.name}</ItemName>
                  <ItemDesc>{item.desc}</ItemDesc>
                </ItemText>
                <Points>{item.price}P</Points>
                <BuyButton
                  disabled={item.owned || insufficient}
                  owned={item.owned}
                  insufficient={insufficient}
                  onClick={() => {
                    if (!item.owned && !insufficient) onBuy(idx);
                  }}
                >
                  {item.owned
                    ? "보유함"
                    : "구매하기"}
                </BuyButton>
                {insufficient && !item.owned && (
                  <Message>포인트가 부족합니다</Message>
                )}
              </ModalContainer>
            );
          })}
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
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FontPreview = styled.div`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ fontName }) => {
    switch (fontName) {
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
  font-family: ${({ fontName }) => {
    switch (fontName) {
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
  background-color: ${({ disabled, owned, insufficient, theme }) =>
    owned
      ? theme.colors.brown3
      : insufficient
      ? theme.colors.white
      : theme.colors.primary};
  color: ${({ owned, insufficient, theme }) =>
    owned
      ? theme.colors.brown2
      : insufficient
      ? theme.colors.error
      : theme.colors.white};
  border: ${({ insufficient, theme }) =>
    insufficient ? `1.5px solid ${theme.colors.error}` : "none"};
  border-radius: 10px;
  font-family: ${({ theme }) => theme.fonts.b16B};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  margin-top: 8px;
  
  &:hover {
    background-color: ${({ disabled, owned, insufficient, theme }) =>
      disabled || owned
        ? owned ? theme.colors.brown3 : theme.colors.white
        : insufficient ? theme.colors.white : "rgba(92, 57, 20, 1)"};
  }

  &:active {
    background-color: ${({ disabled, owned, insufficient, theme }) =>
      disabled || owned
        ? owned ? theme.colors.brown3 : theme.colors.white
        : insufficient ? theme.colors.white : "rgba(78, 46, 13, 1)"};
  }
`;

const Message = styled.div`
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.error};
  font-size: 13px;
  margin-top: 4px;
`;