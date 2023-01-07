import React from 'react';
import Loading from '../Loading/index';
import { useWeb3React } from '@web3-react/core';
import { globalContext } from '../../hooks/appContext';
import { injected } from '../../config/connector';
import mainIcon from '../../assets/img/profile.png';
import metamaskIcon from '../../assets/img/metamask.png';

import './main.css';

function ConnectWallet() {

  let [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { active, activate, deactivate } = useWeb3React();
  const { isLogued, setIsLogued } = React.useContext(globalContext);

  async function connect() {
    setIsLoading(true);
    try {
      await activate(injected);
      localStorage.setItem('isWalletConnected', 'true');
      setIsLogued(true);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }

  return (
    <>{
      isLoading === true 
        ? <Loading /> 
        : <div className="connect-wallet">
            <img className="main-icon" src={mainIcon} alt='' />
            <div className="section-title title-style-two text-center mb-3">
              <span>Ultimate performance tracker</span>
              <h2>Dollar Bill <span>Capital</span></h2>
            </div>
            <button className="main-button d-flex align-items-center justify-content-center m-0 mt-3" onClick={connect}>
              <img src={metamaskIcon} height="30" alt="" />
              Connect your wallet
            </button>
          </div>
      }
    </>
  )
}

export default ConnectWallet;
