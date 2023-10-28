import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import "../Styles/Main.sass"
import "../Styles/Reset.sass"
import "../Styles/Fonts.sass"
import "../Styles/variables.sass"
import LoginPage from "../pages/LoginPage/LoginPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
