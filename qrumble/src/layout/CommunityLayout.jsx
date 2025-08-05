import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import BackIc from '@/community/assets/svgs/arrow_back.svg?react';
import ProfileIc from '@/community/assets/svgs/profile.svg?react';
import BookMarkFillIc from '@/community/assets/svgs/bookmark_on.svg?react';
import BookMarkLineIc from '@/community/assets/svgs/bookmark.svg?react';
import MoreIc from '@/community/assets/svgs/more_horizontal.svg?react';

import ActionModal from '@/community/components/ActionModal';
import axios from 'axios';

export default function CommunityLayout() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const result = await axios.get(`/community/posts/${postId}`);
        setPost(result.data);
      } catch (err) {
        setError(
          err.response?.data?.message || '게시글 정보를 불러오지 못했습니다.'
        );
      }
    };
    fetchPostDetail();
  }, [postId]);

  const handleProfileClick = (userId) => {
    navigate(`/user-profile/${userId}`);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <LayoutWrapper>
      <Header>
        <BackButton onClick={() => navigate(-1)} />
        <HeaderWrapper>
          <ProfileWrapper onClick={handleProfileClick}>
            <Profile />
            <User>아이디</User>
          </ProfileWrapper>
          <IconWrapper>
            <IconButton onClick={() => setIsBookmarked((prev) => !prev)}>
              {isBookmarked ? <BookMarkFill /> : <BookMarkLine />}
            </IconButton>
            <MoreButton onClick={() => setIsModalOpen((prev) => !prev)} />
          </IconWrapper>
        </HeaderWrapper>
      </Header>

      <Outlet />

      {isModalOpen && <ActionModal type='edit' modalRef={modalRef} />}
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div`
  padding: 0 1.25rem;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.brown3};
`;

const HeaderWrapper = styled.div`
  width: 274px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const BackButton = styled(BackIc)`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const Profile = styled(ProfileIc)`
  width: 28px;
  height: 28px;
`;

const User = styled.div`
  ${({ theme }) => theme.fonts.b16B}
  color: ${({ theme }) => theme.colors.primary};
`;

const BookMarkFill = styled(BookMarkFillIc)`
  width: 24px;
  height: 24px;
`;

const BookMarkLine = styled(BookMarkLineIc)`
  width: 24px;
  height: 24px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5625rem;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0;
  cursor: pointer;
  outline: none;
`;

const MoreButton = styled(MoreIc)`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
