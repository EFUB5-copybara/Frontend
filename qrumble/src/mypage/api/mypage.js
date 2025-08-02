import axios from '../../api/axiosInstance';

// 마이페이지 조회
export const getMyPage = async () => {
  try {
    const response = await axios.get('/members/mypage', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('마이페이지 조회 실패:', error);
    throw error;
  }
};

// 멤버 수정
export const updateMemberInfo = async ({ nickname, email }) => {
  try {
    const response = await axios.patch(
      '/members',
      { nickname, email },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('회원 정보 수정 실패:', error);
    throw error;
  }
};

// 내 정보
export const getMyInfo = async () => {
  try {
    const response = await axios.get('/members/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('내 정보 조회 실패:', error);
    throw error;
  }
};

// 내 기록
export const getMyRecords = async () => {
  try {
    const response = await axios.get('/members/me/answers', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('내 기록 조회 실패:', error);
    throw error;
  }
};

// 북마크
export const getMyBookmarks = async () => {
  try {
    const response = await axios.get('/members/me/bookmarks', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('북마크 목록 조회 실패:', error);
    throw error;
  }
};

// 폰트 적용
export const patchFont = async (fontId) => {
  const response = await axios.patch(`/use/fonts/${fontId}`);
  return response.data;
};

// 종이 적용
export const patchPaper = async (paperId) => {
  const response = await axios.patch(`/use/papers/${paperId}`);
  return response.data;
};
