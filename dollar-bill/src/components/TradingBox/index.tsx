import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { globalContext } from '../../hooks/appContext';
import { useParams } from "react-router-dom";
import tradingIcon from '../../assets/img/trading.png';
import './main.css';

function TradingBox() {

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
                    <input type="number" placeholder="Coin amount to trade" />
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
                    <input type="number" className="submit-order" placeholder="Price to buy or sell" />
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