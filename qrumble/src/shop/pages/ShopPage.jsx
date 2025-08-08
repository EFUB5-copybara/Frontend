import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axiosInstance from '@/api/axiosInstance';
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
          const formattedFonts = Array.isArray(res) ? res.map(font => {
            // 로컬 저장소에서 소유 상태 확인
            const ownedFonts = JSON.parse(localStorage.getItem('ownedFonts') || '{}');
            const locallyOwned = !!ownedFonts[font.id];
            
            return {
              id: font.id,
              name: font.name,
              desc: font.description,
              price: font.price,
              owned: font.isOwned === true || locallyOwned
            };
          }) : [];
          setFonts(formattedFonts);
        })
        .catch(error => console.error('폰트 로딩 실패:', error))
        .finally(() => setLoading(false));
    } else if (activeTab === 'paper') {
      getPapersList()
        .then(res => {
          const formattedPapers = Array.isArray(res) ? res.map(paper => {
            // 로컬 저장소에서 소유 상태 확인
            const ownedPapers = JSON.parse(localStorage.getItem('ownedPapers') || '{}');
            const locallyOwned = !!ownedPapers[paper.id];
            
            return {
              id: paper.id,
              name: paper.name,
              desc: paper.description,
              price: paper.price,
              owned: paper.isOwned === true || locallyOwned
            };
          }) : [];
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

  const refreshCurrentTab = async () => {
    setLoading(true);
    try {
      const pointRes = await getMyPoint();
      setUserPoint(pointRes.point);

      if (activeTab === 'item') {
        const updatedItems = await getItemList();
        const formattedItems = Array.isArray(updatedItems) 
          ? updatedItems.map(item => ({
              id: item.id,
              name: item.name,
              desc: item.description,
              price: item.price,
              owned: item.isOwned === true
            }))
          : [];
        
        const mergedItems = formattedItems.map(newItem => {
          const oldItem = items.find(i => i.id === newItem.id);
          return {
            ...newItem,
            owned: newItem.owned || (oldItem?.owned === true)
          };
        });
        
        setItems(mergedItems);
      } else if (activeTab === 'font') {
        const updatedFonts = await getFontsList();
        const formattedFonts = Array.isArray(updatedFonts) 
          ? updatedFonts.map(font => ({
              id: font.id,
              name: font.name,
              desc: font.description,
              price: font.price,
              owned: font.isOwned === true
            }))
          : [];
        
        const mergedFonts = formattedFonts.map(newFont => {
          const oldFont = fonts.find(f => f.id === newFont.id);
          return {
            ...newFont,
            owned: newFont.owned || (oldFont?.owned === true)
          };
        });
        
        setFonts(mergedFonts);
      } else if (activeTab === 'paper') {
        const updatedPapers = await getPapersList();
        const formattedPapers = Array.isArray(updatedPapers) 
          ? updatedPapers.map(paper => ({
              id: paper.id,
              name: paper.name,
              desc: paper.description,
              price: paper.price,
              owned: paper.isOwned === true
            }))
          : [];
        const mergedPapers = formattedPapers.map(newPaper => {
          const oldPaper = papers.find(p => p.id === newPaper.id);
          return {
            ...newPaper,
            owned: newPaper.owned || (oldPaper?.owned === true)
          };
        });
        
        setPapers(mergedPapers);
      }
    } catch (error) {
      console.error('데이터 새로고침 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const ensureOwnershipConsistency = async () => {
    try {
      if (activeTab === 'paper' && papers.length > 0) {
        const updatedOwnership = await Promise.all(papers.map(async (paper) => {
          try {
            const detail = await getPapersDetail(paper.id);
            return { id: paper.id, owned: paper.owned || detail.isOwned === true };
          } catch (err) {
            return { id: paper.id, owned: paper.owned };
          }
        }));
        
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
        case 'font':
          const apiFunction = activeTab === 'paper' ? purchasePaper : purchaseFont;
          const detailFunction = activeTab === 'paper' ? getPapersDetail : getFontsDetail;
          const itemType = activeTab === 'paper' ? '종이' : '폰트';
          
          console.log(`${itemType} '${item.name}' 구매 시도 (ID: ${item.id}, 가격: ${item.price}P)`);
          
          try {
            const itemDetail = await detailFunction(item.id);
            console.log(`${itemType} 상세 정보:`, itemDetail);
            
            if (itemDetail.isOwned) {
              alert('이미 구매완료하였습니다.');
              updateItemOwnedStatus(activeTab, item.id, true);
              await refreshCurrentTab();
              return;
            }
            
            const result = await apiFunction(item.id);
            console.log(`${itemType} 구매 결과:`, result);
            
            // 로컬 저장소에 소유 상태 저장
            if (activeTab === 'font') {
              const ownedFonts = JSON.parse(localStorage.getItem('ownedFonts') || '{}');
              ownedFonts[item.id] = true;
              localStorage.setItem('ownedFonts', JSON.stringify(ownedFonts));
            } else {
              const ownedPapers = JSON.parse(localStorage.getItem('ownedPapers') || '{}');
              ownedPapers[item.id] = true;
              localStorage.setItem('ownedPapers', JSON.stringify(ownedPapers));
            }
            
            if (result.alreadyOwned || result.forceOwned) {
              if (activeTab === 'paper') {
                setPapers(prev => prev.map(p => 
                  p.id === item.id ? { ...p, owned: true } : p
                ));
              } else { // font
                setFonts(prev => prev.map(f => 
                  f.id === item.id ? { ...f, owned: true } : f
                ));
              }
              
              if (result.alreadyOwned) {
                alert('이미 구매완료하였습니다.');
              } else {
                alert('구매가 완료되었습니다!');
              }
            }
            
            const pointRes = await getMyPoint();
            setUserPoint(pointRes.point);
            
            setModalIndex(null);
            
            await refreshCurrentTab();
          } catch (err) {
            console.error(`${itemType} 구매 오류:`, err);
            
            if (err.response) {
              console.error('서버 응답:', err.response.status, err.response.data);
              
              if (err.response.status === 400 && 
                  (err.response.data.errorCode === 'ALREADY_PURCHASED' || 
                  err.response.data.message?.includes('이미 구매'))) {
                alert('이미 구매완료하였습니다.');
                
                updateItemOwnedStatus(activeTab, item.id, true);
                
                setModalIndex(null);
                
                await refreshCurrentTab();
                return;
              }
            }
            
            if (err.response?.status === 401) {
              alert('로그인 후 이용해 주세요.');
            } else if (err.response?.status === 404) {
              alert('존재하지 않는 상품입니다.');
            } else {
              alert(`${itemType} 구매에 실패했습니다: ${err.response?.data?.message || err.message}`);
            }
          }
          break;
          
        case 'item':
          console.log(`아이템 '${item.name}' 구매 시도 (ID: ${item.id}, 가격: ${item.price}P)`);
          try {
            const itemResult = await purchaseItem(item.id);
            console.log('구매 API 응답:', itemResult);
            
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
      
      await ensureOwnershipConsistency();
    }
  };

  const forceCheckOwnership = async () => {
    if (modalIndex === null) return;

    const currentItems = getCurrentItems();
    const item = currentItems[modalIndex];

    if (!item) return;

    try {
      setLoading(true);
      
      if (activeTab === 'paper') {
        try {
          await purchasePaper(item.id);
          updateItemOwnedStatus('paper', item.id, true);
          alert('구매가 완료되었습니다!');
          await refreshCurrentTab();
          setModalIndex(null);
        } catch (err) {
          console.log('구매 시도 결과:', err);
          if (err.response?.status === 400 && 
              (err.response?.data?.message?.includes('already') || 
               err.response?.data?.errorCode === 'ALREADY_PURCHASED')) {
            updateItemOwnedStatus('paper', item.id, true);
            await refreshCurrentTab();
          } else {
            alert(`오류가 발생했습니다: ${err.response?.data?.message || err.message}`);
          }
        }
      } else if (activeTab === 'font') {
        try {
          await purchaseFont(item.id);
          updateItemOwnedStatus('font', item.id, true);
          alert('구매가 완료되었습니다!');
          await refreshCurrentTab();
          setModalIndex(null);
        } catch (err) {
          console.log('구매 시도 결과:', err);
          if (err.response?.status === 400 && 
              (err.response?.data?.message?.includes('already') || 
               err.response?.data?.errorCode === 'ALREADY_PURCHASED')) {
            updateItemOwnedStatus('font', item.id, true);
            await refreshCurrentTab();
          } else {
            alert(`오류가 발생했습니다: ${err.response?.data?.message || err.message}`);
          }
        }
      }
    } catch (e) {
      console.error('소유 상태 강제 확인 실패:', e);
    } finally {
      setLoading(false);
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
      
      setItems(formattedItems);
      
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
      
      const pointRes = await getMyPoint();
      setUserPoint(pointRes.point);
      
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
      
      const pointRes = await getMyPoint();
      setUserPoint(pointRes.point);
      
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
          updateOwnership={(tab, id, owned) => updateItemOwnedStatus(tab, id, owned)}
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
          updateOwnership={(tab, id, owned) => updateItemOwnedStatus(tab, id, owned)}
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
          updateOwnership={(tab, id, owned) => updateItemOwnedStatus(tab, id, owned)}
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