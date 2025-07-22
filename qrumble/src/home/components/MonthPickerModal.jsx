import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// 날짜 리스트 생성
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 61 }, (_, i) => currentYear - 30 + i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);

function MonthPickerModal({
  selectedYear,
  selectedMonth,
  selectedDate,
  onSelect,
  onClose,
}) {
  const [year, setYear] = useState(selectedYear);
  const [month, setMonth] = useState(selectedMonth);
  const [date, setDate] = useState(selectedDate);
  const [days, setDays] = useState([]);

  const scrollRefs = {
    year: useRef(null),
    month: useRef(null),
    day: useRef(null),
  };

  const scrollTimeoutRef = useRef({});

  // 월별 일 수 계산
  const getDaysInMonth = (y, m) => new Date(y, m, 0).getDate();

  // days 동적 계산 + 날짜 유효성 보정
  useEffect(() => {
    const lastDay = getDaysInMonth(year, month);
    setDays(Array.from({ length: lastDay }, (_, i) => i + 1));

    if (date > lastDay) setDate(lastDay);
  }, [year, month]);

  // 모달 열릴 때 스크롤 가운데로 초기화
  useEffect(() => {
    const yearIdx = years.indexOf(year);
    const monthIdx = months.indexOf(month);
    const dateIdx = days.indexOf(date);

    if (yearIdx !== -1) scrollToCenter(scrollRefs.year, yearIdx);
    if (monthIdx !== -1) scrollToCenter(scrollRefs.month, monthIdx);
    if (dateIdx !== -1) scrollToCenter(scrollRefs.day, dateIdx);
  }, [days]);

  // 스크롤 중앙으로 정렬
  const scrollToCenter = (ref, index) => {
    if (ref.current) {
      const itemHeight = 22;
      const gap = 22;
      const containerHeight = 110;
      const offset = (containerHeight - itemHeight) / 2;
      const scrollTop = index * (itemHeight + gap) - offset;

      ref.current.scrollTop = scrollTop;
    }
  };

  // 스크롤 시 가운데 항목 감지
  const handleScroll = (type) => {
    const ref = scrollRefs[type];
    if (!ref.current) return;

    if (scrollTimeoutRef.current[type]) {
      clearTimeout(scrollTimeoutRef.current[type]);
    }

    scrollTimeoutRef.current[type] = setTimeout(() => {
      const itemHeight = 22;
      const gap = 22;
      const containerHeight = 110;
      const scrollTop = ref.current.scrollTop;
      const index = Math.round(
        (scrollTop + containerHeight / 2 - itemHeight / 2) / (itemHeight + gap)
      );

      const getItem = (arr, i) => arr[Math.max(0, Math.min(i, arr.length - 1))];

      if (type === "year") setYear(getItem(years, index));
      else if (type === "month") setMonth(getItem(months, index));
      else if (type === "day") setDate(getItem(days, index));
    }, 100);
  };

  const handleSelect = (type, value) => {
    let newYear = year;
    let newMonth = month;
    let newDate = date;

    if (type === "year") newYear = value;
    if (type === "month") newMonth = value;
    if (type === "day") newDate = value;

    onSelect(newYear, newMonth, newDate);
    onClose();
  };

  const renderList = (items, selected, type) => (
    <ScrollColumn ref={scrollRefs[type]} onScroll={() => handleScroll(type)}>
      <ScrollPadding />
      {items.map((item) => (
        <Item
          key={item}
          selected={item === selected}
          onClick={() => handleSelect(type, item)}
        >
          {type === "year"
            ? `${item}년`
            : `${String(item).padStart(2, "0")}${
                type === "month" ? "월" : "일"
              }`}
        </Item>
      ))}
      <ScrollPadding />
    </ScrollColumn>
  );

  return (
    <Wrapper onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <PickerWrapper>
          {renderList(years, year, "year")}
          {renderList(months, month, "month")}
          {renderList(days, date, "day")}
        </PickerWrapper>
      </Modal>
    </Wrapper>
  );
}

export default MonthPickerModal;

// --- Styled Components ---

const Wrapper = styled.div`
  position: absolute;
  top: 100%;
  width: 360px;
  left: -19px;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 1000;
  height: 170px;
`;

const Modal = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.ivory3};
  box-shadow: 0px 4px 4px 0px rgba(116, 81, 45, 0.25);
  border-radius: 0px 0px 20px 20px;
  margin: 0 auto;
  width: 360px;
  padding: 30px 55px 30px 54px;
`;

const PickerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 29px;
`;

const ScrollColumn = styled.div`
  height: 110px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  scroll-snap-type: y mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollPadding = styled.div`
  height: 22px;
`;

const Item = styled.div`
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.d24SB};
  font-size: 24px;
  font-weight: ${({ selected }) => (selected ? 600 : 300)};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : theme.colors.brown3};
  scroll-snap-align: center;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 22px;
  }
`;
