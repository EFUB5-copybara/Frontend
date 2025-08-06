import axiosInstance from '@/api/axiosInstance';

// 아이템
export const getItemList = async () => {
  try {
    const response = await axiosInstance.get('/shops/items');
    return response.data;
  } catch (error) {
    console.error('아이템 목록 조회 실패:', error);
    throw error;
  }
};

export const getItemDetail = async (itemId) => {
  try {
    const response = await axiosInstance.get(`/shops/items/${itemId}/details`);
    return response.data;
  } catch (error) {
    console.error('아이템 상세 조회 실패:', error);
    throw error;
  }
};

export const purchaseItem = async (itemId) => {
  try {
    const response = await axiosInstance.patch(`/shops/items/${itemId}/purchasing`);
    return response.data;
  } catch (error) {
    console.error('아이템 구매 실패:', error);
    throw error;
  }
};

// 폰트
export const getFontsList = async () => {
  try {
    const response = await axiosInstance.get('/shops/fonts');
    return response.data;
  } catch (error) {
    console.error('폰트 목록 조회 실패:', error);
    throw error;
  }
};

export const getFontsDetail = async (fontId) => {
  try {
    const response = await axiosInstance.get(`/shops/fonts/${fontId}/details`);
    return response.data;
  } catch (error) {
    console.error('폰트 상세 조회 실패:', error);
    throw error;
  }
};

export const purchaseFont = async (fontId) => {
  try {
    const response = await axiosInstance.patch(`/shops/fonts/${fontId}/purchasing`);
    return response.data;
  } catch (error) {
    console.error('폰트 구매 실패:', error);
    throw error;
  }
};

// 종이
export const getPapersList = async () => {
  try {
    const response = await axiosInstance.get('/shops/papers');
    return response.data;
  } catch (error) {
    console.error('종이 목록 조회 실패:', error);
    throw error;
  }
};

export const getPapersDetail = async (paperId) => {
  try {
    const response = await axiosInstance.get(`/shops/papers/${paperId}/details`);
    return response.data;
  } catch (error) {
    console.error('종이 상세 조회 실패:', error);
    throw error;
  }
};

export const purchasePaper = async (paperId) => {
  try {
    const response = await axiosInstance.patch(`/shops/papers/${paperId}/purchasing`);
    return response.data;
  } catch (error) {
    console.error('종이 구매 실패:', error);
    throw error;
  }
};

export const getMyPoint = async () => {
  try {
    const response = await axiosInstance.get('/shops/points');
    return response.data;
  } catch (error) {
    console.error('내 포인트 조회 실패:', error);
    throw error;
  }
};

export const getMyItems = async () => {
  try {
    const response = await axiosInstance.get('/items/count');
    return response.data;
  } catch (error) {
    console.error('내 아이템 조회 실패:', error);
    throw error;
  }
}