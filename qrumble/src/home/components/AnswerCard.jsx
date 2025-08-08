import ProfileIc from '@/community/assets/svgs/profile.svg?react';
import { PROFILE_IMAGES } from '@/community/constants/profileImage';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BookmarkIc from '../assets/svgs/brownbookmark.svg?react';
import LikeIc from '../assets/svgs/brownlike.svg?react';
import CommentIc from '../assets/svgs/brownmessage.svg?react';

export default function AnswerCard({
  postId,
  title,
  subtitle,
  userId,
  rank,
  bookmarkCount,
  likeCount,
  commentCount,
  profileImageId,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/community/${postId}`);
  };

  console.log('profileImageId', profileImageId);
  const profile = PROFILE_IMAGES.find((p) => p.id === profileImageId);
  console.log('profile', profile);
  const ProfileIcon = profile ? profile.Component : ProfileIc;

  return (
    <Wrapper onClick={handleClick} $hasRank={!!rank}>
      {rank && <Rank>{rank}</Rank>}
      <Content>
        <AnswerContentWrapper>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </AnswerContentWrapper>
        <Meta>
          <AnswerId>
            <AnswerIdImg as={ProfileIcon} />
            {userId}
          </AnswerId>
          <BottomIconWrapper>
            <IconWrapper>
              <LikeIcon /> {likeCount}
            </IconWrapper>
            <IconWrapper>
              <CommentIcon /> {commentCount}
            </IconWrapper>
            <IconWrapper>
              <BookmarkIcon /> {bookmarkCount}
            </IconWrapper>
          </BottomIconWrapper>
        </Meta>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ $hasRank }) =>
    $hasRank ? '10px 28px 0 20px' : '10px 10px 0 10px'};
  height: 104px;
  border: 1px solid ${({ theme }) => theme.colors.brown1};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  gap: 10px;
  cursor: pointer;
`;

const Rank = styled.div`
  ${({ theme }) => theme.fonts.b16B};
  color: ${({ theme }) => theme.colors.primary};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const AnswerContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 100%;
  height: 3.25rem;
  ${({ theme }) => theme.fonts.b16B};
  background-color: ${({ theme }) => theme.colors.ivory2};
  color: ${({ theme }) => theme.colors.primary};
  padding: 3px 9px 9px 8px;
`;
const Title = styled.p`
  ${({ theme }) => theme.fonts.b16B};
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Subtitle = styled.p`
  ${({ theme }) => theme.fonts.c12L};
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  ${({ theme }) => theme.fonts.c12M};
  color: ${({ theme }) => theme.colors.primary};
  height: 42px;
`;

const AnswerId = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  height: 17px;
`;

const AnswerIdImg = styled(ProfileIc)`
  width: 17px;
  height: 17px;
`;

const BottomIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.1875rem;
`;

const LikeIcon = styled(LikeIc)`
  width: 14px;
  height: 14px;
`;
const BookmarkIcon = styled(BookmarkIc)`
  width: 14px;
  height: 14px;
`;
const CommentIcon = styled(CommentIc)`
  width: 14px;
  height: 14px;
`;
