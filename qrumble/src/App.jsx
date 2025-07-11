import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import HomePage from "./home/HomePage";
import WritePage from "./home/WritePage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <WritePage />
      </>
    </ThemeProvider>
  );
}

export default App;
