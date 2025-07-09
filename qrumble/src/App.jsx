import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import HomePage from "./home/HomePage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <HomePage />
      </>
    </ThemeProvider>
  );
}

export default App;
