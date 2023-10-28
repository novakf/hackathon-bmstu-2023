import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import "../Styles/Main.sass"
import "../Styles/Reset.sass"
import "../Styles/Fonts.sass"
import "../Styles/variables.sass"
import LoginPage from "../pages/LoginPage/LoginPage";
import Header from "../Components/Header/Header";
import {Provider} from "react-redux";
import store from "../store/store";


const App: React.FC = () => {
  return (

      <Provider store={store}>

      <BrowserRouter>

              <div className="wrapper">

                  <Header />

                  <div className="content-wrapper">

                      <Routes>
                          <Route path="/" element={<MainPage />} />
                          <Route path="/login" element={<LoginPage />} />
                      </Routes>

                  </div>

              </div>
        </BrowserRouter>
      </Provider>
  );
};

export default App;
