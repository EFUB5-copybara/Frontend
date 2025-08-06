import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MyPageTopBar from '../components/MyPageTopBar';
import editImg from '../assets/pencil_line.svg';
import ProfileModal from '../components/ProfileModal';
import { getMyInfo } from '../api/mypage';
import { useNavigate } from 'react-router-dom';

function MyInfoPage() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [myInfo, setMyInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyInfo();
        setMyInfo(data);
      } catch (err) {
        console.error('내 정보 불러오기 실패:', err);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <Wrapper>
      <MyPageTopBar title='내 정보' />
      <Container>
        <UserInfo>
          <Profile onClick={() => setIsProfileOpen(true)} />
          <UserInfoWrapper>
            <NameWrapper>
              <EditButton>
                <EditImg src={editImg} alt='edit' />
              </EditButton>
              <UserName>{myInfo?.nickname || '닉네임 없음'}</UserName>
            </NameWrapper>
            <UserMail>{myInfo?.email || '이메일 없음'}</UserMail>
          </UserInfoWrapper>
        </UserInfo>
        <AccountInfo>
          <AccountText>계정 정보</AccountText>
          <InfoDetail>
            <DetailTitle>사용자 ID</DetailTitle>
            <DetailContent>{myInfo?.userId || 'ID 없음'}</DetailContent>
          </InfoDetail>
          <InfoDetail>
            <DetailTitle>가입일</DetailTitle>
            <DetailContent>
              {' '}
              {myInfo?.createdAt
                ? new Date(myInfo.createdAt).toLocaleDateString('ko-KR')
                : '가입일 없음'}
            </DetailContent>
          </InfoDetail>
          <InfoDetail>
            <DetailTitle>비밀번호</DetailTitle>
            <DetailContent>*********</DetailContent>
          </InfoDetail>
          <InfoDetail>
            <LogoutContent onClick={handleLogout}>로그아웃</LogoutContent>
          </InfoDetail>
        </AccountInfo>
      </Container>
      {isProfileOpen && (
        <ProfileModal
          onClose={() => setIsProfileOpen(false)}
          onSelectProfile={(index) => setSelectedProfileIndex(index)}
        />
      )}
    </Wrapper>
  );
}

export default MyInfoPage;

const Wrapper = styled.div`
  width: 360px;
  height: 800px;
  position: relative;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 11px 20px 0px 20px;
  gap: 12px;
`;

const UserInfo = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.brown1};
  justify-content: space-between;
  padding: 20px 24px;
  width: 100%;
  height: 130px;
`;

const Profile = styled.button`
  width: 89px;
  height: 89px;
  border-radius: 100px;
  border: 1px solid ${({ theme }) => theme.colors.brown2};
  background-color: ${({ theme }) => theme.colors.brown3};
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 48px;
  align-items: flex-end;
  padding-bottom: 8px;
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const EditButton = styled.button`
  padding: 8px;
`;

const EditImg = styled.img`
  width: 24px;
  height: 24px;
`;

const UserName = styled.p`
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.t20SB};
  margin: 0px;
`;

const UserMail = styled.p`
  color: ${({ theme }) => theme.colors.green};
  ${({ theme }) => theme.fonts.c14L};
  margin: 0px;
`;

const AccountInfo = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  align-items: flex-start;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.brown1};
  justify-content: center;
  padding: 0 15px 11px 15px;
  width: 100%;
  height: 197px;
  gap: 8px;
`;

const AccountText = styled.p`
  color: ${({ theme }) => theme.colors.brown1};
  ${({ theme }) => theme.fonts.b16B};
  padding-left: 2px;
  padding-top: 11.5px;
  margin: 0;
`;

const InfoDetail = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding-top: 8px;

  &:not(:first-of-type) {
    border-top: 1px solid ${({ theme }) => theme.colors.brown2};
  }
`;

const DetailTitle = styled.p`
  color: ${({ theme }) => theme.colors.brown2};
  ${({ theme }) => theme.fonts.c14M};
  margin: 0;
`;

const DetailContent = styled.p`
  color: ${({ theme }) => theme.colors.brown1};
  ${({ theme }) => theme.fonts.c14L};
  margin: 0;
`;

const LogoutContent = styled.p`
  color: ${({ theme }) => theme.colors.brown2};
  ${({ theme }) => theme.fonts.c14M};
  margin: 0;
  cursor: pointer;
`;
