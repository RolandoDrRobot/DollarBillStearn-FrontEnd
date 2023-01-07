import React from 'react';
import { globalContext } from '../../hooks/appContext';
import CreateVaultButton from '../../components/CreateVaultButton/index';
import VaultsRoom from '../../components/VaultsRoom/index';
import VaultsRoomStatus from '../../components/VaultsRoomStatus/index';
import ConnectWallet from '../../components/ConnectWallet/index';
import './main.css';

function Vaults() {

  const { isLogued, setIsLogued } = React.useContext(globalContext);

  return (
    <>
      <div className="view-container">
        {
          isLogued 
            ? <>
                <div className="section-title title-style-two text-center mb-3">
                  <span>Vaults</span>
                  <h2>Manage <span>Accounts</span></h2>
                </div>
                <VaultsRoomStatus />
                <VaultsRoom />
                <CreateVaultButton />
              </>
            : <ConnectWallet />
        }
      </div>
    </>
  )
}

export default Vaults;
