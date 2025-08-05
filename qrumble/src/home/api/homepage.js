import axiosInstance from '@/api/axiosInstance';
import axios from 'axios';

// 일별 질문 조회
export const getDailyQuestion = async (date) => {
  try {
    const response = await axios.get(`/questions/${date}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 오늘 질문 조회
export const getTodayQuestion = async () => {
  try {
    const response = await axios.get(`/questions/today`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 월별 답변 여부 조회
export const getMonthlyAnswerStatus = async (year, month) => {
  try {
    const response = await axios.get('/calendar/answers', {
      params: { year, month },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data.answeredDates;
  } catch (error) {
    throw error;
  }
};

// 월별 답변 조회
export const getMonthlyAnswer = async (year, month) => {
  try {
    const response = await axios.get('/answers/me', {
      params: { year, month },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data.answers;
  } catch (error) {
    throw error;
  }
};

// 연속 답변 일수 조회
export const getAnswerStreak = async () => {
  try {
    const response = await axios.get('/answers/streak', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data.streak;
  } catch (error) {
    throw error;
  }
};

// 힌트 조회
export const getQuestionHints = async (date) => {
  try {
    const response = await axios.get(`/questions/${date}/hints`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 문법 검사
export const checkGrammar = async (text) => {
  try {
    const response = await axiosInstance.post(
      '/api/grammar/check',
      { text },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 포춘쿠키 열기
export const openFortuneCookie = async () => {
  try {
    const response = await axiosInstance.get('/items/fortune-cookie', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 포춘쿠키 사용 여부 확인
export const checkFortuneCookieUsed = async () => {
  try {
    const response = await axiosInstance.get('/items/fortune-cookie/used', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data.alreadyOpened;
  } catch (error) {
    throw error;
  }
};

// 아이템 보유 개수 조회
export const getItemCounts = async () => {
  try {
    const response = await axios.get('/items/count', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 아이템 사용 함수
const useItem = async (type) => {
  try {
    const response = await axios.post(
      '/items/use',
      { type },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 열쇠 아이템 사용
export const useKeyItem = async () => {
  return await useItem('KEY');
};

// 방패 아이템 사용
export const useShieldItem = async () => {
  return await useItem('SHIELD');
};

// 지우개 아이템 사용
export const useEraserItem = async () => {
  return await useItem('ERASER');
};

// 답변 조회
export const getAnswer = async (date) => {
  try {
    const response = await axios.get(`/questions/${date}/answer`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 답변 생성
export const createAnswer = async (date, content, isPublic) => {
  try {
    const response = await axios.post(
      `/questions/${date}/answer`,
      {
        content,
        isPublic,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('답변 생성 실패:', error);
    throw error;
  }
};
