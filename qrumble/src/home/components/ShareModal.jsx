import React from "react";
import styled, { keyframes } from "styled-components";
import kakaoIcon from "../assets/svgs/kakaotalk.svg";
import gmailIcon from "../assets/svgs/gmail.svg";
import instagramIcon from "../assets/svgs/instagram.svg";
import twitterIcon from "../assets/svgs/twitter.svg";
import discordIcon from "../assets/svgs/discord.svg";
import copyIcon from "../assets/svgs/copy.svg";
import { Link } from "react-router-dom";

function ShareModal({ onClose }) {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("복사되었습니다");
      onClose();
    } catch (err) {
      console.error("복사 실패", err);
    }
  };

  return (
    <>
      <Dim onClick={onClose} />
      <ModalContainer>
        <DragBar />
        <IconsRow>
          <CopyButton>
            <Icon src={gmailIcon} alt="Gmail" />
            Gmail
          </CopyButton>
          <CopyButton>
            <Icon src={kakaoIcon} alt="KakaoTalk" />
            카카오톡
          </CopyButton>
          <CopyButton>
            <Icon src={discordIcon} alt="Discord" />
            Discord
          </CopyButton>
          <CopyButton>
            <Icon src={instagramIcon} alt="Instagram" />
            Instagram
          </CopyButton>
          <CopyButton>
            <Icon src={twitterIcon} alt="X" />X
          </CopyButton>
        </IconsRow>
        <CopyLinkBox>
          <LinkCopyButton onClick={handleCopyLink}>
            <Icon src={copyIcon} alt="링크 복사" />
            링크 복사
          </LinkCopyButton>
        </CopyLinkBox>
      </ModalContainer>
    </>
  );
}

export default ShareModal;

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
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

const ModalContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 267px;
  background: ${({ theme }) => theme.colors.white};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  animation: ${slideUp} 0.3s ease-out;
  z-index: 100;
`;

const DragBar = styled.div`
  width: 74px;
  height: 6px;
  background: ${({ theme }) => theme.colors.brown1};
  border-radius: 100px;
  margin: 12px auto 32px;
`;

const IconsRow = styled.div`
  display: flex;
  gap: 20px;
  padding-left: 20px;
  padding-bottom: 23px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch; /* iOS 부드러운 스크롤 */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const CopyButton = styled.button`
  padding: 0;
  font-family: ${({ theme }) => theme.fonts.c14L};
  color: ${({ theme }) => theme.colors.black};
  min-width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const Icon = styled.img`
  width: 50px;
  height: auto;
  border-radius: 50%;
`;

const CopyLinkBox = styled.div`
  padding-top: 25px;
  padding-left: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.brown3};
`;

const LinkCopyButton = styled.button`
  padding: 0;
  display: flex;
  align-items: center;
  gap: 11px;
  font-family: ${({ theme }) => theme.fonts.b18M};
  color: ${({ theme }) => theme.colors.brown2};
`;
