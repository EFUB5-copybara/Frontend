import React from "react";
import styled from "styled-components";
import cookiejar0Img from "../assets/svgs/cookie_jar0.svg";

function Cookiejar() {
  return (
    <Wrapper>
      <CookieJar src={cookiejar0Img} alt="cookie jar" />
    </Wrapper>
  );
}

export default Cookiejar;

const Wrapper = styled.div`
  width: 100%;
  height: 178px;
  border-radius: 20px;
  padding: 0 70px;
  border: 1px solid ${({ theme }) => theme.colors.black};
  position: relative;
  box-sizing: border-box;
`;

const CookieJar = styled.img`
  width: 100%;
`;
