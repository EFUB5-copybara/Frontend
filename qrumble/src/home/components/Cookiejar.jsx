import React from "react";
import styled from "styled-components";
import cookiejar0Img from "../assets/svgs/cookie_jar0.svg";
import cookiejar1Img from "../assets/svgs/cookie_jar1.svg";
import cookiejar2Img from "../assets/svgs/cookie_jar2.svg";
import cookiejar3Img from "../assets/svgs/cookie_jar3.svg";
import cookiejar4Img from "../assets/svgs/cookie_jar4.svg";
import cookiejar5Img from "../assets/svgs/cookie_jar5.svg";
import cookiejar6Img from "../assets/svgs/cookie_jar6.svg";

function Cookiejar({ level }) {
  const cookieJarImages = [
    cookiejar0Img,
    cookiejar1Img,
    cookiejar2Img,
    cookiejar3Img,
    cookiejar4Img,
    cookiejar5Img,
    cookiejar6Img,
  ];

  return (
    <Wrapper>
      <CookieJar
        src={cookieJarImages[level]}
        alt={`cookie jar level ${level}`}
      />
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
