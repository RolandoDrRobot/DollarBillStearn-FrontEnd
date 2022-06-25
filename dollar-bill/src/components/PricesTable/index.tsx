import React from 'react';
import axios from 'axios';
import Loading from '../../components/Loading/index';
import { globalContext } from '../../hooks/appContext';
import { useWeb3React } from '@web3-react/core';
import { useAlert } from 'react-alert';
import marketIcon from '../../assets/img/marketIcon.png';
import favIcon from '../../assets/img/fav.png';
import nofavIcon from '../../assets/img/nofav.png';
import './main.css';

function PricesTable() {

  const alert = useAlert();
  let [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { account } = useWeb3React();
  const { prices, favs } = React.useContext(globalContext);

  React.useEffect(() => {
    setIsLoading(true);
    if (prices.length  && favs && account) {
      setIsLoading(false);
    }
  }, [prices, account, favs]);

  const fav = async (ticker:string) => {
    await axios.post('http://localhost:443/fav', { account: account, ticker: ticker }).then((response) => {
      alert.show(response.data.status);
    });
  }

  const removeFav = async (ticker:string) => {
    await axios.post('http://localhost:443/removeFav', { account: account, ticker: ticker }).then((response) => {
      alert.show(response.data.status);
    });
  }

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
                { account ? 'We are loading the markets' : 'Connect your wallet' }
              </p>
            </div>
          </div>
        : <div className="prices-box mb-3" id="pricesBoxAccordion">
            <button className="accordion-button main-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#pricesBoxAccordionContent" aria-expanded="false" aria-controls="collapsePricesBox">
              <img src={marketIcon} /> Market
            </button>

            <div id="pricesBoxAccordionContent" className="accordion-collapse collapse" aria-labelledby="pricesBoxContent" data-bs-parent="#pricesBoxAccordion">
            <div className="prices-table mb-3">
              <div className="prices d-flex align-items-center justify-content-center">
                <div className="box p-1">
                <strong><p className='text-center'>Ticker</p></strong>
                </div>
                <div className="box p-1">
                  <strong><p className='text-center'>Update</p></strong>
                </div>
                <div className="box p-1">
                  <strong><p>Binance</p></strong>
                </div>
                <div className="box p-1">
                  <strong><p>FTX</p></strong>
                </div>
              </div>
              {
                prices.map(function(item:any, i:any) {
                  return (
                    <div key={i} className="prices d-flex align-items-center justify-content-center">
                      <div className="box d-flex align-items-center justify-content-around">
                        {
                          favs.favouriteTickers
                          ? favs.favouriteTickers[item.symbol] 
                            ? <img src={favIcon} onClick={async () => {await removeFav(item.symbol)}} width="22" height="22" />
                            : <img src={nofavIcon} onClick={async () => {await fav(item.symbol)}} width="22" height="22" />
                          : <img src={nofavIcon} onClick={async () => {await fav(item.symbol)}} width="22" height="22" />
                        } 
                        <strong>{item.symbol.replace('/USDT','')}</strong>
                      </div>
                      <div className="box p-1">
                        <p className={item.binance.percentage > 0 ? 'm-0 positive text-center' : 'm-0 negative text-center'}>%{item.binance.percentage.toFixed(2)}</p>
                      </div>
                      <div className="box p-1">
                        <p className="m-0">${item.binance.price.toFixed(2)}</p>
                      </div>
                      <div className="box p-1">
                        <p className="m-0">{item.ftx.price ? `$ ${item.ftx.price.toFixed(2)}` : ''}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <p className="info-text">
              { account ? 'This is the market today' : 'Connect your wallet' }
            </p>
          </div>
        </div>
      
      }
    </>
  )
}

export default PricesTable;