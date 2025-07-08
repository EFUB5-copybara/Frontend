import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./home/HomePage";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
