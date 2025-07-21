import React from "react";
import styled, { keyframes } from "styled-components";

function ProfileModal({ onClose, onSelectProfile }) {
  const handleProfileClick = (index) => {
    onSelectProfile(index);
    onClose();
  };

  return (
    <>
      <Dim onClick={onClose} />
      <ModalContainer>
        <Text>프로필 사진 변경</Text>
        <ProfileWrapper>
          {Array.from({ length: 9 }).map((_, idx) => (
            <ProfileImg key={idx} onClick={() => handleProfileClick(idx)} />
          ))}
        </ProfileWrapper>
      </ModalContainer>
    </>
  );
}

export default ProfileModal;

const slideUp = keyframes`
  from {
    bottom: -100%;
  }
  to {
    bottom: 0;
  }
`;

const Dim = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const ModalContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 409px;
  background: ${({ theme }) => theme.colors.white};
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  animation: ${slideUp} 0.3s ease-out;
  z-index: 100;
  padding: 22px 31px 35px 31px;
`;

const Text = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.b18M};
  padding-bottom: 28px;
  margin: 0;
`;

const ProfileWrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  justify-content: space-between;
  place-items: center;
`;

const ProfileImg = styled.button`
  width: 90px;
  height: 90px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.brown3};
`;
