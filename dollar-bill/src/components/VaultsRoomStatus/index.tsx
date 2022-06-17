import React from "react";
import { globalContext } from '../../hooks/appContext';
import homeIcon from '../../assets/img/home.png';
import usdtIcon from '../../assets/img/coins/usdtIcon.png';
import botIcon from '../../assets/img/bot.png';

import "./main.css";

function VaultsRoomStatus() {
  let [totalValue, setTotalValue] = React.useState<Number>(0.00);

  const { vaults } = React.useContext(globalContext);

  React.useEffect(() => {
    vaults ? vaults.map(function(item:any, i:any) {
      setTotalValue(totalValue + item.usdTotalBalance.total)
    }) : <></>
  }, [vaults])

  return (
    <>
      <div className="vaults-room-status d-flex mt-3">
        <div className="d-flex align-items-center justify-content-center">
          <img className="vaults-status-icon" src={homeIcon} alt="" />
        </div>
        <div className="vaults-status">
          <div className="d-flex mb-3">
            <img src={botIcon} alt="" />
            Welcome to your vaults!
          </div>
          <div className="d-flex">
            <img src={usdtIcon} alt="" />
            Total Value: $ {totalValue.toFixed(2)}
          </div>
        </div>
      </div>
    </>
  );
}

export default VaultsRoomStatus;
