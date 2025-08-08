import axiosInstance from '@/api/axiosInstance';

// 일별 질문 조회
export const getDailyQuestion = async (date) => {
  try {
    const response = await axiosInstance.get(`/questions/${date}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 오늘 질문 조회
export const getTodayQuestion = async () => {
  try {
    const response = await axiosInstance.get(`/questions/today`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 월별 답변 여부 조회
export const getMonthlyAnswerStatus = async (year, month) => {
  try {
    const response = await axiosInstance.get('/calendar/answers', {
      params: { year, month },
    });
    return response.data.answeredDates;
  } catch (error) {
    throw error;
  }
};

// 월별 답변 조회
export const getMonthlyAnswer = async (year, month) => {
  try {
    const response = await axiosInstance.get('/answers/me', {
      params: { year, month },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 월별 답변에서 질문 추출
export const getMonthlyQuestions = async (year, month) => {
  try {
    const response = await axiosInstance.get('/answers/me', {
      params: { year, month },
    });

    // 필요한 데이터만 추출
    const rawAnswers = response.data.answers;
    const filtered = rawAnswers.map((item) => ({
      id: item.id,
      date: new Date(item.createdAt)
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, '.'),
      question: item.question,
      answer: item.content,
      likeCount: item.likeCount,
      bookmarkCount: item.bookmarkCount,
    }));

    return filtered;
  } catch (error) {
    console.error('월별 질문 로딩 실패:', error);
    return [];
  }
};

// 연속 답변 일수 조회
export const getAnswerStreak = async () => {
  try {
    const response = await axiosInstance.get('/answers/streak');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 힌트 조회
export const getQuestionHints = async (date) => {
  try {
    const response = await axiosInstance.get(`/questions/${date}/hints`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 문법 검사
export const checkGrammar = async (text) => {
  try {
    const response = await axiosInstance.post('/api/grammar/check', { text });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 포춘쿠키 열기
export const openFortuneCookie = async () => {
  try {
    const response = await axiosInstance.get('/item/fortune-cookie');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 포춘쿠키 사용 여부 확인
export const checkFortuneCookieUsed = async () => {
  try {
    const response = await axiosInstance.get('/item/fortune-cookie/used');
    return response.data.todayUsed;
  } catch (error) {
    throw error;
  }
};

// 아이템 보유 개수 조회
export const getItemCounts = async () => {
  try {
    const response = await axiosInstance.get('/items/count');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 열쇠 아이템 사용
export const useKeyItem = async (date) => {
  try {
    const response = await axiosInstance.post('/items/use?type=KEY', {
      date,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 방패 아이템 사용
export const useShieldItem = async (date) => {
  try {
    const res = await axiosInstance.post('/items/use?type=SHIELD', {
      date,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 지우개 아이템 사용
export const useEraserItem = async (date) => {
  try {
    const res = await axiosInstance.post('/items/use?type=ERASER', {
      date,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 답변 조회
export const getAnswer = async (date) => {
  try {
    const response = await axiosInstance.get(`/questions/${date}/answer`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 답변 생성
export const createAnswer = async (date, content, isPublic) => {
  try {
    const response = await axiosInstance.post(`/questions/${date}/answer`, {
      content,
      isPublic,
    });
    return response.data;
  } catch (error) {
    console.error('답변 생성 실패:', error);
    throw error;
  }
};

// 쿠키 개수 조회
export const getCookiesNumber = async (year, month) => {
  try {
    const response = await axiosInstance.get(`/cookies`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
