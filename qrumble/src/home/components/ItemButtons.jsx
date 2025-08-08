import React, { useState } from 'react';
import styled from 'styled-components';
import AlertModal from '../components/AlertModal.jsx';
import keyImg from '../assets/svgs/key.svg';
import shieldImg from '../assets/svgs/shield.svg';
import eraserImg from '../assets/svgs/eraser.svg';
import { KeyItem, ShieldItem, EraserItem } from '../api/homepage.js';
import { format, getDate } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { getAnswerStreak } from '../api/homepage.js';

function ItemButtons({
  items,
  onUse,
  attendedDates,
  targetDate,
  setAttendedDates,
}) {
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

  const confirmUse = async () => {
    if (!modalInfo.canUse) return closeModal();

    const dateStr = format(targetDate, 'yyyy-MM-dd');

    try {
      switch (modalInfo.type) {
        case 'key': {
          const result = await KeyItem(dateStr);
          if (result.used) {
            if (onUse) {
              onUse('key', { date: targetDate, isKeyUnlocked: true });
            }
          }
          break;
        }
        case 'shield': {
          const result = await ShieldItem(dateStr);
          if (result.used && result.recoveredDate) {
            const recovered = new Date(result.recoveredDate);
            setAttendedDates((prev) => [
              ...new Set([...prev, recovered.getDate()]),
            ]);
            onUse?.('shield', { date: recovered, isCookie: true });
          }
          break;
        }

        case 'eraser': {
          const result = await EraserItem(dateStr);
          // UI 업데이트 또는 페이지 이동 처리
          break;
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      closeModal();
    }
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

    const today = new Date();

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

      case 'shield': {
        if (attendedDates.length === 0) return false;

        // 오늘 날짜 (일 단위)
        const todayDay = new Date().getDate();

        // 오름차순 정렬
        const sorted = [...attendedDates].sort((a, b) => a - b);

        // 오늘부터 역순으로 체크
        let expectedDay = todayDay;
        let breakPoint = null;

        for (let i = sorted.length - 1; i >= 0; i--) {
          if (sorted[i] === expectedDay) {
            expectedDay--;
          } else {
            // 연속이 끊긴 가장 최근 날짜를 찾음
            breakPoint = expectedDay;
            break;
          }
        }

        // 끊긴 날짜가 없다면 사용 불가
        if (!breakPoint) return false;

        // breakPoint를 Date 객체로 변환
        const breakDateObj = new Date(
          targetDate.getFullYear(),
          targetDate.getMonth(),
          breakPoint
        );

        return isSameDay(breakDateObj, targetDate);
      }

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
