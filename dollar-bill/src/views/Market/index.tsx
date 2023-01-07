import React from 'react';
import { globalContext } from '../../hooks/appContext';
import PricesTable from '../../components/PricesTable/index';
import PricesTableFavourites from '../../components/PricesTableFavourites/index';
import ConnectWallet from '../../components/ConnectWallet/index';
import './main.css';

function Market() {

  const { isLogued, setIsLogued } = React.useContext(globalContext);

  return (
    <>
      <div className="view-container">
      {
        isLogued 
          ? <>
              <div className="section-title title-style-two text-center mb-3">
                <span>Market</span>
                <h2>Watch <span>the markets</span></h2>
              </div>
              <PricesTableFavourites />
              <PricesTable />
            </>
          : <ConnectWallet />
      }
      </div>
    </>
  )
}

export default Market; 