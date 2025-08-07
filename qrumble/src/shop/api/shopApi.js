import axiosInstance from '@/api/axiosInstance';

// 아이템
export const getItemList = async () => {
  try {
    const response = await axiosInstance.get('/shops/items', {
      headers: { 'Cache-Control': 'no-cache' }
    });
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
    console.log(`아이템 구매 API 요청: /shops/items/${itemId}/purchasing`);
    const response = await axiosInstance.post(`/shops/items/${itemId}/purchasing`);
    console.log('아이템 구매 API 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('아이템 구매 실패:', error.response?.data || error.message);
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

// 폰트 상세 정보 가져올 때 소유 상태도 확실히 가져오기
export const getFontsDetail = async (fontId) => {
  try {
    const response = await axiosInstance.get(`/shops/fonts/${fontId}/details`, {
      headers: { 'Cache-Control': 'no-cache, no-store' } // 캐시 방지
    });
    
    // 소유 여부 명확히 처리
    const data = response.data;
    // boolean으로 명확하게 변환
    if (data) {
      data.isOwned = data.isOwned === true;
    }
    
    console.log(`폰트 ${fontId} 상세 정보 (캐시 없음):`, data);
    return data;
  } catch (error) {
    console.error('폰트 상세 조회 실패:', error);
    throw error;
  }
};

export const purchaseFont = async (fontId) => {
  try {
    console.log(`폰트 구매 API 요청: /shops/fonts/${fontId}/purchasing`);
    
    const response = await axiosInstance.patch(`/shops/fonts/${fontId}/purchasing`);
    
    console.log('폰트 구매 API 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('폰트 구매 실패:', error);
    
    if (error.response) {
      console.error('서버 응답:', error.response.status, error.response.data);
    }
    
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
    const response = await axiosInstance.get(`/shops/papers/${paperId}/details`, {
      headers: { 'Cache-Control': 'no-cache, no-store' } // 캐시 방지
    });
    
    const data = response.data;
    if (data) {
      data.isOwned = data.isOwned === true;
    }
    
    console.log(`종이 ${paperId} 상세 정보 (캐시 없음):`, data);
    return data;
  } catch (error) {
    console.error('종이 상세 조회 실패:', error);
    throw error;
  }
};

export const purchasePaper = async (paperId) => {
  try {
    console.log(`종이 구매 API 요청: /shops/papers/${paperId}/purchasing`);
    
    const response = await axiosInstance.patch(`/shops/papers/${paperId}/purchasing`);
    
    console.log('종이 구매 API 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('종이 구매 실패:', error);
    
    if (error.response) {
      console.error('서버 응답:', error.response.status, error.response.data);
    }
    
    throw error;
  }
};

export const getMyPoint = async () => {
  try {
    console.log('포인트 조회 API 요청: /shops/points');
    const response = await axiosInstance.get('/shops/points', {
      headers: { 
        'Cache-Control': 'no-cache, no-store',
        'Pragma': 'no-cache'
      }
    });
    console.log('포인트 조회 API 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('내 포인트 조회 실패:', error);
    throw error;
  }
};

export const getMyItems = async () => {
  try {
    const response = await axiosInstance.get('/items/count', {
      headers: { 'Cache-Control': 'no-cache' }
    });
    return response.data;
  } catch (error) {
    console.error('내 아이템 조회 실패:', error);
    throw error;
  }
}
