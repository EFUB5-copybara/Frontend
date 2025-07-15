import React from 'react';
import BackIc from '../assets/svgs/btn_back.svg?react';
import styled from 'styled-components';

export default function BackButton() {
  return (
    <ButtonWrapper>
      <BackIcon />
    </ButtonWrapper>
  );
}

const BackIcon = styled(BackIc)`
  width: 46px;
  height: 46px;
`;
