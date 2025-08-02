import axios from '../../api/axiosInstance';

export const fetchUserInfo = async () => {
  const response = await axios.get('/mypage', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};
