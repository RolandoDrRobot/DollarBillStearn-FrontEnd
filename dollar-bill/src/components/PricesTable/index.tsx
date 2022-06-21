import React from 'react';
import Loading from '../../components/Loading/index';
import { globalContext } from '../../hooks/appContext';
import { useWeb3React } from '@web3-react/core';
import marketIcon from '../../assets/img/marketIcon.png';
import favIcon from '../../assets/img/fav.png';
import nofavIcon from '../../assets/img/nofav.png';
import './main.css';

function PricesTable() {

  let [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { account } = useWeb3React();
  const { prices } = React.useContext(globalContext);

  React.useEffect(() => {
    setIsLoading(true);
    if (prices.length && account) {
      console.log(prices);
      setIsLoading(false);
    }
  }, [prices, account]);

  return (
    <>
      {
        isLoading && prices
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
        : <div className="prices-table mb-3">
            <div className="prices d-flex align-items-center justify-content-center">
              <div className="box p-1 text-center">
                <img src={marketIcon} width="30" height="30" />
              </div>
              <div className="box p-1">
                <strong><p>Binance</p></strong>
              </div>
              <div className="box p-1">
                <strong><p>FTX</p></strong>
              </div>
              <div className="box p-1">
                <strong><p>Update</p></strong>
              </div>
            </div>
            {
              prices.map(function(item:any, i:any) {
                return (
                  <div key={i} className="prices d-flex align-items-center justify-content-center">
                    <div className="box d-flex align-items-center justify-content-around">
                      <img src={favIcon} width="20" height="20" />
                      <strong>{item.symbol.replace('/USDT','')}</strong>
                    </div>
                    <div className="box p-1">
                      <p className="m-0">${item.binanceTicker.price.toFixed(2)}</p>
                    </div>
                    <div className="box p-1">
                      <p className="m-0">{item.ftxTicker.price ? `$ ${item.ftxTicker.price.toFixed(2)}` : ''}</p>
                    </div>
                    <div className="box p-1">
                      <p className={item.binanceTicker.percentage > 0 ? 'm-0 positive' : 'm-0 negative'}>%{item.binanceTicker.percentage.toFixed(2)}</p>
                    </div>
                  </div>
                )
              })
            }
            <p className="info-text">
              { account ? 'Here are your funds' : 'Connect your wallet' }
            </p>
          </div>
      }
    </>
  )
}

export default PricesTable;