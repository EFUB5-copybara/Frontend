import React from "react";
import styled from "styled-components";
import cookieImg from "../assets/cookie.svg";

function CookieCard({ cookies, maxCookies }) {
    return (
        <StyledCookieCard>
            <CookieLabelWrapper>
                <CookieLabel>내가 모은 쿠키</CookieLabel>
                <CookieCount>{cookies}개</CookieCount>
            </CookieLabelWrapper>
            <CookieRow>
                {[...Array(maxCookies)].map((_, i) => (
                    <CookieIcon
                        key={i}
                        src={cookieImg}
                        alt="cookie"
                        $active={i < cookies}
                    />
                ))}
            </CookieRow>
        </StyledCookieCard>
    );
}

const StyledCookieCard = styled.div`
  width: 100%;
  max-width: 320px;
  height: 100px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.brown1};
  background: ${({ theme }) => theme.colors.white};
  padding: 5px 13px 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CookieLabelWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const CookieLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.sub16SB};
  color: ${({ theme }) => theme.colors.primary};
`;

const CookieCount = styled.span`
  color: ${({ theme }) => theme.colors.green};
  font-family: ${({ theme }) => theme.fonts.c14M};
  margin-left: 6px;
  text-align: center;
`;

const CookieRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  margin-top: 4px;
`;

const CookieIcon = styled.img`
  width: 49px;
  height: 49px;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
`;

export default CookieCard;