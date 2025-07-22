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
  const [startX, setStartX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setDeltaX(e.touches[0].clientX - startX);
  };

  const handleTouchEnd = () => {
    if (deltaX > 50 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (deltaX < -50 && currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    setDeltaX(0);
  };

  return (
    <Overlay onClick={onClose}>
      <ModalWrap onClick={(e) => e.stopPropagation()}>
        <SwipeContainer
          currentIndex={currentIndex}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {items.map((item, idx) => (
            <ModalContainer key={idx}>
              <PreviewBox />
              <ItemText>
                <ItemName>{item.name}</ItemName>
                <ItemDesc>{item.description}</ItemDesc>
              </ItemText>

              <Dots>
                {items.map((_, i) => (
                  <Dot key={i} active={i === idx} />
                ))}
              </Dots>
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
`;

const SwipeContainer = styled.div`
  display: flex;
  gap: 10px;
  transition: transform 0.3s ease;
  transform: translateX(
    ${({ currentIndex }) => `-${currentIndex * (317 + 10.75)}px`}
  );
  padding: 0 21.5px;
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

const Dots = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px 0 18px 8px;
`;

const Dot = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : "rgba(217, 217, 217, 1)"};
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
`;
