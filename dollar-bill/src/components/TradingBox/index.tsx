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
  const { vaults } = React.useContext(globalContext);
  let [isLoading, setIsLoading] = React.useState<boolean>(true);
  let [wallets, setWallets] = React.useState<any>([]);


  React.useEffect(() => {
    setIsLoading(true);
    if (vaults.length && account) {
      setIsLoading(false);
    }
  }, [vaults, account]);

  // Calculate estimated cost by coin
  // Calculate estimated cost gas
  // Open order

  const CalculateEstimatedCostByCoin = async () => {

  }

  const CalculateEstimatedCostByGas = async () => {

  }

  const OpenOrder = async (symbol: string, type: string, side: string, amount: string, estimatedCost:string, price:string, owner: string) => {
    setIsLoading(true);
    await axios.post('http://localhost:443/openOrder', { symbol: symbol, type: type, side: side, amount: amount, estimatedCost: estimatedCost, price: price, owner: owner }).then((response:any) => {
      alert.show(response.data.status);
    }).then(() => {
      setIsLoading(false);
    });
  }

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      symbol: { value: string };
      type: { value: string };
      side: { value: string };
      amount: { value: string };
      estimatedCost: { value: string };
      price: { value: string };
    };
    
    if (account && target.symbol && target.type && target.side && target.amount && target.estimatedCost && target.price) 
      OpenOrder(account, target.symbol.value, target.type.value, target.side.value, target.amount.value, target.estimatedCost.value, target.price.value);
  }

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
                <form id="newOrder" onSubmit={onSubmitForm}>
                  <div className="d-flex justify-content-between">
                    <div className="option market">
                      <input type="radio" className="" name="operation-type" value="market" />
                      <p>Market</p>
                    </div>
                    <div className="option limit">
                      <input type="radio" className="" name="operation-type" value="limit" />
                      <p>Limit</p>
                    </div>
                    <div className="option buy">
                      <input type="radio" className="" name="buy-sell" value="buy" />
                      <p>Buy</p>
                    </div>
                    <div className="option sell">
                      <input type="radio" className="" name="buy-sell" value="sell" />
                      <p>Sell</p>
                    </div>
                  </div>
                  <div className="coin-amount d-flex justify-content-between align-items-center mb-3">
                    <input type="number" name="name" placeholder="Coin amount to trade" />
                    <select name="coin">
                      <option>BTC</option>
                      <option>ETH</option>
                      <option>XRP</option>
                      <option>BNB</option>
                      <option>TRX</option>
                      <option>LINK</option>
                      <option>THETA</option>
                    </select>
                  </div>
                  <div className="buy-sell-price d-flex justify-content-between align-items-center mb-3">
                    <input type="number" name="price" className="submit-order" placeholder="Price to buy or sell" />
                    <p className="main-button m-0 text-center">$ 0</p>
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