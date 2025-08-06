import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  getItemList, getFontsList, getPapersList,
  purchaseItem, purchaseFont, purchasePaper,
  getMyPoint
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
          console.log('아이템 목록:', res);
          const formattedItems = Array.isArray(res) ? res.map(item => ({
            id: item.id,
            name: item.name,
            desc: item.description,
            price: item.price,
            owned: item.isOwned || false
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
            owned: font.isOwned || false
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
            owned: paper.isOwned || false
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

  // 구매 처리 함수
  const handleBuy = async (idx) => {
    const currentItems = getCurrentItems();
    const item = currentItems[idx];
    
    if (!item || item.owned) return;
    
    try {
      setLoading(true);
      
      let response;
      switch (activeTab) {
        case 'item':
          response = await purchaseItem(item.id);
          if (response) {
            setItems(prevItems => 
              prevItems.map((prevItem, i) => 
                i === idx ? { ...prevItem, owned: true } : prevItem
              )
            );
          }
          break;
        case 'font':
          response = await purchaseFont(item.id);
          if (response) {
            setFonts(prevFonts => 
              prevFonts.map((prevFont, i) => 
                i === idx ? { ...prevFont, owned: true } : prevFont
              )
            );
          }
          break;
        case 'paper':
          response = await purchasePaper(item.id);
          if (response) {
            setPapers(prevPapers => 
              prevPapers.map((prevPaper, i) => 
                i === idx ? { ...prevPaper, owned: true } : prevPaper
              )
            );
          }
          break;
        default:
          break;
      }
      
      // 포인트 업데이트 로직 (API에서 제공한다면)
      if (response && response.point !== undefined) {
        setUserPoint(response.point);
      }
    } catch (error) {
      console.error('구매 실패:', error);
      alert('구매에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
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
