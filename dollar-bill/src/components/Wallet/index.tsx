import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { globalContext } from '../../hooks/appContext';
import Loading from '../../components/Loading/index';
import { useParams } from "react-router-dom";
import vaultIcon from '../../assets/img/vault.png';
import binanceIcon from '../../assets/img/coins/binanceIcon.png';
import ftxIcon from '../../assets/img/coins/ftxIcon.png';
import './main.css';

interface wallet {
  tokenName:string,
  balance: {
    free: number,
    used: number,
    total: number
  }
  usdBalance: {
    free: number,
    used: number,
    total: number
  }
}

function Wallet() {

  const { vaultID }:any = useParams();
  const { account } = useWeb3React();
  const { vaults } = React.useContext(globalContext);
  let [isLoading, setIsLoading] = React.useState<boolean>(true);
  let [wallet, setWallet] = React.useState<any>([]);
  
  function setWalletsBalance() {
    for (const token in vaults[vaultID].balance) {
      if (vaults[vaultID].balance[token] && vaults[vaultID].usdBalance[token]) {
        const tokenInstance:wallet = {
          tokenName: token,
          balance: {
            free: vaults[vaultID].balance[token].free,
            used:  vaults[vaultID].balance[token].used,
            total:  vaults[vaultID].balance[token].total
          },
          usdBalance: {
            free: vaults[vaultID].usdBalance[token].free,
            used:  vaults[vaultID].usdBalance[token].used,
            total:  vaults[vaultID].usdBalance[token].total
          }
        }
        if(tokenInstance.usdBalance.total > 1) wallet.push(tokenInstance);
      }
    }
  }

  React.useEffect(() => {
    setIsLoading(true);
    if (vaults.length && account) {
      setWalletsBalance();
      setIsLoading(false);
    }
  }, [vaults, account]);

  return (
    <>
      {
        isLoading 
        ? <div className="d-flex align-items-center justify-content-center">
            <div>
              <div className='mb-4'>
                <Loading />
              </div>
              <p className="info-text mb-5">
                { account ? 'We are loading your wallets' : 'Connect your wallet' }
              </p>
            </div>
          </div>
        : <div className="wallet mb-3" id="walletAccordion">
            <button className="accordion-button main-button" type="button" data-bs-toggle="collapse" data-bs-target="#walletAccordionContent" aria-expanded="true" aria-controls="collapseWallet">
              <img src={vaultIcon} height="30" />{vaults[vaultID].name} - {vaults[vaultID].exchange}
            </button>

            <div id="walletAccordionContent" className="accordion-collapse collapse show wallet-content" aria-labelledby="walletContent" data-bs-parent="#walletAccordion">
              

              <div className="currency d-flex align-items-center justify-content-center py-2">
                <div className="box d-flex align-items-center justify-content-center">
                <img src={
                    vaults[vaultID].exchange === 'binance' ? binanceIcon
                    : vaults[vaultID].exchange === 'ftx' ? ftxIcon
                    : ''
                  }
                  className="exchange-logo" 
                  alt="" 
                />
                </div>
                <div className="box p-1 text-center">
                  <strong><label>Total</label></strong><br></br>
                  <strong><label className="info-text m-0">${vaults[vaultID].usdTotalBalance.total.toFixed(2)}</label></strong>
                </div>
                <div className="box p-1 text-center">
                  <strong><label>In Order</label></strong><br></br>
                  <strong><label className="info-text m-0">${vaults[vaultID].usdTotalBalance.used.toFixed(2)}</label></strong>
                </div>
                <div className="box p-1 text-center">
                  <strong><label>Free</label></strong><br></br>
                  <strong><label className="info-text m-0">${vaults[vaultID].usdTotalBalance.free.toFixed(2)}</label></strong>
                </div>
              </div>
              {
                wallet.map(function(item:any, i:any) {
                  return (
                    <div key={i} className="currency d-flex align-items-center justify-content-center py-2">
                      <div className="box d-flex align-items-center justify-content-center">
                        <strong>{item.tokenName}</strong>
                      </div>
                      <div className="box p-1 text-center">
                        <strong><p className="m-0">{item.balance.total.toFixed(2)}</p></strong>
                        <p className="info-text m-0">${item.usdBalance.total.toFixed(2)}</p>
                      </div>
                      <div className="box p-1 text-center">
                        <strong><p className="m-0">{item.balance.used.toFixed(2)}</p></strong>
                        <p className="info-text m-0">${item.usdBalance.total.toFixed(2)}</p>
                      </div>
                      <div className="box p-1 text-center">
                        <strong><p className="m-0">{item.balance.free.toFixed(2)}</p></strong>
                        <p className="info-text m-0">${item.usdBalance.total.toFixed(2)}</p>
                      </div>
                    </div>
                  )
                })
              }
              <p className="info-text mb-5">
                { account ? 'Here are your funds' : 'Connect your wallet' }
              </p>

              
            </div>
          </div>
      }
    </>
  )
}

export default Wallet;