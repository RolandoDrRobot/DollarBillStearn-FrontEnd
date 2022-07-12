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

import Vaults from './views/Vaults/index';
import ProfileRoom from './views/ProfileRoom/index';
import StatsRoom from './views/StatsRoom/index';
import TradingRoom from './views/TradingRoom/index';
import News from './views/News/index';
import Market from './views/Market/index';

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
                <Route path='/' element={<ProfileRoom/>} />
                <Route path='/vaults' element={<Vaults/>} />
                <Route path='/createVault' element={<CreateVault/>} />
                <Route path='/stats' element={<StatsRoom/>} />
                <Route path='/trading/:vaultID' element={<TradingRoom/>} />
                <Route path='/news/' element={<News/>} />
                <Route path='/market' element={<Market/>} />
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