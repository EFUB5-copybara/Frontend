import React, { useState } from "react";
import styled from "styled-components";
import WriteTopBar from "./components/WriteTopBar";
import WriteQuestion from "./components/WriteQuestion";
import WriteBottomBar from "./components/WriteBottomBar";

function WritePage() {
  return (
    <Container>
      <Top>
        <WriteTopBar />
        <WriteQuestion />
      </Top>
      <WriteBottomBar />
    </Container>
  );
}

export default WritePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 20px 24px 20px;
  background-color: ${({ theme }) => theme.colors.white};
  gap: 14px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 19px;
`;
