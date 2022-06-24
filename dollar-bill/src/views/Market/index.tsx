import React from 'react';
import PricesTable from '../../components/PricesTable/index';
import PricesTableFavourites from '../../components/PricesTableFavourites/index';
import './main.css';

function Market() {
  return (
    <>
      <div className="view-container">
        <PricesTableFavourites />
        <PricesTable />
      </div>
    </>
  )
}

export default Market;