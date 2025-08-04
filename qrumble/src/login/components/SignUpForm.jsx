import Input from './Input';
import styled from 'styled-components';
import PasswordInput from './PasswordInput';

export default function SignUpForm({
  form,
  onChange,
  onCheckUsername,
  errors,
}) {
  return (
    <Container>
      <IdWrapper>
        <div style={{ flex: 1 }}>
          <Input
            name='username'
            placeholder='아이디'
            value={form.username}
            onChange={onChange}
          />
          {errors?.username && <ErrorText>{errors.username}</ErrorText>}
        </div>
        <CheckButton onClick={onCheckUsername}>중복확인</CheckButton>
      </IdWrapper>

      <div>
        <PasswordInput
          name='password'
          placeholder='비밀번호'
          value={form.password}
          onChange={onChange}
        />
        {errors?.password && <ErrorText>{errors.password}</ErrorText>}
      </div>

      <div>
        <PasswordInput
          name='confirmPassword'
          placeholder='비밀번호 확인'
          value={form.confirmPassword}
          onChange={onChange}
        />
        {errors?.confirmPassword && (
          <ErrorText>{errors.confirmPassword}</ErrorText>
        )}
      </div>

      <div>
        <Input
          name='nickname'
          placeholder='닉네임'
          value={form.nickname}
          onChange={onChange}
        />
        {errors?.nickname && <ErrorText>{errors.nickname}</ErrorText>}
      </div>

      <div>
        <Input
          name='email'
          placeholder='이메일 입력'
          value={form.email}
          onChange={onChange}
        />
        {errors?.email && <ErrorText>{errors.email}</ErrorText>}
      </div>

      <Info>
        ※ 앱의 기능을 모두 이용하기 위해선 정확한 개인정보 입력이 필요합니다
      </Info>
    </Container>
  );
}

const Container = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: hidden;
  justify-content: space-between;
`;

const IdWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
`;

const CheckButton = styled.button`
  width: 5.4375rem;
  height: 3.125rem;
  padding: 1rem 0.9375rem;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.brown1};
  color: white;
  white-space: nowrap;
`;

const Info = styled.p`
  ${({ theme }) => theme.fonts.c14M};
  color: ${({ theme }) => theme.colors.brown2};
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error || 'red'};
  font-size: 12px;
  margin: 4px 0 8px 4px;
`;
