import React from 'react';
import styled from 'styled-components';
import userImg from '../assets/svgs/userimg.svg';
import brownlikeImg from '../assets/svgs/brownlike.svg';
import browncommentImg from '../assets/svgs/brownmessage.svg';
import brownbookmarkImg from '../assets/svgs/brownbookmark.svg';
import { useNavigate } from 'react-router-dom';

function AnswerCard({ id, title, subtitle, userId, rank }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/community/${id}`);
  };

  const bottomIcons = [brownlikeImg, browncommentImg, brownbookmarkImg];

  return (
    <Wrapper onClick={handleClick} $hasRank={!!rank}>
      {rank && <Rank>{rank}</Rank>}
      <Content>
        <AnswerTitle>
          {title} <span>{subtitle}</span>
        </AnswerTitle>
        <Meta>
          <AnswerId>
            <AnswerIdImg src={userImg} alt='user' />
            {userId}
          </AnswerId>
          <AnswerBottomWrapper>
            {bottomIcons.map((img, idx) => (
              <AnswerBottomItem key={idx}>
                <AnswerBottomImg src={img} alt='icon' />
              </AnswerBottomItem>
            ))}
          </AnswerBottomWrapper>
        </Meta>
      </Content>
    </Wrapper>
  );
}

export default AnswerCard;

const Wrapper = styled.div`
  display: flex;
  padding: ${({ $hasRank }) => ($hasRank ? '0 10px 0 20px' : '0 20px')};
  height: 104px;
  border: 1px solid ${({ theme }) => theme.colors.brown1};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Rank = styled.div`
  ${({ theme }) => theme.fonts.b16B};
  color: ${({ theme }) => theme.colors.primary};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const AnswerTitle = styled.div`
  display: flex;
  flex-direction: column;
  width: 261px;
  height: 52px;
  ${({ theme }) => theme.fonts.b16B};
  background-color: ${({ theme }) => theme.colors.ivory2};
  color: ${({ theme }) => theme.colors.primary};
  padding: 3px 9px 9px 8px;
  margin-top: 10px;

  span {
    ${({ theme }) => theme.fonts.c12L};
  }
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

const AnswerIdImg = styled.img`
  width: 17px;
  height: 17px;
  border-radius: 50%;
`;

const AnswerBottomWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AnswerBottomItem = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  ${({ theme }) => theme.fonts.c12M};
  color: ${({ theme }) => theme.colors.brown1};
`;

const AnswerBottomImg = styled.img`
  width: 14px;
  height: 14px;
`;
