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