import axiosInstance from '@/api/axiosInstance';

export const fetchPopularPosts = (date) =>
  axiosInstance.get('/community/posts/popular', {
    params: {
      date,
    },
  });

export const fetchNewPosts = (date) =>
  axiosInstance.get('/community/posts/new', {
    params: {
      date,
    },
  });

export const fetchPostDetail = (postId) =>
  axiosInstance.get(`/community/posts/${postId}`);

export const fetchAnsweredDates = ({ year, month }) =>
  axiosInstance.get('/calendar/answers', {
    params: { year, month },
  });
