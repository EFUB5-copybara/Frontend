import styled from 'styled-components';

const TAB_LIST = [
  { key: 'item', label: '아이템' },
  { key: 'font', label: '폰트' },
  { key: 'paper', label: '종이' },
];

const TAB_WIDTH = 107;

export default function ShopTab({ activeTab, onTabChange }) {
  const tabIndex = Math.max(0, TAB_LIST.findIndex(tab => tab.key === activeTab));

  return (
    <TabWrapper>
      <TabRow>
        {TAB_LIST.map(tab => (
          <TabButton
            key={tab.key}
            $active={activeTab === tab.key}
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabRow>
      <TabLine>
        <Underline style={{ left: `${tabIndex * TAB_WIDTH}px` }} />
      </TabLine>
    </TabWrapper>
  );
}

const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 322px;
  margin: 19px auto 19px auto;
`;

const TabRow = styled.div`
  display: flex;
  align-items: center;
  width: 322px;
  gap: 0;
`;

const TabButton = styled.button`
  ${({ theme }) => theme.fonts.sub16SB};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.brown2};
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  height: 26px;
  width: 107px;
  min-width: 107px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`;

const TabLine = styled.div`
  width: 320px;
  height: 1px;
  background: ${({ theme }) => theme.colors.brown3};
  margin-top: 3px;
  position: relative;
`;

const Underline = styled.span`
  position: absolute;
  top: 0;
  width: 107px;
  height: 3px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 2px;
  transition: left 0.2s;
`;