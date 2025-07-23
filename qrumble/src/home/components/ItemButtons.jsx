import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import AlertModal from "../components/AlertModal.jsx";
import keyImg from "../assets/svgs/key.svg";
import shieldImg from "../assets/svgs/shield.svg";
import eraserImg from "../assets/svgs/eraser.svg";

function ItemButtons({ items, onUse, attendedDates, targetDate }) {
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    type: "",
    message: "",
    canUse: true,
    itemName: "",
  });

  const itemAssets = {
    key: keyImg,
    shield: shieldImg,
    eraser: eraserImg,
  };

  const itemDescriptions = {
    shield: "방패: 연속일수가 깨지지 않도록 방어해준다",
    eraser: "지우개: 이미 작성한 답변을 새로 쓸 수 있다",
    key: "열쇠: 사용시 다른 사람들의 답변을 볼 수 있다",
  };

  const typeToKor = {
    key: "열쇠",
    shield: "방패",
    eraser: "지우개",
  };

  const handleUseItem = (type) => {
    const canUse = checkIfUsable(type);

    setModalInfo({
      isOpen: true,
      type,
      message: canUse
        ? `${typeToKor[type]}를 사용하시겠습니까?`
        : "적용할 수 없는 아이템입니다",
      canUse,
      itemName: type,
    });
  };

  const confirmUse = () => {
    if (!modalInfo.canUse) {
      closeModal();
      return;
    }
    onUse(modalInfo.type);
    closeModal();
  };

  const closeModal = () => {
    setModalInfo({
      isOpen: false,
      type: "",
      message: "",
      canUse: true,
    });
  };

  const checkIfUsable = (type) => {
    if (!attendedDates || !targetDate) return false;
    const itemCount = items[type];
    if (itemCount === 0) return false;

    const isCookieDay = attendedDates.includes(targetDate.getDate());
    const today = new Date(2025, 2, 11);
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    if (type === "key") return !isCookieDay;
    if (type === "eraser") return isCookieDay;
    if (type === "shield") {
      const dateRange = [];
      for (let i = 1; i <= 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        dateRange.push(d.getDate());
      }
      const missed = dateRange.filter((d) => !attendedDates.includes(d));
      return missed.length > 0;
    }

    return false;
  };

  return (
    <ItemWrapper>
      {Object.entries(itemAssets).map(([type, img]) => (
        <ItemButton key={type} onClick={() => handleUseItem(type)}>
          <ItemImg src={img} alt={type} />
          {items[type]}개
        </ItemButton>
      ))}

      <AlertModal
        isOpen={modalInfo.isOpen}
        onClose={closeModal}
        onConfirm={modalInfo.canUse ? confirmUse : undefined}
        variant={modalInfo.canUse ? "default" : "error"}
        message={modalInfo.message}
        lengthText={
          modalInfo.canUse
            ? itemDescriptions[modalInfo.type]
            : "다른 아이템을 사용해 보세요"
        }
      />
    </ItemWrapper>
  );
}

export default ItemButtons;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 38px;
  gap: 8px;
`;

const ItemButton = styled.button`
  width: 101px;
  border-radius: 100px;
  padding: 6px 18px 6px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.b16B};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.green};
`;

const ItemImg = styled.img`
  width: 24px;
`;
