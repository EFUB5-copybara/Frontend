import axiosInstance from '@/api/axiosInstance';

export const fetchPopularPosts = () =>
  axiosInstance.get('/community/posts/popular');

export const fetchNewPosts = () => axiosInstance.get('/community/posts/new');
