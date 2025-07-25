import React from "react";
import styled from "styled-components";
import userImg from "../assets/svgs/userimg.svg";
import brownlikeImg from "../assets/svgs/brownlike.svg";
import browncommentImg from "../assets/svgs/brownmessage.svg";
import brownbookmarkImg from "../assets/svgs/brownbookmark.svg";

function AnswerCard({ rank, title, subtitle, userId }) {
  const bottomIcons = [brownlikeImg, browncommentImg, brownbookmarkImg];

  return (
    <Wrapper>
      <Rank>{rank}</Rank>
      <Content>
        <AnswerTitle>
          {title} <span>{subtitle}</span>
        </AnswerTitle>
        <Meta>
          <AnswerId>
            <AnswerIdImg src={userImg} alt="user" />
            {userId}
          </AnswerId>
          <AnswerBottomWrapper>
            {bottomIcons.map((img, idx) => (
              <AnswerBottomItem key={idx}>
                <AnswerBottomImg src={img} alt="icon" />
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
  padding: 0 10px 0 20px;
  height: 104px;
  border: 1px solid ${({ theme }) => theme.colors.brown1};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  gap: 10px;
  justify-content: space-between;
  align-items: center;
`;

const Rank = styled.div`
  font-family: ${({ theme }) => theme.fonts.b16B};
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
  font-family: ${({ theme }) => theme.fonts.b16B};
  background-color: ${({ theme }) => theme.colors.ivory2};
  color: ${({ theme }) => theme.colors.primary};
  padding: 3px 9px 9px 8px;
  margin-top: 10px;

  span {
    font-family: ${({ theme }) => theme.fonts.c12L};
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-family: ${({ theme }) => theme.fonts.c12M};
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
  font-family: ${({ theme }) => theme.fonts.c12M};
  color: ${({ theme }) => theme.colors.brown1};
`;

const AnswerBottomImg = styled.img`
  width: 14px;
  height: 14px;
`;
