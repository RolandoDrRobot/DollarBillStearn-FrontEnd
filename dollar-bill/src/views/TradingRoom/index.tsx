import React from 'react';
import Wallet from '../../components/Wallet/index';
import TradingBox from '../../components/TradingBox/index';
import './main.css';

function TradingRoom() {
  return (
    <>
      <div className="view-container">
        <Wallet />
        <TradingBox />
      </div>
    </>
  )
}

export default TradingRoom;
