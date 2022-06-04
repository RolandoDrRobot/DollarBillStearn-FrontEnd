import React from "react";
import homeIcon from '../../assets/img/home.png';
import usdtIcon from '../../assets/img/coins/usdtIcon.png';
import botIcon from '../../assets/img/bot.png';

import "./main.css";

function VaultsRoomStatus() {
  return (
    <>
      <div className="vaults-room-status d-flex mt-3">
        <div>
          <img className="vaults-status-icon" src={homeIcon} alt="" />
        </div>
        <div className="vaults-status">
          <div className="d-flex mb-3">
            <img src={botIcon} alt="" />
            Welcome to your vaults!
          </div>
          <div className="d-flex">
            <img src={usdtIcon} alt="" />
            Total Value: $50,000
          </div>
        </div>
      </div>
    </>
  );
}

export default VaultsRoomStatus;
