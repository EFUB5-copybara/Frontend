// CommentList.jsx
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import MoreIc from '@/community/assets/svgs/more_vertical.svg?react';
import ProfileIc from '@/community/assets/svgs/profile.svg?react';
import ActionModal from './ActionModal'; // 모달 컴포넌트 import

export default function CommentList({ comments }) {
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const modalRef = useRef(null);

  const handleToggleModal = (index) => {
    setOpenModalIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpenModalIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const myId = '아이디';

  return (
    <Comments>
      {comments.map((comment, index) => {
        const isMine = comment.user === myId;
        return (
          <Comment key={index}>
            <Wrapper>
              <Profile />
              <CommentWrapper>
                <CommentUser>{comment.user}</CommentUser>
                <CommentText>{comment.text}</CommentText>
              </CommentWrapper>
            </Wrapper>
            <OptionWrapper>
              <CommentOptions onClick={() => handleToggleModal(index)} />
              {openModalIndex === index && (
                <ActionModal
                  type={isMine ? 'edit' : 'report'}
                  modalRef={modalRef}
                />
              )}
            </OptionWrapper>
          </Comment>
        );
      })}
    </Comments>
  );
}

const Comments = styled.div`
  margin-top: 1rem;
  height: 400px;
  overflow-y: auto;
  scrollbar-width: none;
`;

const Comment = styled.div`
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 0.4375rem;
  align-items: center;
`;

const Profile = styled(ProfileIc)`
  width: 1.5rem;
  height: 1.5rem;
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentUser = styled.div`
  ${({ theme }) => theme.fonts.b16B};
  color: ${({ theme }) => theme.colors.primary};
`;

const CommentText = styled.div`
  ${({ theme }) => theme.fonts.b16M};
`;

const CommentOptions = styled(MoreIc)`
  width: 1.875rem;
  height: 1.875rem;
  cursor: pointer;
`;

const OptionWrapper = styled.div`
  position: relative;
`;
