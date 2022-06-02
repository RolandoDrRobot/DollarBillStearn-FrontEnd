import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalContextProvider } from './hooks/appContext';
import { Provider as AlertProvider } from 'react-alert';
import alertOptions from './utils/alertOptions';
import AlertTemplate from 'react-alert-template-basic';



import Header from './components/Header/index';
import Navbar from './components/Navbar/index';
import Home from './views/Home/index';
import SettingsRoom from './views/SettingsRoom/index';
import StatsRoom from './views/StatsRoom/index';
import TradingRoom from './views/TradingRoom/index';

import './index.css';


ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
        <GlobalContextProvider>
          <Router>
            <Header/>
            <div id="content">
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/settings' element={<SettingsRoom/>}/>
                <Route path='/stats' element={<StatsRoom/>}/>
                <Route path='/trading' element={<TradingRoom/>}/>
              </Routes>
            </div>
            <Navbar/>
          </Router>
        </GlobalContextProvider>
    </AlertProvider>  
  </React.StrictMode>,
  document.getElementById('root')
);