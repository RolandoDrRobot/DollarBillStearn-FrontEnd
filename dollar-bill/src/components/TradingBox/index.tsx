import React from 'react';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core';
import { globalContext } from '../../hooks/appContext';
import { useParams } from "react-router-dom";
import { useAlert } from 'react-alert';
import tradingIcon from '../../assets/img/trading.png';
import './main.css';

function TradingBox() {

  const alert = useAlert();
  const { vaultID }:any = useParams();
  const { account } = useWeb3React();

  const { vaults, prices, favs } = React.useContext(globalContext);

  let [isLoading, setIsLoading] = React.useState<boolean>(true);
  let [opertaionType, setOpertaionType] = React.useState<any>('market');
  let [buySell, setBuySell] = React.useState<any>('buy');
  let [coinSelected, setCoinSelected] = React.useState<any>('BTC/USDT');
  let [amount, setAmount] = React.useState<any>();
  let [orderPrice, setOrderPrice] = React.useState<any>(0);
  let [estimatedCost, setEstimatedCost] = React.useState<any>(0);

  const fetchTickerPrice = async (symbol:any) => {
    let tickerPrice = 0;
    const exchange = (vaults[vaultID].exchange);
    prices.map(function(item:any, i:any) {
      if (item.symbol === symbol) tickerPrice = item[exchange].price;
    })
    return tickerPrice;
  }

  async function initialState() {
    const cost = await fetchTickerPrice(coinSelected);
    setOrderPrice(cost);
    setEstimatedCost(cost);
  }

  const updateCoinSelected = async (event:any) => {
    setCoinSelected(event.target.value);
    const cost = await fetchTickerPrice(event.target.value)
    setOrderPrice(cost);
    setEstimatedCost(cost);
  }
  
  const updateAmount = async (event:any) => {
    setAmount(event.target.value);
    let targetAmount = event.target.value || 0;
    const tickerPrice = await fetchTickerPrice(coinSelected);
    setEstimatedCost(targetAmount * tickerPrice);
  }

  // const OpenOrder = async (symbol: string, type: string, side: string, amount: string, estimatedCost:string, price:string, owner: string) => {
  //   setIsLoading(true);
  //   await axios.post('http://localhost:443/openOrder', { symbol: symbol, type: type, side: side, amount: amount, estimatedCost: estimatedCost, price: price, owner: owner }).then((response:any) => {
  //     alert.show(response.data.status);
  //   }).then(() => {
  //     setIsLoading(false);
  //   });
  // }

  React.useEffect(() => {
    setIsLoading(true);
    if (vaults.length && account) {
      initialState();
      setIsLoading(false);
    }
  }, [vaults.length, account]);

  return (
    <>
      {
        isLoading 
        ? <></>
        : <div className="trading-box mb-3" id="tradingBoxAccordion">
            <button className="accordion-button main-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#tradingBoxAccordionContent" aria-expanded="false" aria-controls="collapseTradingBox">
              <img src={tradingIcon} height="30" /> Trading Box
            </button>

            <div id="tradingBoxAccordionContent" className="accordion-collapse collapse" aria-labelledby="tradingBoxContent" data-bs-parent="#tradingBoxAccordion">
              <div className="trade-box mt-3">
                <form id="newOrder">
                  <div className="d-flex justify-content-between mb-3">
                    <div onClick={() => {setOpertaionType('market')}} className={opertaionType === 'market' ? 'option selected' : 'option' }>
                      <p>Market</p>
                    </div>
                    <div onClick={() => {setOpertaionType('limit')}} className={opertaionType === 'limit' ? 'option selected' : 'option' }>
                      <p>Limit</p>
                    </div>
                    <div onClick={() => {setBuySell('buy')}} className={buySell === 'buy' ? 'option selected' : 'option' }>
                      <p>Buy</p>
                    </div>
                    <div onClick={() => {setBuySell('sell')}} className={buySell === 'sell' ? 'option selected' : 'option' }> 
                      <p>Sell</p>
                    </div>
                  </div>
                  <div className="coin-amount d-flex justify-content-between align-items-center mb-3">
                    <input type="number" name="price" className="submit-order" placeholder="Price to buy or sell" value={orderPrice} disabled={opertaionType === 'market'} required />
                    <select name="coin" onChange={updateCoinSelected} required>
                      <option disabled>Favourite Tickers</option>
                      {
                        prices.map(function(item:any, i:any) {
                          return (
                            favs.favouriteTickers
                            ? favs.favouriteTickers[item.symbol] 
                              ? <option key={i}>{item.symbol}</option>
                              : <></>
                            : <></>
                          )
                        })
                      }
                      <option disabled>All the market</option>
                      {
                        prices.map(function(item:any, i:any) {
                          return (
                            <option key={i}>{item.symbol}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <div className="buy-sell-price d-flex justify-content-between align-items-center mb-3">
                    <input type="number" name="name" placeholder="Coin amount to trade" onChange={updateAmount} value={amount} required />
                    <p className="main-button m-0 text-center">$ {estimatedCost}</p>
                  </div>
                  <button type="submit" className="main-button submit-btn">Create Order</button>
                </form>
              </div>
              <p className="info-text">
                { account ? 'Here you can open a trade' : 'Connect your wallet' }
              </p>
            </div>
          </div>
      }
    </>
  )
}

export default TradingBox;