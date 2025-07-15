import React from 'react';
import styled from 'styled-components';

export default function AnswerItem() {
  return (
    <Container>
      <Numbering>1</Numbering>
      <TitleTextWrapper>
        <Title>name</Title>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim minima
          at non eveniet facilis provident optio ea alias dolor rem! Minima
          placeat at hic quidem voluptatibus consequatur vero saepe similique.
        </Text>
      </TitleTextWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 320px;
  height: 104px;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 0.625rem 1.25rem;
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.colors.brown1};
  border-radius: 0.625rem;
`;

const Numbering = styled.p`
  color: ${({ theme }) => theme.colors.primary};
`;

const TitleTextWrapper = styled.div`
  width: 261px;
  height: 52px;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0 0.5625rem;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${({ theme }) => theme.colors.ivory2};
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.primary};
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  white-space: nowrap;
`;

const ProfileInfo = styled.img``;

const Name = styled.p`
  /* font-size: ${({ theme }) => theme.typography}; */
`;
