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
        <CloseButton onClick={onClose}>✕</CloseButton>
        <ModalText $variant={variant}>{message}</ModalText>
        {lengthText && <LengthText>{lengthText}</LengthText>}
        <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
      </ModalBox>
    </ModalOverlay>
  );
}

export default AlertModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
`;

const ModalBox = styled.div`
  width: 323px;
  height: 173px;
  padding: 28px 38px 0 38px;
  background-color: ${({ theme }) => theme.colors.ivory3};
  border-radius: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  padding: 0;
  font-size: 18px;
  cursor: pointer;
`;

const ModalText = styled.p`
  color: ${({ theme, $variant }) =>
    $variant === "error" ? theme.colors.error : theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.b16B};
  margin: 0;
  white-space: nowrap;
  width: 100%;
`;

const LengthText = styled.p`
  color: ${({ theme }) => theme.colors.brown2};
  font-family: ${({ theme }) => theme.fonts.c14M};
  margin: 0 0 20px 0;
`;

const ConfirmButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.t20SB};
  color: white;
  border: none;
  border-radius: 10px;
  width: 246px;
  height: 51px;
  padding: 12px 0 11px 0;
  cursor: pointer;
`;
