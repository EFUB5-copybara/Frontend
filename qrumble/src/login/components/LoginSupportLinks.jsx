import React from 'react';
import styled from 'styled-components';

export default function LoginSupportLinks() {
  return (
    <div>
      <Link href='/find-id'>아이디 찾기</Link>
      <Divider> | </Divider>
      <Link href='/reset-password'>비밀번호 변경</Link>
      <Divider> | </Divider>
      <Link href='/sign-up'>회원가입</Link>
    </div>
  );
}

const Link = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.caption12M};
`;

const Divider = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.caption12M};
`;
