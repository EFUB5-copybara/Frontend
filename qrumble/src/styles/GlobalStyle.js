import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  body {
    font-family: 'Pretendard','Nunito', sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    background-color: #f8f8f8; 
  }

    #root {
    width: 360px;
    height: 800px;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.ivory3};
    border: 1px solid #ccc;
  }

`;

export default GlobalStyle;
