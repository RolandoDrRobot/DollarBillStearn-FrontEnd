import React from 'react';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core';
import { globalContext } from '../../hooks/appContext';
import { useParams } from "react-router-dom";
import { useAlert } from 'react-alert';
import Loading from '../../components/Loading/index';
import coinIcon from '../../assets/img/coinIcon.png';
import warningIcon from '../../assets/img/warning.png';
import './main.css';

function TradingBox() {

  const alert = useAlert();
  const { vaultID }:any = useParams();
  const { account } = useWeb3React();

  const { vaults, prices, favs } = React.useContext(globalContext);

  let [wallet, setWallet] = React.useState<any>([]);
  let [isLoading, setIsLoading] = React.useState<boolean>(false);
  let [confirmTradeWindow, setConfirmTradeWindow] = React.useState<boolean>(false);
  let [opertaionType, setOpertaionType] = React.useState<any>('market');
  let [buySell, setBuySell] = React.useState<any>('buy');
  let [coinSelected, setCoinSelected] = React.useState<any>('BTC/USDT');
  let [amount, setAmount] = React.useState<any>(0);
  let [orderPrice, setOrderPrice] = React.useState<any>(0);
  let [estimatedCost, setEstimatedCost] = React.useState<any>(0);
  let [favTickers, setfavTickers] = React.useState<any>([]);

  const fetchTickerPrice = async (symbol:any) => {
    let tickerPrice = 0;
    const exchange = vaults[vaultID].exchange;
    prices.map(function(item:any, i:any) {
      if (item.symbol === symbol) tickerPrice = item[exchange].price;
    })
    return tickerPrice;
  }

  async function initialState() {
    const cost = await fetchTickerPrice(coinSelected);
    setOrderPrice(cost);
    setEstimatedCost(cost);

    prices.map(function(item:any, i:any) {
      if (favs.favouriteTickers) {
        if (favs.favouriteTickers[item.symbol]) {
          favTickers.push(item.symbol);
        }
      }
    })
  }

  const updateOrderPrice = async (event:any) => {
    setOrderPrice(event.target.value);
    let targetOrderPrice = event.target.value || 0;
    setEstimatedCost(targetOrderPrice * amount);
  }

  const updateCoinSelected = async (event:any) => {
    setCoinSelected(event.target.value);
    const cost = await fetchTickerPrice(event.target.value)
    setOrderPrice(cost);
    setEstimatedCost(cost);
    setAmount(0);
  }

  const updateAmount = async (event:any) => {
    setAmount(event.target.value);
    let targetAmount = event.target.value || 0;
    setEstimatedCost(targetAmount * orderPrice);
  }

  const updateEstimatedCost = async (event:any) => {
    setEstimatedCost(event.target.value);
    let targetEstimatedCost = event.target.value || 0;
    setAmount(targetEstimatedCost / orderPrice);
  }

  const noEnoughBalance = () => {
    console.log(buySell);
    if (buySell === "buy") {
      let usdtBalance:any = {};
      wallet.map(function(item:any, i:any) {
        if (item.tokenName === "USDT") usdtBalance = item;
      });
      if (usdtBalance !== {} && (usdtBalance.balance.free >= estimatedCost)) {
        return false
      }
      else {
        return true;
      }
    }

    if (buySell === "sell") {
      let coinBalance:any = {};
      console.log(wallet);
      wallet.map(function(item:any, i:any) {
        if (coinSelected.includes(item.tokenName) && item.tokenName !== 'USDT') coinBalance = item;
      });
      if (coinBalance !== {} && (coinBalance.balance.free >= amount)) {
        return false
      }
      else {
        return true;
      }
    }
  }

  const OpenOrder = async () => {
    if (estimatedCost <= 10) {
      alert.show('Estimated cost must be greater than $10');
      return
    }

    if (amount <= 0) {
      alert.show('Amount greater than 0');
      return
    }

    if (noEnoughBalance()) {
      alert.show('You do not have enough balance for this trade');
      return
    }

    setIsLoading(true);
    await axios.post('http://localhost:443/openOrder',
      { 
        symbol: coinSelected, 
        type: opertaionType, 
        side: buySell, 
        amount: amount,
        price: orderPrice,
        account: account,
        exchange: vaults[vaultID].exchange
      }).then((response:any) => {
        console.log(response.data);
        alert.show(response.data.status);
        setIsLoading(false);
      });
  }

  interface token {
    tokenName:string,
    balance: {
      free: number,
      used: number,
      total: number
    }
  }

  function setWalletsBalance() {
    for (const token in vaults[vaultID].balance) {
      if (vaults[vaultID].balance[token] && vaults[vaultID].usdBalance[token]) {
        const tokenInstance:token = {
          tokenName: token,
          balance: {
            free: vaults[vaultID].balance[token].free,
            used:  vaults[vaultID].balance[token].used,
            total:  vaults[vaultID].balance[token].total
          }
        }
        if(tokenInstance.balance.total > 0) wallet.push(tokenInstance);
      }
    }
  }

  React.useEffect(() => {
    if (vaults.length && account && favs ) {
      initialState();
      setWalletsBalance();
    }
  }, [vaults.length, account, favs]);

  return (
    <>
      {
        <div className="trading-box mb-3" id="tradingBoxAccordion">
          <button className="accordion-button main-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#tradingBoxAccordionContent" aria-expanded="false" aria-controls="collapseTradingBox">
            <img src={coinIcon} height="30" /> Trading Box
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
                  <div className="input-box">
                    <input type="number" placeholder="Price to buy or sell" onChange={updateOrderPrice} value={orderPrice || 0} disabled={opertaionType === 'market'} required />
                    <p className="info-text">Coin Price</p>
                  </div>
                  <div className="input-box">
                    <select name="coin" onChange={updateCoinSelected} required>
                      <option disabled>Favourite Tickers</option>
                      {
                        !favTickers.length 
                          ? <></> 
                          : favTickers.map(function(item:any, i:any) {
                          return (
                            <option key={i}>{item}</option>
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
                    <p className="info-text">Ticker</p>
                  </div>
                  
                  
                </div>
                <div className="buy-sell-price d-flex justify-content-between align-items-center mb-3">
                  <div className="input-box">
                    <input type="number" placeholder="Coin amount to trade" onChange={updateAmount} value={amount || 0} required />
                    <p className="info-text">Amount of coins</p>
                  </div>
                  <div className="input-box">
                    <input type="number" placeholder="Estimated cost" onChange={updateEstimatedCost} value={ estimatedCost || 0 } className="main-button m-0 text-center" />
                    <p className="info-text">Estimated cost</p>
                  </div> 
                </div>
                <div className="main-button submit-btn d-flex align-items-center justify-content-center" onClick={() => {setConfirmTradeWindow(true)}}>Create Order</div>
              </form>
            </div>
            <p className="info-text mb-5">
              { account ? 'Here you can open a trade' : 'Connect your wallet' }
            </p>
            {
              confirmTradeWindow
                ? <div className="confirmation-window d-flex align-items-center justify-content-center">
                    <div className="text-center">
                      <img src={warningIcon} width="50px" className='mb-2' />
                      <p>Are you sure you want to excute this operation?</p>
                      <div className="main-button submit-btn d-flex align-items-center justify-content-center" 
                        onClick={() => {
                          OpenOrder();
                          setConfirmTradeWindow(false);
                        }}>Yes
                      </div>
                    </div>
                  </div>
                : <></>
            }
            {
              isLoading 
                ? <Loading />
                : <></>
            }
          </div>
        </div>
      }
    </>
  )
}

export default TradingBox;