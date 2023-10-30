import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import "../Styles/Main.sass"
import "../Styles/Reset.sass"
import "../Styles/Fonts.sass"
import "../Styles/variables.sass"
import Header from "../Components/Header/Header";


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