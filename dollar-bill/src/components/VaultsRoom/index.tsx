import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { globalContext } from '../../hooks/appContext';
import binanceIcon from '../../assets/img/coins/binanceIcon.png';
import ftxIcon from '../../assets/img/coins/ftxIcon.png';
import './main.css';


function VaultsRoom() {

  const { account } = useWeb3React();

  const { 
    vaults
   } = React.useContext(globalContext);

  return (
    <>
      <div className="vault mt-3">
        {
          vaults ? vaults.map(function(item:any, i:any) {
            return (
              <Link to={`/trading/${item.id}`} key={i} className="main-button d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <img 
                    src={
                      item.exchange === 'binance' ? binanceIcon
                      : item.exchange === 'ftx' ? ftxIcon
                      : '' } 
                    className="exchange-logo" 
                    alt="" 
                  />
                  Vault: {item.name}
                </div>
                <div>
                  {item.exchange}
                </div>
              </Link>
            )
          }) : <></> 
        }
        
        <p className="info-text">
          { account ? 'Select a vault to manage' : 'Connect wallet' }
        </p>
      </div>
    </>
  )
}

export default VaultsRoom;
