import React from 'react';
import Wallet from '../../components/Wallet/index';
import bitcoinIcon from '../../assets/img/bitcoin.png';
import ethereumIcon from '../../assets/img/ethereum.png';
import xrpIcon from '../../assets/img/xrp.png';
import './main.css';


function Vault() {
  return (
    <>
      <div className="wallet">
        <Wallet />

        <div className="trade-box">

          <h3 className="wallet-option mb-1">
            Trader Box
          </h3>

          <div className="" id="trade-box">
            <div className="prices d-flex justify-content-center mb-3">
              <label><img className="coin" src={bitcoinIcon} /> $<span className="js-btc-quote"></span></label>
              <label><img className="coin" src={ethereumIcon} /> $<span className="js-eth-quote"></span></label>
              <label><img className="coin" src={xrpIcon} /> $<span className="js-xrp-quote"></span></label>
            </div>
            <form id="newOrder">
              <div className="coins d-flex justify-content-between">
                <div className="js-option option">
                  <input type="radio" className="js-btc-trade nw-cb" name="coin-to-trade" value="BTC/USDT" />
                    <p>BTC</p>
                </div>
                <div className="js-option option">
                  <input type="radio" className="js-eth-trade nw-cb" name="coin-to-trade" value="ETH/USDT" />
                    <p>ETH</p>
                </div>
                <div className="js-option option">
                  <input type="radio" className="js-xrp-trade nw-cb" name="coin-to-trade" value="XRP/USDT" />
                    <p>XRP</p>
                </div>
              </div>
              <div className="transanction-type  d-flex justify-content-between">
                <div className="js-option option">
                  <input type="radio" className="js-market-trade nw-cb" name="operation-type" value="market" />
                    <p>Market</p>
                </div>
                <div className="js-option option">
                  <input type="radio" className="js-limit-trade nw-cb" name="operation-type" value="limit" />
                    <p>Limit</p>
                </div>
                <div className="js-option option buy">
                  <input type="radio" className="js-buy-trade nw-cb" name="buy-sell" value="buy" />
                    <p>Buy</p>
                </div>
                <div className="js-option option sell">
                  <input type="radio" className="js-sell-trade nw-cb" name="buy-sell" value="sell" />
                    <p>Sell</p>
                </div>
              </div>
              <div className="amount d-flex align-items-center justify-content-between mb-3">
                <input type="number" className="js-amount" placeholder="Coin Amount to trade" />
                <p className="js-estimaded-order estimaded-order">$0</p>
              </div>
              <div className="submit-order d-flex align-items-center justify-content-between">
                <input type="text" className="js-price" placeholder="Price to buy/sell" />
                <div className="js-confirm-order submit-btn d-flex align-items-center justify-content-center" data-toggle="modal" data-target=".bd-example-modal-sm">
                  Create Order
                </div>
              </div>
            </form>

            <div className="js-order-result-done confirm-order order-result-done mt-4">
            </div>

          </div>

          <div id="confirmation-modal" className="confirm-order modal fade bd-example-modal-sm" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <div className="js-order-result order-result">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="orders">
          <div className="wallet-option d-flex align-items-center justify-content-between">
            <h3 className="mb-1" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseExample">Orders</h3>
            <div>
              <img className="js-btc-tab tab-icon" src={bitcoinIcon} />
              <img className="js-eth-tab tab-icon" src={ethereumIcon} />
              <img className="js-xrp-tab tab-icon" src={xrpIcon} />
            </div>
          </div>

          <div id="orders">
            <div className="js-bitcoin-orders orders-tab">
              <div className="js-bitcoin-open-orders mt-3">
              </div>
              <div className="js-bitcoin-closed-orders mt-3">
              </div>
            </div>
            <div className="js-ethereum-orders orders-tab d-none">
              <div className="js-ethereum-open-orders mt-3">
              </div>
              <div className="js-ethereum-closed-orders mt-3">
              </div>
            </div>
            <div className="js-xrp-orders orders-tab d-none">
              <div className="js-xrp-open-orders mt-3">
              </div>
              <div className="js-xrp-closed-orders mt-3">
              </div>
            </div>
          </div>

          <div id="cancel-order-modal" className="confirm-order modal fade cancelOrderModal" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <div className="js-order-result order-result">
                  <h3 className="text-center mb-4 px-3">Are you sure you want to cancel this order?</h3>
                  <div className="js-cancel-order submit-btn d-flex align-items-center justify-content-center">
                    Cancel order
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Vault;
