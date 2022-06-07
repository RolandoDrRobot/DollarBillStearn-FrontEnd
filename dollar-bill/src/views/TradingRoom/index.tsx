import React from 'react';
import Wallet from '../../components/Wallet/index';
import './main.css';

interface nftMetaData {
  name: any,
  image: any,
  tokenId: any
}

function TradingRoom() {
  return (
    <>
      <div className="view-container">
        <Wallet/>
      </div>
    </>
  )
}

export default TradingRoom;
