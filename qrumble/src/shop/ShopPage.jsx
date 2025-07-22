import { useState } from 'react';
import styled from 'styled-components';
import ItemBar from './components/ItemBar';
import ShopTab from './components/ShopTab';
//import ItemList from './components/ItemList';
//import FontList from './components/FontList';
//import PaperList from './components/PaperList';
//import ShopCard from './components/ShopItemCard';
import Underbar from '@/components/UnderBar';
import { useNavigate } from 'react-router-dom';


export default function ShopPage() {
  const [activeTab, setActiveTab] = useState('item');
  const navigate = useNavigate();

  return (
    <PageContainer>
      <ItemBar />
      <ShopTab activeTab={activeTab} onTabChange={setActiveTab} />
      <Underbar current="shop" onTabClick={(tab) => {
        if (tab === 'shop') {
          setActiveTab('item');
          navigate('/shop');
        } else {
          navigate(`/${tab}`);
        }
      }} />
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