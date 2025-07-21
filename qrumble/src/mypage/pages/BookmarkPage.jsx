import React, { useState } from "react";
import styled from "styled-components";
import MyPageTopBar from "../components/MyPageTopBar";

function BookmarkPage() {
  return (
    <Wrapper>
      <MyPageTopBar title="북마크" />
    </Wrapper>
  );
}

export default BookmarkPage;

const Wrapper = styled.div`
  width: 360px;
  height: 800px;
  position: relative;
`;
