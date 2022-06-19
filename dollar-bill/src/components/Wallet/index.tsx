import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { globalContext } from '../../hooks/appContext';
import Loading from '../../components/Loading/index';
import { useParams } from "react-router-dom";
import vaultIcon from '../../assets/img/home.png';
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
  let [wallets, setWallets] = React.useState<any>([]);
  
  function setWalletsBalance() {
    for (const token in vaults[vaultID].balance) {
      if (vaults[vaultID].balance[token] && vaults[vaultID].usdBalance[token]) {
        const wallet:wallet = {
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
        wallets.push(wallet);
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
        ? <div className="h-100 d-flex align-items-center justify-content-center">
            <div>
              <div className='mb-4'>
                <Loading />
              </div>
              <p className="info-text">
                { account ? 'We are loading your wallets' : 'Connect your wallet' }
              </p>
            </div>
          </div>
        : <div className="wallet" id="walletAccordion">
            <button className="accordion-button main-button mb-3" type="button" data-bs-toggle="collapse" data-bs-target="#walletAccordionContent" aria-expanded="true" aria-controls="collapseWallet">
              <img src={vaultIcon} height="30" />{vaults[vaultID].name} - {vaults[vaultID].exchange}
            </button>

            <div id="walletAccordionContent" className="accordion-collapse collapse show" aria-labelledby="walletContent" data-bs-parent="#walletAccordion">
              <div className="currency row">
                <div className="col-3 mb-1 d-flex align-items-center justify-content-center">
                  <strong><label>COIN</label></strong>
                </div>
                <div className="col-3 p-1 mb-1 text-center">
                  <strong><label>Total</label></strong><br></br>
                  <strong><label className="info-text m-0">${vaults[vaultID].usdTotalBalance.total.toFixed(2)}</label></strong>
                </div>
                <div className="col-3 p-1 text-center">
                  <strong><label>In Order</label></strong><br></br>
                  <strong><label className="info-text m-0">${vaults[vaultID].usdTotalBalance.used.toFixed(2)}</label></strong>
                </div>
                <div className="col-3 p-1 text-center">
                  <strong><label>Free</label></strong><br></br>
                  <strong><label className="info-text m-0">${vaults[vaultID].usdTotalBalance.free.toFixed(2)}</label></strong>
                </div>
              </div>
              {
                wallets.map(function(item:any, i:any) {
                  return (
                    <div className="mt-2" key={i}>
                      <div className="currency row">
                        <div className="col-3 mb-1 d-flex align-items-center justify-content-center">
                          {item.tokenName}
                        </div>
                        <div className="col-3 p-1 mb-1 text-center">
                          <p className="m-0">{item.balance.total.toFixed(2)}</p>
                          <p className="info-text m-0">${item.usdBalance.total.toFixed(2)}</p>
                        </div>
                        <div className="col-3 p-1 text-center">
                          <p className="m-0">{item.balance.used.toFixed(2)}</p>
                          <p className="info-text m-0">${item.usdBalance.total.toFixed(2)}</p>
                        </div>
                        <div className="col-3 p-1 text-center">
                          <p className="m-0">{item.balance.free.toFixed(2)}</p>
                          <p className="info-text m-0">${item.usdBalance.total.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              <p className="info-text">
                { account ? 'Here are your funds' : 'Connect your wallet' }
              </p>
            </div>
          </div>
      }
    </>
  )
}

export default Wallet;