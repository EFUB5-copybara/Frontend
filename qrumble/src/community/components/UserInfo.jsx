import React from 'react';
import styled from 'styled-components';
import UserProfileIc from '@/community/assets/svgs/user_profile.svg?react';

export default function UserInfo() {
  return (
    <UserInfoWrapper>
      <ProfileImg />
      <NameWrapper>
        <UserName>사용자 이름</UserName>
        <UserMail>user@email.com</UserMail>
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
  margin: 0px;
`;

const UserMail = styled.p`
  ${({ theme }) => theme.fonts.c14L};
  color: ${({ theme }) => theme.colors.green};
  margin: 0px;
`;
