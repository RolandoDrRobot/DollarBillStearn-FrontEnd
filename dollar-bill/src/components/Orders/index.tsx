import React from 'react';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core';
import { globalContext } from '../../hooks/appContext';
import { useParams } from "react-router-dom";
import { useAlert } from 'react-alert';
import Loading from '../../components/Loading/index';
import bookIcon from '../../assets/img/book.png';
import './main.css';

function Orders() {

  const alert = useAlert();
  const { vaultID }:any = useParams();
  const { account } = useWeb3React();

  const { vaults, prices, favs } = React.useContext(globalContext);
  let [isLoading, setIsLoading] = React.useState<boolean>(true);
  let [formattedOrders, setFormattedOrders] = React.useState<any>([]);


  const formatOrder = (orders:any) => {
    for (const token in orders) {
      const ordersInstance:any = {
        tokenName: token,
        orders: orders[token]
      }
      formattedOrders.push(ordersInstance);
    }
    console.log(formattedOrders);
    setIsLoading(false);
  }

  const fetchOrders = async (exchange:string) => {
    await axios.post('http://localhost:443/fetchOrders', { account: account, exchange: exchange }).then((response) => {
      formatOrder(response.data.status);
    });
  }

  React.useEffect(() => {
    if (vaults.length && account && favs ) {
      const exchange = vaults[vaultID].exchange;
      fetchOrders(exchange);
    }
  }, [vaults.length, account, favs]);

  return (
    <>
      {
        <div className="orders mb-3" id="ordersAccordion">
          <button className="accordion-button main-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ordersAccordionContent" aria-expanded="false" aria-controls="collapseOrders">
            <img src={bookIcon} height="30" /> Orders
          </button>

          <div id="ordersAccordionContent" className="accordion-collapse collapse" aria-labelledby="ordersContent" data-bs-parent="#ordersAccordion">
            <div className="orders-box mt-3">
            {
              isLoading === true ? <Loading /> : 
              formattedOrders.map(function(item:any, i:any) {
                return (
                  <div key={i} id={item.tokenName}>
                    <button className="accordion-button main-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${item.tokenName}AccordionContent`} aria-expanded="false" aria-controls={`collapse${item.tokenName}`}>
                      <img src={bookIcon} height="30" /> {item.tokenName}
                    </button>
                    <div id={`${item.tokenName}AccordionContent`} className="accordion-collapse collapse" aria-labelledby={`${item.tokenName}Content`} data-bs-parent={`#${item.tokenName}Accordion`}>
                      Hola
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