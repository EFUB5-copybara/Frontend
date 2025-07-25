import React, { useState } from "react";
import styled from "styled-components";

function ItemModal({
  items,
  currentIndex,
  setCurrentIndex,
  isSelected,
  onSelect,
  onClose,
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
          {items.map((item, idx) => (
            <ModalContainer key={idx}>
              <PreviewBox />
              <ItemText>
                <ItemName>{item.name}</ItemName>
                <ItemDesc>{item.description}</ItemDesc>
              </ItemText>

              <Points>100P</Points>
              <SelectButton
                disabled={isSelected(idx)}
                onClick={() => {
                  if (!isSelected(idx)) onSelect(idx);
                }}
              >
                {isSelected(idx) ? "선택됨" : "선택"}
              </SelectButton>
            </ModalContainer>
          ))}
        </SwipeContainer>
      </ModalWrap>
    </Overlay>
  );
}

export default ItemModal;

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

const SelectButton = styled.button`
  width: 100%;
  height: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.colors.brown3 : theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 10px;
  font-family: ${({ theme }) => theme.fonts.b16B};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  &:hover {
    background-color: ${({ disabled, theme }) =>
      disabled ? theme.colors.brown3 : "rgba(92, 57, 20, 1)"};
  }

  &:active {
    background-color: ${({ disabled, theme }) =>
      disabled ? theme.colors.brown3 : "rgba(78, 46, 13, 1)"};
  }
`;
