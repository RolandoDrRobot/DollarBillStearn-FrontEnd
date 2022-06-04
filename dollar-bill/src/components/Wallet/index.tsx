import React from 'react';
import tetherIcon from '../../assets/img/tether.png';
import './main.css';

function Wallet() {
  return (
    <>
      <div className="headline d-flex align-items-center justify-content-between mb-3">
        <h3 className="m-0">Wallet</h3>
        <h3 className="d-inline m-0"></h3>
      </div>
      <div className="mt-2">
        <div className="currency row">
          <div className="col-2 mb-1 d-flex align-items-center justify-content-center">
            <img className="coin" src={tetherIcon} />
          </div>
          <div className="col-3 p-1 mb-1 text-center">
            <p className="tourquese m-0"></p>
            <label>Total</label>
          </div>
          <div className="col-3 p-1 text-center">
            <p className="tourquese m-0"></p>
            <label>In Order</label>
          </div>
          <div className="col-3 p-1 text-center">
            <p className="tourquese m-0"></p>
            <label>Avaliable</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default Wallet;