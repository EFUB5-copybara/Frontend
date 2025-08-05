import { useState } from 'react';
import styled from 'styled-components';
import ItemBar from '../components/ItemBar';
import ShopTab from '../components/ShopTab';
import ItemList from '../components/ItemList';
import FontList from '../components/FontList';
import PaperList from '../components/PaperList';
import ShopModal from '../components/ShopModal';
import background1 from '../assets/background1.svg';
import background2 from '../assets/background2.svg';
import background3 from '../assets/background3.svg';

const initialItems = [
  {
    id: 1,
    name: '열쇠',
    desc: '사용 시 다른 사람들의 답변을 볼 수 있는 아이템',
    price: 200,
    owned: false,
  },
  {
    id: 2,
    name: '방패',
    desc: '연속일수가 깨지지 않도록 방어해주는 아이템',
    price: 300,
    owned: false,
  },
  {
    id: 3,
    name: '지우개',
    desc: '이미 작성한 답변을 새로 쓸 수 있는 아이템',
    price: 100,
    owned: false,
  },
];

const initialFonts = [
  {
    id: 1,
    name: 'Como',
    desc: '모던하고 심플한 스타일의 폰트',
    price: 100,
    owned: false,
  },
  {
    id: 2,
    name: 'MuseoModerno',
    desc: '세련된 모던함이 돋보이는 폰트',
    price: 100,
    owned: false,
  },
  {
    id: 3,
    name: 'The Seasons',
    desc: '자연스러운 필기체 스타일 폰트',
    price: 100,
    owned: false,
  },
  {
    id: 4,
    name: 'Tangier',
    desc: '개성있는 프리미엄 디자인 폰트',
    price: 100,
    owned: true,
  },
];

const initialPapers = [
  {
    id: 1,
    name: '작은 새싹',
    desc: '귀여운 새싹들이 그려져 있는 빈티지 종이',
    price: 100,
    owned: false,
    img: background1,
  },
  {
    id: 2,
    name: '바다의 종이',
    desc: '시원한 바다가 돋보이는 종이',
    price: 100,
    owned: false,
    img: background2,
  },
  {
    id: 3,
    name: '복숭아 향기',
    desc: '잘 익은 복숭아의 분홍색이 들어있는 종이',
    price: 100,
    owned: true,
    img: background3,
  },
];

const userPoint = 120;

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState('item');
  const [modalIndex, setModalIndex] = useState(null);
  const [items, setItems] = useState(initialItems);
  const [fonts, setFonts] = useState(initialFonts);
  const [papers, setPapers] = useState(initialPapers);

  // 현재 탭에 맞는 아이템 목록 반환
  const getCurrentItems = () => {
    switch (activeTab) {
      case 'item':
        return items;
      case 'font':
        return fonts;
      case 'paper':
        return papers;
      default:
        return [];
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
      <ItemBar />
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
