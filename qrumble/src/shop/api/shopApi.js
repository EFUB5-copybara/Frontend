import axiosInstance from '@/api/axiosInstance';

// 아이템
export const fetchItems = async () => {
  try {
    const response = await axiosInstance.get('/shops/items');
    return response.data;
  } catch (error) {
    console.error('아이템 목록 조회 실패:', error);
    throw error;
  }
};

export const fetchItemDetail = async (itemId) => {
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
export const fetchFonts = async () => {
  try {
    const response = await axiosInstance.get('/shops/fonts');
    return response.data;
  } catch (error) {
    console.error('폰트 목록 조회 실패:', error);
    throw error;
  }
};

export const fetchFontDetail = async (fontId) => {
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
export const fetchPapers = async () => {
  try {
    const response = await axiosInstance.get('/shops/papers');
    return response.data;
  } catch (error) {
    console.error('종이 목록 조회 실패:', error);
    throw error;
  }
};

export const fetchPaperDetail = async (paperId) => {
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