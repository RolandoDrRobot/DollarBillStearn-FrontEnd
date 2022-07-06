import React from 'react';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core';
import { globalContext } from '../../hooks/appContext';
import { useParams } from "react-router-dom";
import { useAlert } from 'react-alert';
import Loading from '../../components/Loading/index';
import bookersIcon from '../../assets/img/bookers.png';
import './main.css';

function Orders() {

  const alert = useAlert();
  const { vaultID }:any = useParams();
  const { account } = useWeb3React();

  const { vaults, prices, favs } = React.useContext(globalContext);
  let [isLoading, setIsLoading] = React.useState<boolean>(true);
  let [formattedOrders, setFormattedOrders] = React.useState<any>([]);

  function createDate(timestamp:any) {
    const dateObj:any = new Date(timestamp);
    const date = {
      year: dateObj.getFullYear(),
      month: dateObj.getMonth()+1,
      day: dateObj.getDate(),
      hour: dateObj.getHours(),
      minute: dateObj.getMinutes(),
      second: dateObj.getSeconds(),
    };
    return  date.hour + ':' + date.minute + ':' + date.second + ' - ' + date.day + '/' + date.month + '/' + date.year;
  }

  const formatOrder = (orders:any) => {
    for (const token in orders) {
      const ordersInstance:any = {
        tokenName: token,
        orders: orders[token].reverse(),
      }
      formattedOrders.push(ordersInstance);
    }
    console.log(formattedOrders);
    setIsLoading(false);
  }

  const fetchOrders = async () => {
    const exchange = vaults[vaultID].exchange;
    await axios.post('http://localhost:443/fetchOrders', { account: account, exchange: exchange }).then((response) => {
      formatOrder(response.data.status);
    });
  }

  const cancelOrder = async (orderID:String, ticker:String) => {
    const exchange = vaults[vaultID].exchange;
    await axios.post('http://localhost:443/cancelOrder', { account: account, exchange: exchange, orderID: orderID, ticker: ticker }).then((response) => {
      alert.show(response.data.status);
    });
  }

  React.useEffect(() => {
    if (vaults.length && account && favs ) {
      fetchOrders();
    }
  }, [vaults.length, account, favs]);

  return (
    <>
      {
        <div className="orders mb-4" id="ordersAccordion">
          <button className="accordion-button main-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ordersAccordionContent" aria-expanded="false" aria-controls="collapseOrders">
            <img src={bookersIcon} height="30" /> Orders
          </button>

          <div id="ordersAccordionContent" className="accordion-collapse collapse" aria-labelledby="ordersContent" data-bs-parent="#ordersAccordion">
            <div className="orders-box mt-3">
            {
              isLoading === true ? <Loading /> : 
              formattedOrders.map(function(ticker:any, i:any) {
                return (
                  ticker.orders.map(function(item:any, i:any) {
                    return (
                      item.status === 'open' ? 
                        <div key={i} id={ticker.tokenName}>
                          <button className="accordion-button main-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${ticker.tokenName}AccordionContent`} aria-expanded="false" aria-controls={`collapse${ticker.tokenName}`}>
                            <img src={bookersIcon} height="30" /> {ticker.tokenName} - Open Orders
                          </button>

                          {/* <div id={`${order.tokenName}AccordionContent`} className="accordion-collapse collapse" aria-labelledby={`${order.tokenName}Content`} data-bs-parent={`#${order.tokenName}Accordion`}>
                            <div key={i} id={order.id} className="order-record">
                              <div className="d-flex justify-content-between mb-4">
                                <div>
                                  <p>{order.amount}</p>
                                  <p className="info-text">Amount</p>
                                </div>
                                <div>
                                  <p>${order.cost.toFixed(2)}</p>
                                  <p className="info-text">Cost</p>
                                </div>
                                <div>
                                  <p>{order.price.toFixed(3)}</p>
                                  <p className="info-text">Price</p>
                                </div>
                              </div>
                              <div className="order-data d-flex justify-content-between">
                                <div>
                                  <p className={order.side === 'buy' ? 'positive' : 'alert' }>{order.side}</p>
                                  <p className="info-text">Side</p>
                                </div>
                                <div>
                                  <p>{order.status}</p>
                                  <p className="info-text">Order</p>
                                </div>
                                <div>
                                  <p>{createDate(order.timestamp)}</p>
                                  <p className="info-text timestamp">Timestamp</p>
                                </div>
                              </div>
                              {
                                order.status === 'open'
                                ? <p className="main-button mt-4" onClick={() => {closeOrder(order.id)}}> Cancel Order</p>
                                : <></>
                              }
                            </div>
                          </div> */}
                        </div>
                      : <></>
                    )
                  })
                )
              })
            }
            {
              isLoading === true ? <></> : 
              formattedOrders.map(function(item:any, i:any) {
                return (
                  <div key={i} id={item.tokenName}>
                    <button className="accordion-button main-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${item.tokenName}AccordionContent`} aria-expanded="false" aria-controls={`collapse${item.tokenName}`}>
                      <img src={bookersIcon} height="30" /> {item.tokenName}
                    </button>
                    <div id={`${item.tokenName}AccordionContent`} className="accordion-collapse collapse" aria-labelledby={`${item.tokenName}Content`} data-bs-parent={`#${item.tokenName}Accordion`}>
                    {
                      item.orders.map(function(item:any, i:any) {
                        return (
                          <div key={i} id={item.id} className="order-record">
                            <div className="d-flex justify-content-between mb-4">
                              <div>
                                <p>{item.amount}</p>
                                <p className="info-text">Amount</p>
                              </div>
                              <div>
                                <p>${item.cost.toFixed(2)}</p>
                                <p className="info-text">Cost</p>
                              </div>
                              <div>
                                <p>{item.price.toFixed(3)}</p>
                                <p className="info-text">Price</p>
                              </div>
                            </div>
                            <div className="order-data d-flex justify-content-between">
                              <div>
                                <p className={item.side === 'buy' ? 'positive' : 'alert' }>{item.side}</p>
                                <p className="info-text">Side</p>
                              </div>
                              <div>
                                <p>{item.status}</p>
                                <p className="info-text">Order</p>
                              </div>
                              <div>
                                <p>{createDate(item.timestamp)}</p>
                                <p className="info-text timestamp">Timestamp</p>
                              </div>
                            </div>
                            {
                              item.status === 'open'
                              ? <p className="main-button mt-4" onClick={() => {cancelOrder(item.id, item.symbol)}}> Cancel Order</p>
                              : <></>
                            }
                          </div>
                        )
                      })
                    }
                    </div>
                  </div>
                )
              })
            }
            </div>
            <p className="info-text">
              { account ? 'Here are your orders' : 'Connect your wallet' }
            </p>
          </div>
        </div>
      }
    </>
  )
}

export default Orders;