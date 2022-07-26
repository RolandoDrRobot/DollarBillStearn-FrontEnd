import React from 'react';
import { globalContext } from '../../hooks/appContext';
import Wallet from '../../components/Wallet/index';
import TradingBox from '../../components/TradingBox/index';
import Orders from '../../components/Orders/index';
import ConnectWallet from '../../components/ConnectWallet/index';
import './main.css';

function CoinsRoom() {

  const { isLogued, setIsLogued } = React.useContext(globalContext);

  return (
    <>
      <div className="view-container">
        {
          isLogued 
          ? <>
              <TradingBox />
              <Wallet />
              <Orders />
            </>
          : <ConnectWallet />
        }
      </div>
    </>
  )
}

export default CoinsRoom; 
