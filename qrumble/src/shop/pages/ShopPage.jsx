import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  getItemList, getFontsList, getPapersList,
  purchaseItem, purchaseFont, purchasePaper,
  getMyPoint,
  getFontsDetail,
  getPapersDetail
} from '../api/shopApi';
import ItemBar from '../components/ItemBar';
import ShopTab from '../components/ShopTab';
import ItemList from '../components/ItemList';
import FontList from '../components/FontList';
import PaperList from '../components/PaperList';
import ShopModal from '../components/ShopModal';
import FontModal from '../components/FontModal';
import PaperModal from '../components/PaperModal';

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState('item');
  const [modalIndex, setModalIndex] = useState(null);
  const [items, setItems] = useState([]);
  const [fonts, setFonts] = useState([]);
  const [papers, setPapers] = useState([]);
  const [userPoint, setUserPoint] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPoint = async () => {
      try {
        const res = await getMyPoint();
        setUserPoint(res.point);
      } catch (e) {
        setUserPoint(0);
      }
    };
    fetchPoint();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (activeTab === 'item') {
      getItemList()
        .then(res => {
          const formattedItems = Array.isArray(res) ? res.map(item => ({
            id: item.id,
            name: item.name,
            desc: item.description,
            price: item.price,
            owned: item.isOwned === true // 항상 명확하게 변환
          })) : [];
          setItems(formattedItems);
        })
        .catch(error => console.error('아이템 로딩 실패:', error))
        .finally(() => setLoading(false));
    } else if (activeTab === 'font') {
      getFontsList()
        .then(res => {
          const formattedFonts = Array.isArray(res) ? res.map(font => ({
            id: font.id,
            name: font.name,
            desc: font.description,
            price: font.price,
            owned: font.isOwned === true
          })) : [];
          setFonts(formattedFonts);
        })
        .catch(error => console.error('폰트 로딩 실패:', error))
        .finally(() => setLoading(false));
    } else if (activeTab === 'paper') {
      getPapersList()
        .then(res => {
          const formattedPapers = Array.isArray(res) ? res.map(paper => ({
            id: paper.id,
            name: paper.name,
            desc: paper.description,
            price: paper.price,
            owned: paper.isOwned === true
          })) : [];
          setPapers(formattedPapers);
        })
        .catch(error => console.error('종이 로딩 실패:', error))
        .finally(() => setLoading(false));
    }
  }, [activeTab]);

  const getCurrentItems = () => {
    switch (activeTab) {
      case 'item': return items;
      case 'font': return fonts;
      case 'paper': return papers;
      default: return [];
    }
  };

  // 아이템 구매 상태 직접 업데이트하는 함수
  const updateItemOwnedStatus = (tab, id, isOwned) => {
    console.log(`아이템 소유 상태 업데이트: ${tab}, ID ${id}, 소유=${isOwned}`);
    
    if (tab === 'item') {
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? { ...item, owned: isOwned } : item
        )
      );
    } else if (tab === 'font') {
      setFonts(prevFonts => 
        prevFonts.map(font => 
          font.id === id ? { ...font, owned: isOwned } : font
        )
      );
    } else if (tab === 'paper') {
      setPapers(prevPapers => 
        prevPapers.map(paper => 
          paper.id === id ? { ...paper, owned: isOwned } : paper
        )
      );
    }
  };

  // 구매 처리 후 즉시 데이터 갱신 함수 추가
  const refreshCurrentTab = async () => {
    setLoading(true);
    try {
      const pointRes = await getMyPoint();
      setUserPoint(pointRes.point);

      // 현재 탭에 맞게 데이터 새로고침
      if (activeTab === 'item') {
        const updatedItems = await getItemList();
        setItems(Array.isArray(updatedItems) ? updatedItems.map(item => ({
          id: item.id,
          name: item.name,
          desc: item.description,
          price: item.price,
          owned: item.isOwned === true
        })) : []);
      } else if (activeTab === 'font') {
        const updatedFonts = await getFontsList();
        setFonts(Array.isArray(updatedFonts) ? updatedFonts.map(font => ({
          id: font.id,
          name: font.name,
          desc: font.description,
          price: font.price,
          owned: font.isOwned === true
        })) : []);
      } else if (activeTab === 'paper') {
        const updatedPapers = await getPapersList();
        setPapers(Array.isArray(updatedPapers) ? updatedPapers.map(paper => ({
          id: paper.id,
          name: paper.name,
          desc: paper.description,
          price: paper.price,
          owned: paper.isOwned === true
        })) : []);
      }
    } catch (error) {
      console.error('데이터 새로고침 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 보유 상태 일관성 체크 및 수정 함수
  const ensureOwnershipConsistency = async () => {
    try {
      // 모든 아이템 타입별로 소유 상태 정확하게 가져오기
      if (activeTab === 'paper' && papers.length > 0) {
        const updatedOwnership = await Promise.all(papers.map(async (paper) => {
          try {
            const detail = await getPapersDetail(paper.id);
            // 이미 UI에서 owned가 true이거나 API에서 isOwned가 true인 경우 true로 설정
            return { id: paper.id, owned: paper.owned || detail.isOwned === true };
          } catch (err) {
            return { id: paper.id, owned: paper.owned };
          }
        }));
        
        // 소유 상태 업데이트
        setPapers(papers.map(paper => {
          const updated = updatedOwnership.find(item => item.id === paper.id);
          return updated ? { ...paper, owned: updated.owned } : paper;
        }));
      }
      
      else if (activeTab === 'font' && fonts.length > 0) {
        const updatedOwnership = await Promise.all(fonts.map(async (font) => {
          try {
            const detail = await getFontsDetail(font.id);
            return { id: font.id, owned: font.owned || detail.isOwned === true };
          } catch (err) {
            return { id: font.id, owned: font.owned };
          }
        }));
        
        setFonts(fonts.map(font => {
          const updated = updatedOwnership.find(item => item.id === font.id);
          return updated ? { ...font, owned: updated.owned } : font;
        }));
      }
    } catch (err) {
      console.error('소유 상태 동기화 오류:', err);
    }
  };

  // 탭 변경 시 소유 상태 일관성 확인
  useEffect(() => {
    ensureOwnershipConsistency();
  }, [activeTab]);

  const handleBuy = async (idx) => {
    const currentItems = getCurrentItems();
    const item = currentItems[idx];

    if (!item) return;
    
    // 이미 소유 중인지 다시 확인
    if (item.owned) {
      alert('이미 구매완료하였습니다.');
      return;
    }

    try {
      setLoading(true);

      switch (activeTab) {
        case 'paper':
          console.log(`종이 '${item.name}' 구매 시도 (ID: ${item.id}, 가격: ${item.price}P)`);
          try {
            // 구매 전에 상세 정보를 확인하여 이미 소유 중인지 확인
            const paperDetail = await getPapersDetail(item.id);
            if (paperDetail.isOwned) {
              alert('이미 구매완료하였습니다.');
              // 소유 상태 즉시 업데이트
              updateItemOwnedStatus('paper', item.id, true);
              await refreshCurrentTab(); // 전체 데이터 새로고침
              return;
            }
            
            // 실제 구매 시도
            await purchasePaper(item.id);
            
            // 구매 성공 시 UI 즉시 업데이트 및 데이터 새로고침
            updateItemOwnedStatus('paper', item.id, true);
            alert('구매가 완료되었습니다!');
            setModalIndex(null);
            
            // 데이터 새로고침
            await refreshCurrentTab();
          } catch (err) {
            console.error('종이 구매 오류:', err);
            // 이미 구매한 경우 처리
            if (err.response?.status === 400 && 
                (err.response?.data?.message?.includes('already') || 
                 err.response?.data?.errorCode === 'ALREADY_PURCHASED')) {
              alert('이미 구매완료하였습니다.');
              updateItemOwnedStatus('paper', item.id, true);
            } else {
              alert(`종이 구매에 실패했습니다: ${err.response?.data?.message || err.message}`);
            }
          }
          break;
          
        case 'font':
          console.log(`폰트 '${item.name}' 구매 시도 (ID: ${item.id}, 가격: ${item.price}P)`);
          try {
            // 구매 전에 상세 정보를 확인하여 이미 소유 중인지 확인
            const fontDetail = await getFontsDetail(item.id);
            if (fontDetail.isOwned) {
              alert('이미 구매완료하였습니다.');
              // 소유 상태 즉시 업데이트
              updateItemOwnedStatus('font', item.id, true);
              await refreshCurrentTab(); // 전체 데이터 새로고침
              return;
            }
            
            // 실제 구매 시도
            await purchaseFont(item.id);
            
            // 구매 성공 시 UI 즉시 업데이트 및 데이터 새로고침
            updateItemOwnedStatus('font', item.id, true);
            alert('구매가 완료되었습니다!');
            setModalIndex(null);
            
            // 데이터 새로고침
            await refreshCurrentTab();
          } catch (err) {
            console.error('폰트 구매 오류:', err);
            // 이미 구매한 경우 처리
            if (err.response?.status === 400 && 
                (err.response?.data?.message?.includes('already') || 
                 err.response?.data?.errorCode === 'ALREADY_PURCHASED')) {
              alert('이미 구매완료하였습니다.');
              updateItemOwnedStatus('font', item.id, true);
            } else {
              alert(`폰트 구매에 실패했습니다: ${err.response?.data?.message || err.message}`);
            }
          }
          break;
          
        case 'item':
          console.log(`아이템 '${item.name}' 구매 시도 (ID: ${item.id}, 가격: ${item.price}P)`);
          try {
            const itemResult = await purchaseItem(item.id);
            console.log('구매 API 응답:', itemResult);
            
            // 구매 성공 시 즉시 소유 상태 업데이트
            const updatedItemsList = [...items];
            updatedItemsList[idx] = {
              ...updatedItemsList[idx],
              owned: true
            };
            setItems(updatedItemsList);
            
            await new Promise(r => setTimeout(r, 300));
            const itemPointData = await getMyPoint();
            console.log(`구매 후 포인트 API 응답:`, itemPointData);
            console.log(`아이템 구매 후 포인트: ${itemPointData.point} (예상 포인트: ${userPoint - item.price}P)`);
            
            setUserPoint(itemPointData.point);
            await refreshShopData();
          } catch (err) {
            console.error('아이템 구매 중 오류:', err);
            if (err.response?.status === 400 && err.response?.data?.message?.includes('already')) {
              alert('이미 구매완료하였습니다.');
              
              // API 에러로 이미 구매완료된 경우에도 UI 상태 업데이트
              const updatedItemsList = [...items];
              updatedItemsList[idx] = {
                ...updatedItemsList[idx],
                owned: true
              };
              setItems(updatedItemsList);
              
              await refreshShopData();
            } else {
              alert(`아이템 구매에 실패했습니다: ${err.response?.data?.message || err.message}`);
            }
            throw err;
          }
          break;
        default:
          break;
      }

    } catch (error) {
      console.error('구매 실패:', error);
    } finally {
      setLoading(false);
      
      // 구매 시도 후 데이터 새로고침
      if (activeTab === 'paper') {
        await refreshShopDataPaper();
      } else if (activeTab === 'font') {
        await refreshShopDataFont();
      } else if (activeTab === 'item') {
        await refreshShopData();
      }

      // 항상 다시 확인하여 소유 상태 일관성 유지
      await ensureOwnershipConsistency();
    }
  };

  const refreshShopData = async () => {
    try {
      const updatedItems = await getItemList();
      const formattedItems = Array.isArray(updatedItems) ? updatedItems.map(item => ({
        id: item.id,
        name: item.name,
        desc: item.description,
        price: item.price,
        owned: item.isOwned === true
      })) : [];
      
      console.log('새로고침된 아이템:', formattedItems); // 로깅 추가
      setItems(formattedItems);
      
      // 포인트 갱신
      const pointRes = await getMyPoint();
      setUserPoint(pointRes.point);
    } catch (error) {
      console.error('아이템 정보 갱신 실패:', error);
    }
  };

  const refreshShopDataFont = async () => {
    try {
      const updatedFonts = await getFontsList();
      setFonts(Array.isArray(updatedFonts) ? updatedFonts.map(font => ({
        id: font.id,
        name: font.name,
        desc: font.description,
        price: font.price,
        owned: font.isOwned === true
      })) : []);
      
      // 포인트 갱신
      const pointRes = await getMyPoint();
      setUserPoint(pointRes.point);
      
      // 모달이 열려 있으면 열려 있는 폰트 정보 업데이트
      if (modalIndex !== null) {
        const updatedFont = updatedFonts.find(font => font.id === fonts[modalIndex]?.id);
        if (updatedFont) {
          const updatedFontsList = [...fonts];
          updatedFontsList[modalIndex] = {
            ...updatedFontsList[modalIndex],
            owned: updatedFont.isOwned || false
          };
          setFonts(updatedFontsList);
        }
      }
    } catch (error) {
      console.error('폰트 정보 갱신 실패:', error);
    }
  };

  const refreshShopDataPaper = async () => {
    try {
      const updatedPapers = await getPapersList();
      setPapers(Array.isArray(updatedPapers) ? updatedPapers.map(paper => ({
        id: paper.id,
        name: paper.name,
        desc: paper.description,
        price: paper.price,
        owned: paper.isOwned === true
      })) : []);
      
      // 포인트 갱신
      const pointRes = await getMyPoint();
      setUserPoint(pointRes.point);
      
      // 모달이 열려 있으면 열려 있는 종이 정보 업데이트
      if (modalIndex !== null) {
        const updatedPaper = updatedPapers.find(paper => paper.id === papers[modalIndex]?.id);
        if (updatedPaper) {
          const updatedPapersList = [...papers];
          updatedPapersList[modalIndex] = {
            ...updatedPapersList[modalIndex],
            owned: updatedPaper.isOwned || false
          };
          setPapers(updatedPapersList);
        }
      }
    } catch (error) {
      console.error('종이 정보 갱신 실패:', error);
    }
  };

  return (
    <PageContainer>
      <ItemBar userPoint={userPoint} />
      <ShopTab activeTab={activeTab} onTabChange={setActiveTab} />

      {loading && <LoadingMessage>로딩 중...</LoadingMessage>}

      {!loading && activeTab === 'item' && (
        <ItemList items={items} onCardClick={setModalIndex} />
      )}
      {!loading && activeTab === 'font' && (
        <FontList fonts={fonts} onCardClick={setModalIndex} />
      )}
      {!loading && activeTab === 'paper' && (
        <PaperList papers={papers} onCardClick={setModalIndex} />
      )}

      {modalIndex !== null && activeTab === 'item' && (
        <ShopModal
          items={items}
          currentIndex={modalIndex}
          setCurrentIndex={setModalIndex}
          onBuy={handleBuy}
          onClose={() => setModalIndex(null)}
          userPoint={userPoint}
          loading={loading}
        />
      )}
      {modalIndex !== null && activeTab === 'font' && (
        <FontModal
          fonts={fonts}
          currentIndex={modalIndex}
          setCurrentIndex={setModalIndex}
          onBuy={handleBuy}
          onClose={() => setModalIndex(null)}
          userPoint={userPoint}
          loading={loading}
        />
      )}
      {modalIndex !== null && activeTab === 'paper' && (
        <PaperModal
          papers={papers}
          currentIndex={modalIndex}
          setCurrentIndex={setModalIndex}
          onBuy={handleBuy}
          onClose={() => setModalIndex(null)}
          userPoint={userPoint}
          loading={loading}
        />
      )}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 360px;
  height: 800px;
  padding: 30px 20px 65px 20px;
  background: ${({ theme }) => theme.colors.ivory3};
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
  color: ${({ theme }) => theme.colors.brown2};
  font-family: ${({ theme }) => theme.fonts.c14M};
`;