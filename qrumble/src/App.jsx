import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Logo from './assets/svgs/logo.svg?react';
import router from './router';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashClick = () => {
    setShowSplash(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        {showSplash ? (
          <LogoImg onClick={handleSplashClick} />
        ) : (
          <RouterProvider router={router} />
        )}
      </>
    </ThemeProvider>
  );
}

const LogoImg = styled(Logo)`
  margin: 13.75rem 6.6875rem;
  width: 146px;
  height: 179px;
  cursor: pointer;
`;
export default App;
