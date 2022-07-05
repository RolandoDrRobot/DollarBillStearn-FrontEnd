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



  React.useEffect(() => {
    if (vaults.length && account && favs ) {
      
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