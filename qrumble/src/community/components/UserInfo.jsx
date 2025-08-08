import React from 'react';
import styled from 'styled-components';
import UserProfileIc from '@/community/assets/svgs/user_profile.svg?react';
import { PROFILE_IMAGES } from '../constants/profileImage';

export default function UserInfo({ username, email, profileImageId }) {
  const profile = PROFILE_IMAGES.find((p) => p.id === profileImageId);
  const ProfileIcon = profile.Component;
  return (
    <UserInfoWrapper>
      <ProfileImg as={ProfileIcon} />
      <NameWrapper>
        <UserName>{username}</UserName>
        <UserMail>{email}</UserMail>
      </NameWrapper>
    </UserInfoWrapper>
  );
}

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 80px;
  padding: 11px 19px;
  background-color: ${({ theme }) => theme.colors.white};

  border: 1px solid ${({ theme }) => theme.colors.brown1};
  border-radius: 1.25rem;
`;
const ProfileImg = styled(UserProfileIc)`
  width: 56px;
  height: 56px;
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const UserName = styled.p`
  ${({ theme }) => theme.fonts.b18M}
  margin: 0;
`;

const UserMail = styled.p`
  ${({ theme }) => theme.fonts.c14L};
  color: ${({ theme }) => theme.colors.green};
  margin: 0px;
`;
