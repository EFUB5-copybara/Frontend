import React from 'react';
import BackIc from '../assets/svgs/btn_back.svg?react';
import styled from 'styled-components';

export default function BackButton({ onClick }) {
  return (
    <ButtonWrapper onClick={onClick}>
      <BackIcon />
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div`
  cursor: pointer;
  display: flex;

  justify-content: flex-start;
  align-items: center;
`;

const BackIcon = styled(BackIc)`
  width: 46px;
  height: 46px;
`;
