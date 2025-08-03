import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import AlertModal from '../components/AlertModal.jsx';
import keyImg from '../assets/svgs/key.svg';
import shieldImg from '../assets/svgs/shield.svg';
import eraserImg from '../assets/svgs/eraser.svg';

function ItemButtons({ items, onUse, attendedDates, targetDate }) {
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    type: '',
    message: '',
    canUse: true,
    itemName: '',
  });

  const itemAssets = {
    key: keyImg,
    shield: shieldImg,
    eraser: eraserImg,
  };

  const itemDescriptions = {
    shield: '방패: 연속일수가 깨지지 않도록 방어해준다',
    eraser: '지우개: 이미 작성한 답변을 새로 쓸 수 있다',
    key: '열쇠: 사용시 다른 사람들의 답변을 볼 수 있다',
  };

  const typeToKor = {
    key: '열쇠',
    shield: '방패',
    eraser: '지우개',
  };

  const handleUseItem = (type) => {
    const canUse = checkIfUsable(type);

    setModalInfo({
      isOpen: true,
      type,
      message: canUse
        ? `${typeToKor[type]}를 사용하시겠습니까?`
        : '적용할 수 없는 아이템입니다',
      canUse,
      itemName: type,
    });

    console.log('타입:', type);
    console.log('targetDate:', targetDate);
    console.log('attendedDates:', attendedDates);
    console.log('check result:', canUse);
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
      type: '',
      message: '',
      canUse: true,
    });
  };

  const checkIfUsable = (type) => {
    if (!attendedDates || !targetDate) return false;

    const itemCount = items[type];
    if (itemCount === 0) return false;

    const today = new Date(2025, 2, 11); // 기준일: 3월 11일

    const isSameDay = (d1, d2) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    const isAttended = attendedDates.some((day) => {
      const date = new Date(today.getFullYear(), today.getMonth(), day);
      return isSameDay(date, targetDate);
    });

    switch (type) {
      case 'key':
        return !isAttended;

      case 'eraser':
        return isAttended;

      case 'shield':
        const start = new Date(today);
        start.setDate(start.getDate() - 13);

        let missedCount = 0;
        for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
          const written = attendedDates.some((day) => {
            const date = new Date(today.getFullYear(), today.getMonth(), day);
            return isSameDay(date, d);
          });
          if (!written) missedCount++;
        }

        return missedCount > 0;

      default:
        return false;
    }
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
        variant={modalInfo.canUse ? 'default' : 'error'}
        message={modalInfo.message}
        lengthText={
          modalInfo.canUse
            ? itemDescriptions[modalInfo.type]
            : '다른 아이템을 사용해 보세요'
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
  ${({ theme }) => theme.fonts.b16B};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.green};
`;

const ItemImg = styled.img`
  width: 24px;
`;
