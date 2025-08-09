import axios from '../../api/axiosInstance';

// 마이페이지 조회
export const getMyPage = async () => {
  try {
    const response = await axios.get('/mypage');
    return response.data;
  } catch (error) {
    console.error('마이페이지 조회 실패:', error);
    throw error;
  }
};

// 멤버 수정
export const updateMemberInfo = async ({ nickname, email }) => {
  try {
    const response = await axios.patch('/mypage/my-info', { nickname, email });
    return response.data;
  } catch (error) {
    console.error('회원 정보 수정 실패:', error);
    throw error;
  }
};

// 내 정보
export const getMyInfo = async () => {
  try {
    const response = await axios.get('/mypage/my-info', {
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
    const response = await axios.get('/mypage/records');
    return response.data;
  } catch (error) {
    console.error('내 기록 조회 실패:', error);
    throw error;
  }
};

// 북마크
export const getMyBookmarks = async () => {
  try {
    const response = await axios.get('/mypage/bookmarks');
    return response.data;
  } catch (error) {
    console.error('북마크 목록 조회 실패:', error);
    throw error;
  }
};

// 폰트 적용
export const patchFont = async (fontId) => {
  const response = await axios.post(`/use/fonts/${fontId}`);
  return response.data;
};

// 종이 적용
export const patchPaper = async (paperId) => {
  const response = await axios.post(`/use/papers/${paperId}`);
  return response.data;
};
