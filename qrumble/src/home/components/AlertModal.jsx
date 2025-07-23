import React from "react";
import styled from "styled-components";

function AlertModal({
  isOpen,
  onClose,
  onConfirm,
  message,
  lengthText,
  variant = "error",
}) {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalBox>
        <ModalText $variant={variant}>{message}</ModalText>
        {lengthText && <DetailText>{lengthText}</DetailText>}
        <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
      </ModalBox>
    </ModalOverlay>
  );
}

export default AlertModal;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalBox = styled.div`
  width: 323px;
  height: 173px;
  padding: 33.5px 38px 0 38px;
  background-color: ${({ theme }) => theme.colors.ivory3};
  border-radius: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ModalText = styled.p`
  color: ${({ theme, $variant }) =>
    $variant === "error" ? theme.colors.error : theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.b16B};
  margin: 0;
  white-space: nowrap;
  width: 100%;
`;

const DetailText = styled.p`
  color: ${({ theme }) => theme.colors.brown2};
  font-family: ${({ theme }) => theme.fonts.c14M};
  margin: 0 0 20px 0;
`;

const ConfirmButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.s16SB};
  color: white;
  border: none;
  border-radius: 10px;
  width: 246px;
  height: 40px;
  padding: 6px 0 8px 0;
  cursor: pointer;
`;
