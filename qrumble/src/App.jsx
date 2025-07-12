import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import HomePage from "./home/HomePage";
import WritePage from "./home/WritePage";
import FortuneCookiePage from "./home/FortuneCookiePage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <FortuneCookiePage />
      </>
    </ThemeProvider>
  );
}

export default App;
