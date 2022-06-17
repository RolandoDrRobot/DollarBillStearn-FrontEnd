import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { globalContext } from '../../hooks/appContext';
import Loading from '../../components/Loading/index';
import { useParams } from "react-router-dom";
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
        console.log(wallet);
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
      <div className="headline d-flex align-items-center justify-content-between mb-3">
        <h3 className="m-0"></h3>
      </div>
      {
        isLoading 
        ? <>
            <div className='mb-4'>
              <Loading />
            </div>
            <p className="info-text">
              { account ? 'We are loading your wallets' : 'Connect your wallet' }
            </p>
          </>
        : <>
            <div className="currency row">
              <div className="col-3 mb-1 d-flex align-items-center justify-content-center">
                <strong><label>COIN</label></strong>
              </div>
              <div className="col-3 p-1 mb-1 text-center">
                <strong><label>Total</label></strong>
              </div>
              <div className="col-3 p-1 text-center">
                <strong><label>In Order</label></strong>
              </div>
              <div className="col-3 p-1 text-center">
                <strong><label>Free</label></strong>
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
                    <p className="tourquese m-0">{item.balance.total.toFixed(2)}</p>
                    <p className="tourquese m-0">{item.usdBalance.total.toFixed(2)}</p>
                  </div>
                  <div className="col-3 p-1 text-center">
                    <p className="tourquese m-0">{item.balance.used.toFixed(2)}</p>
                    <p className="tourquese m-0">{item.usdBalance.total.toFixed(2)}</p>
                  </div>
                  <div className="col-3 p-1 text-center">
                    <p className="tourquese m-0">{item.balance.free.toFixed(2)}</p>
                    <p className="tourquese m-0">{item.usdBalance.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
        <p className="info-text">
          { account ? 'Here are your funds' : 'Connect your wallet' }
        </p>
      </>
      }
    </>
  )
}

export default Wallet;