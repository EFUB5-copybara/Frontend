import axiosInstance from '@/api/axiosInstance';

// 일별 질문 조회
export const getDailyQuestion = async (date) => {
  const response = await axiosInstance.get(`/questions/${date}`);
  return response.data;
};

// 오늘 질문 조회
export const getTodayQuestion = async () => {
  const response = await axiosInstance.get(`/questions/today`);
  return response.data;
};

// 월별 답변 여부 조회
export const getMonthlyAnswerStatus = async (year, month) => {
  const response = await axiosInstance.get('/calendar/answers', {
    params: { year, month },
  });
  return response.data.answeredDates;
};

// 월별 답변 조회
export const getMonthlyAnswer = async (year, month) => {
  const response = await axiosInstance.get('/answers/me', {
    params: { year, month },
  });
  return response.data;
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
  const response = await axiosInstance.get('/answers/streak');
  return response.data;
};

// 힌트 조회
export const getQuestionHints = async (date) => {
  const response = await axiosInstance.get(`/questions/${date}/hints`);
  return response.data;
};

// 문법 검사
export const checkGrammar = async (text) => {
  const response = await axiosInstance.post('/api/grammar/check', { text });
  return response.data;
};

// 포춘쿠키 열기
export const openFortuneCookie = async () => {
  const response = await axiosInstance.get('/item/fortune-cookie');
  return response.data;
};

// 포춘쿠키 사용 여부 확인
export const checkFortuneCookieUsed = async () => {
  const response = await axiosInstance.get('/item/fortune-cookie/used');
  return response.data.todayUsed;
};

// 아이템 보유 개수 조회
export const getItemCounts = async () => {
  const response = await axiosInstance.get('/items/count');
  return response.data;
};

// 열쇠 아이템 사용
export const KeyItem = async (date) => {
  const response = await axiosInstance.post('/items/use?type=KEY', {
    date,
  });
  return response.data;
};

// 방패 아이템 사용
export const ShieldItem = async (date) => {
  const res = await axiosInstance.post('/items/use?type=SHIELD', {
    date,
  });
  return res.data;
};

// 지우개 아이템 사용
export const EraserItem = async (date) => {
  const res = await axiosInstance.post('/items/use?type=ERASER', {
    date,
  });
  return res.data;
};

// 답변 조회
export const getAnswer = async (date) => {
  const response = await axiosInstance.get(`/questions/${date}/answer`);
  return response.data;
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
  const res = await axiosInstance.get('/cookies', {
    params: { year, month },
  });
  return res.data;
};
