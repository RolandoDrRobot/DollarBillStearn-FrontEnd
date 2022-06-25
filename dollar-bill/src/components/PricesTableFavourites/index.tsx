import React from 'react';
import axios from 'axios';
import { globalContext } from '../../hooks/appContext';
import { useWeb3React } from '@web3-react/core';
import { useAlert } from 'react-alert';
import favIcon from '../../assets/img/fav.png';
import './main.css';

function PricesTableFavourites() {

  const alert = useAlert();
  let [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { account } = useWeb3React();
  const { prices, favs } = React.useContext(globalContext);

  React.useEffect(() => {
    setIsLoading(true);
    if (prices.length  && favs && account) {
      console.log(favs.favouriteTickers)
      setIsLoading(false);
    }
  }, [prices, account, favs]);

  const removeFav = async (ticker:string) => {
    await axios.post('http://localhost:443/removeFav', { account: account, ticker: ticker }).then((response) => {
      alert.show(response.data.status);
    });
  }

  return (
    <>
      {
        isLoading && prices
        ? <></>
        : <div className="fav-box mb-3" id="favBoxAccordion">
            <button className="accordion-button main-button" type="button" data-bs-toggle="collapse" data-bs-target="#favBoxAccordionContent" aria-expanded="true" aria-controls="collapseFavBox">
              <img src={favIcon} /> Favourite Tickers
            </button>

            <div id="favBoxAccordionContent" className="accordion-collapse collapse show" aria-labelledby="favBoxContent" data-bs-parent="#favBoxAccordion">
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
                    <div key={i}>
                      {
                        favs.favouriteTickers
                        ? favs.favouriteTickers[item.symbol] 
                          ? <div className="prices d-flex align-items-center justify-content-center">
                              <div className="box d-flex align-items-center justify-content-around">
                                <img src={favIcon} onClick={async () => {await removeFav(item.symbol)}} width="22" height="22" />
                                <strong>{item.symbol.replace('/USDT','')}</strong>
                              </div>
                              <div className="box p-1">
                                <p className={item.binanceTicker.percentage > 0 ? 'm-0 positive text-center' : 'm-0 negative text-center'}>%{item.binanceTicker.percentage.toFixed(2)}</p>
                              </div>
                              <div className="box p-1">
                                <p className="m-0">${item.binanceTicker.price.toFixed(2)}</p>
                              </div>
                              <div className="box p-1">
                                <p className="m-0">{item.ftxTicker.price ? `$ ${item.ftxTicker.price.toFixed(2)}` : ''}</p>
                              </div>
                            </div>
                          : <></>
                        : <></>
                      }
                    </div>
                  )
                })
              }
            </div>
            <p className="info-text">
              { account ? 'Here are your favourite tickers' : 'Connect your wallet' }
            </p>
          </div>
        </div>
      
      }
    </>
  )
}

export default PricesTableFavourites;