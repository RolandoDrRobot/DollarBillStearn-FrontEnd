import React from 'react';
import binanceIcon from '../../assets/img/coins/binanceIcon.png';
import ftxIcon from '../../assets/img/coins/ftxIcon.png';
import './main.css';

function VaultsRoom() {
  return (
    <>
      <div className="vault mt-3">
        <button className="main-button d-flex align-items-center justify-content-between">
          <div>
            <img src={binanceIcon} className="exchange-logo" alt="" />
            Binance Vault
          </div>
          <div>
            $200,000
          </div>
        </button>
        <button className="main-button d-flex align-items-center justify-content-between">
          <div>
            <img src={binanceIcon} className="exchange-logo" alt="" />
            Binance Vault
          </div>
          <div>
            $200,000
          </div>
        </button>
        <button className="main-button d-flex align-items-center justify-content-between">
          <div>
            <img src={ftxIcon} className="exchange-logo" alt="" />
            FTX Vault
          </div>
          <div>
            $50,000
          </div>
        </button>
        <button className="main-button d-flex align-items-center justify-content-between">
          <div>
            <img src={ftxIcon} className="exchange-logo" alt="" />
            FTX Vault
          </div>
          <div>
            $50,000
          </div>
        </button>
        <p className="info-text">
          Select a vault to manage
        </p>
      </div>
    </>
  )
}

export default VaultsRoom;
