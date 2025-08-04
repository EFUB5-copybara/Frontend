import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  fetchItems, fetchFonts, fetchPapers,
  purchaseItem, purchaseFont, purchasePaper
} from '../api/shopApi';
import ItemBar from '../components/ItemBar';
import ShopTab from '../components/ShopTab';
import ItemList from '../components/ItemList';
import FontList from '../components/FontList';
import PaperList from '../components/PaperList';
import ShopModal from '../components/ShopModal';

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState('item');
  const [modalIndex, setModalIndex] = useState(null);
  const [items, setItems] = useState([]);
  const [fonts, setFonts] = useState([]);
  const [papers, setPapers] = useState([]);
  const [userPoint, setUserPoint] = useState(0);

  // 목록 불러오기
  useEffect(() => {
    if (activeTab === 'item') {
      fetchItems().then(res => {
        setItems(Array.isArray(res) ? res : []);
      });
    } else if (activeTab === 'font') {
      fetchFonts().then(res => {
        setFonts(Array.isArray(res) ? res : []);
      });
    } else if (activeTab === 'paper') {
      fetchPapers().then(res => {
        setPapers(Array.isArray(res) ? res : []);
      });
    }
  }, [activeTab]);

  // 현재 탭에 맞는 아이템 목록 반환
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
    try {
      if (activeTab === 'item') {
        const item = items[idx];
        await purchaseItem(item.id);
        setItems(items.map((it, i) => i === idx ? { ...it, owned: true } : it));
      } else if (activeTab === 'font') {
        const font = fonts[idx];
        await purchaseFont(font.id);
        setFonts(fonts.map((ft, i) => i === idx ? { ...ft, owned: true } : ft));
      } else if (activeTab === 'paper') {
        const paper = papers[idx];
        await purchasePaper(paper.id);
        setPapers(papers.map((pa, i) => i === idx ? { ...pa, owned: true } : pa));
      }
      // 구매 후 포인트 재조회
      if (activeTab === 'item') {
        fetchItems().then(res => setUserPoint(res.data.point ?? 0));
      } else if (activeTab === 'font') {
        fetchFonts().then(res => setUserPoint(res.data.point ?? 0));
      } else if (activeTab === 'paper') {
        fetchPapers().then(res => setUserPoint(res.data.point ?? 0));
      }
    } catch (e) {
      alert('구매에 실패했습니다.');
    }
  };

  return (
    <PageContainer>
      <ItemBar userPoint={userPoint} />
      <ShopTab activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'item' && <ItemList items={items} onCardClick={setModalIndex} />}
      {activeTab === 'font' && <FontList fonts={fonts} onCardClick={setModalIndex} />}
      {activeTab === 'paper' && <PaperList papers={papers} onCardClick={setModalIndex} />}
      {modalIndex !== null && (
        <ShopModal
          items={getCurrentItems()}
          currentIndex={modalIndex}
          setCurrentIndex={setModalIndex}
          onBuy={handleBuy}
          onClose={() => setModalIndex(null)}
          userPoint={userPoint}
        />
      )}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  position: relative;
  width: 360px;
  min-height: 100vh;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.ivory3};
`;