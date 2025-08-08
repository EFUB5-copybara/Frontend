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
// 폰트 목록 조회 시 캐시 방지 및 타임스탬프 추가
export const getFontsList = async () => {
  try {
    // 확실한 캐시 방지를 위한 타임스탬프 및 헤더 추가
    const timestamp = new Date().getTime();
    const response = await axiosInstance.get(`/shops/fonts?_t=${timestamp}`, {
      headers: { 
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    // 데이터 변환 및 소유 상태 명확하게 처리
    const data = response.data;
    if (Array.isArray(data)) {
      // 각 폰트의 소유 상태를 명확하게 boolean으로 변환
      const processedData = data.map(item => {
        if (item) {
          return {
            ...item,
            isOwned: item.isOwned === true
          };
        }
        return item;
      });
      console.log('폰트 목록 조회 결과:', processedData);
      return processedData;
    }
    
    return data;
  } catch (error) {
    console.error('폰트 목록 조회 실패:', error);
    throw error;
  }
};

// 폰트 상세 정보 가져올 때 소유 상태도 확실히 가져오기
export const getFontsDetail = async (fontId) => {
  try {
    // 캐시를 완전히 무시하는 헤더 추가
    const response = await axiosInstance.get(`/shops/fonts/${fontId}/details`, {
      headers: { 
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      // 매번 새로운 요청으로 인식하게 하는 임의의 쿼리 파라미터 추가
      params: { 
        _t: new Date().getTime() 
      }
    });
    
    const data = response.data;
    // boolean으로 명확하게 변환하고 로그 추가
    if (data) {
      data.isOwned = data.isOwned === true;
      console.log(`폰트 ${fontId} 소유 상태 (API 응답):`, data.isOwned);
    }
    
    return data;
  } catch (error) {
    console.error('폰트 상세 조회 실패:', error);
    throw error;
  }
};

export const purchaseFont = async (fontId) => {
  try {
    console.log(`폰트 구매 API 요청: /shops/fonts/${fontId}/purchasing`);
    
    const response = await axiosInstance.post(`/shops/fonts/${fontId}/purchasing`, null, {
      headers: {
        'Cache-Control': 'no-cache, no-store',
        'Pragma': 'no-cache'
      }
    });
    
    console.log('폰트 구매 API 응답:', response.data);
    // 성공적으로 구매 완료된 경우 소유 상태를 true로 표시
    return { ...response.data, forceOwned: true };
  } catch (error) {
    console.error('폰트 구매 실패:', error);
    
    if (error.response && error.response.status === 400) {
      if (error.response.data?.message?.includes('already') || 
          error.response.data?.errorCode === 'ALREADY_PURCHASED' ||
          error.response.data?.message?.includes('이미 구매')) {
        console.log('이미 구매한 상품입니다. 소유 상태로 처리합니다.');
        return { success: true, alreadyOwned: true, forceOwned: true };
      }
    }
    throw error;
  }
};

// 종이
export const getPapersList = async () => {
  try {
    // 확실한 캐시 방지를 위한 타임스탬프 및 헤더 추가
    const timestamp = new Date().getTime();
    const response = await axiosInstance.get(`/shops/papers?_t=${timestamp}`, {
      headers: { 
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    // 데이터 변환 및 소유 상태 명확하게 처리
    const data = response.data;
    if (Array.isArray(data)) {
      // 각 종이의 소유 상태를 명확하게 boolean으로 변환
      const processedData = data.map(item => {
        if (item) {
          return {
            ...item,
            isOwned: item.isOwned === true
          };
        }
        return item;
      });
      console.log('종이 목록 조회 결과:', processedData);
      return processedData;
    }
    
    return data;
  } catch (error) {
    console.error('종이 목록 조회 실패:', error);
    throw error;
  }
};

export const getPapersDetail = async (paperId) => {
  try {
    const response = await axiosInstance.get(`/shops/papers/${paperId}/details`, {
      headers: { 
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      params: { 
        _t: new Date().getTime() 
      }
    });
    
    const data = response.data;
    if (data) {
      data.isOwned = data.isOwned === true;
      console.log(`종이 ${paperId} 소유 상태 (API 응답):`, data.isOwned);
    }
    
    return data;
  } catch (error) {
    console.error('종이 상세 조회 실패:', error);
    throw error;
  }
};

export const purchasePaper = async (paperId) => {
  try {
    console.log(`종이 구매 API 요청: /shops/papers/${paperId}/purchasing`);
    
    const response = await axiosInstance.post(`/shops/papers/${paperId}/purchasing`, null, {
      headers: {
        'Cache-Control': 'no-cache, no-store',
        'Pragma': 'no-cache'
      }
    });
    
    console.log('종이 구매 API 응답:', response.data);
    return { ...response.data, forceOwned: true };
  } catch (error) {
    console.error('종이 구매 실패:', error);
    
    if (error.response && error.response.status === 400) {
      if (error.response.data?.message?.includes('already') || 
          error.response.data?.errorCode === 'ALREADY_PURCHASED' ||
          error.response.data?.message?.includes('이미 구매')) {
        console.log('이미 구매한 상품입니다. 소유 상태로 처리합니다.');
        return { success: true, alreadyOwned: true, forceOwned: true };
      }
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
