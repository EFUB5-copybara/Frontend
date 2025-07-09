import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Pretendard-Regular';
        src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
    }

    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

  body {
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
    background-color: white;
    border: 1px solid #ccc;
  }
`;

export default GlobalStyle;
