import React from 'react';
import Loading from '../Loading/index';
import { useWeb3React } from '@web3-react/core';
import { globalContext } from '../../hooks/appContext';
import { injected } from '../../config/connector';
import { useAlert } from 'react-alert';
import mainIcon from '../../assets/img/mainIcon.png';
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
            <button className="main-button d-flex align-items-center justify-content-center m-0" onClick={connect}>
              <img src={metamaskIcon} alt="" />
              Connect your wallet
            </button>
          </div>
      }
    </>
  )
}

export default ConnectWallet;
