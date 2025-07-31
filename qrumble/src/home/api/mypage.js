import axiosInstance from '@/api/axiosInstance';

// 질문 불러오기
export const fetchDailyQuestion = async (date) => {
  try {
    const response = await axios.get(`/questions/${date}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//
