import React, { useState } from 'react';
import styled from 'styled-components';
import AlertModal from '../components/AlertModal.jsx';
import keyImg from '../assets/svgs/key.svg';
import shieldImg from '../assets/svgs/shield.svg';
import eraserImg from '../assets/svgs/eraser.svg';
import { useKeyItem, useShieldItem, useEraserItem } from '../api/homepage.js';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

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
    if (!modalInfo.canUse) {
      closeModal();
      return;
    }

    try {
      if (modalInfo.type === 'key') {
        const dateStr = format(targetDate, 'yyyy-MM-dd');
        const result = await useKeyItem(dateStr);

        const postId = result.answer.id;

        if (result.used && result.answer) {
          navigate(`/community/${postId}`);
        } else {
          alert('열쇠 아이템을 사용할 수 없습니다.');
        }
      }
      if (modalInfo.type === 'shield') {
        const dateStr = format(targetDate, 'yyyy-MM-dd');
        const result = await useShieldItem(dateStr);

        if (result.used && result.recoveredDate) {
          const recoveredDay = new Date(result.recoveredDate).getDate();

          // 해당 날짜에 쿠키가 보이도록 attendedDates에 추가
          onUse('shield'); // 아이템 수량 감소
          setAttendedDates((prev) => [...new Set([...prev, recoveredDay])]);
        } else {
          alert('방패 아이템 사용에 실패했습니다.');
        }
      }
      if (modalInfo.type === 'eraser') {
        await useEraserItem();
      }

      onUse(modalInfo.type);
    } catch (error) {
      alert('아이템 사용 중 오류가 발생했습니다.');
      console.error(error);
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

      case 'shield':
        // 연속 출석이 끊긴 첫 지점을 기준으로 판단
        if (attendedDates.length === 0) return false;

        // 오름차순 정렬
        const sorted = [...attendedDates].sort((a, b) => a - b);

        // 끊긴 첫 지점 찾기
        let breakPoint = null;
        for (let i = 1; i < sorted.length; i++) {
          if (sorted[i] !== sorted[i - 1] + 1) {
            breakPoint = sorted[i];
            break;
          }
        }

        // 끊긴 지점이 없으면(=완벽한 연속 출석이면) 사용 불가
        if (!breakPoint) return false;

        // 끊긴 지점 이전 날짜가 targetDate인지 확인
        const breakDate = new Date(
          targetDate.getFullYear(),
          targetDate.getMonth(),
          breakPoint - 1
        );
        return isSameDay(breakDate, targetDate);

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
