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
  const handleBuy = (idx) => {
    switch (activeTab) {
      case 'item':
        setItems(
          items.map((item, i) => (i === idx ? { ...item, owned: true } : item))
        );
        break;
      case 'font':
        setFonts(
          fonts.map((font, i) => (i === idx ? { ...font, owned: true } : font))
        );
        break;
      case 'paper':
        setPapers(
          papers.map((paper, i) =>
            i === idx ? { ...paper, owned: true } : paper
          )
        );
        break;
      default:
        break;
    }
  };

  return (
    <PageContainer>
      <ItemBar userPoint={userPoint} />
      <ShopTab activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'item' && (
        <ItemList items={items} onCardClick={setModalIndex} />
      )}
      {activeTab === 'font' && (
        <FontList fonts={fonts} onCardClick={setModalIndex} />
      )}
      {activeTab === 'paper' && (
        <PaperList papers={papers} onCardClick={setModalIndex} />
      )}

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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 360px;
  height: 800px;
  padding: 30px 20px 65px 20px;
  background: ${({ theme }) => theme.colors.ivory3};
`;
