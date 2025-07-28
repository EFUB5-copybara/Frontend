import React from 'react';
import styled from 'styled-components';

export default function ActionModal({ type = 'edit', modalRef }) {
  return (
    <ModalWrapper ref={modalRef}>
      {type === 'edit' ? (
        <>
          <ModalItem>수정하기</ModalItem>
          <ModalItem $danger>삭제하기</ModalItem>
        </>
      ) : (
        <ModalItem $danger>신고하기</ModalItem>
      )}
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  position: absolute;
  top: 40px;
  right: 20px;
  background-color: white;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ModalItem = styled.div`
  ${({ theme }) => theme.fonts.c14M};
  color: ${({ $danger }) => ($danger ? 'red' : 'black')};
  cursor: pointer;
  white-space: nowrap;
`;
