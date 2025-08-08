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

export const addBookmark = (postId) => {
  return axiosInstance.post(`/community/${postId}/bookmarks`);
};

export const deleteBookmark = (bookmarkId) => {
  return axiosInstance.delete(`/community/bookmarks/${bookmarkId}`);
};

export const likePost = (postId) => {
  return axiosInstance.post(`/community/${postId}/likes`);
};

export const unlikePost = (likeId) => {
  return axiosInstance.delete(`/community/likes/${likeId}`);
};

export const addComment = (postId, content) => {
  return axiosInstance.post(`/community/${postId}/comments`, { content });
};

export const removeComment = (commentId) => {
  return axiosInstance.delete(`/community/comments/${commentId}`);
};

export const getUserProfile = (userId) => {
  return axiosInstance.get(`/community/members/${userId}`);
};
