import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import "../styles/Main.sass"
import "../styles/Reset.sass"
import "../styles/Fonts.sass"
import "../styles/variables.sass"
import Header from "../components/Header/Header";


const App: React.FC = () => {
  return (

      <BrowserRouter>

              <div className="wrapper">

                  <Header />

                  <div className="content-wrapper">

                      <Routes>
                          <Route path="/" element={<MainPage />} />
                      </Routes>

                  </div>

              </div>

        </BrowserRouter>
  );
};

export default App;
