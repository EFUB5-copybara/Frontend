import axiosInstance from '@/api/axiosInstance';

export const fetchDailyQuestion = async (date) => {
  try {
    const response = await axios.get(`/questions/${date}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
