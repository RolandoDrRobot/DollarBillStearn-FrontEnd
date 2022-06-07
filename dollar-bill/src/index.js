import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalContextProvider } from './hooks/appContext';
import { Provider as AlertProvider } from 'react-alert';
import alertOptions from './utils/alertOptions';
import AlertTemplate from 'react-alert-template-basic';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';

import ConnectOnPageLoad from './components/ConnectPageOnLoad/index';
import Header from './components/Header/index';
import Navbar from './components/Navbar/index';
import CreateVault from './components/CreateVault/index'

import Home from './views/Home/index';
import SettingsRoom from './views/SettingsRoom/index';
import StatsRoom from './views/StatsRoom/index';
import TradingRoom from './views/TradingRoom/index';

import './index.css';

function getLibrary(provider) {
  return new Web3(provider)
}

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <GlobalContextProvider>
          <Router>
            <ConnectOnPageLoad />
            <Header/>
            <div id="content">
              <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/settings' element={<SettingsRoom/>} />
                <Route path='/stats' element={<StatsRoom/>} />
                <Route path='/trading:vault' element={<TradingRoom/>} />
                <Route path='/createVault' element={<CreateVault/>} />
              </Routes>
            </div>
            <Navbar/>
          </Router>
        </GlobalContextProvider>
      </Web3ReactProvider>
    </AlertProvider>  
  </React.StrictMode>,
  document.getElementById('root')
);