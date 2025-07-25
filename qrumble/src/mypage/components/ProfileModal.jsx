import React from "react";
import styled, { keyframes } from "styled-components";
import profile1Img from "../assets/profile1.svg";
import profile2Img from "../assets/profile2.svg";
import profile3Img from "../assets/profile3.svg";
import profile4Img from "../assets/profile4.svg";
import profile5Img from "../assets/profile5.svg";
import profile6Img from "../assets/profile6.svg";

function ProfileModal({ onClose, onSelectProfile }) {
  const profileImages = [
    profile1Img,
    profile2Img,
    profile3Img,
    profile4Img,
    profile5Img,
    profile6Img,
  ];

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
          {Array.from({ length: 6 }).map((_, idx) => (
            <ProfileImg
              key={idx}
              $img={profileImages[idx % profileImages.length]}
              onClick={() => handleProfileClick(idx)}
            />
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
  background-image: url(${(props) => props.$img});
  background-size: cover;
  background-position: center;
  border: none;
  cursor: pointer;
`;
