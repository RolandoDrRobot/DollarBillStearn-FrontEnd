import React from 'react';
import { globalContext } from '../../hooks/appContext';
import CreateVaultButton from '../../components/CreateVaultButton/index';
import VaultsRoom from '../../components/VaultsRoom/index';
import VaultsRoomStatus from '../../components/VaultsRoomStatus/index';
import ConnectWallet from '../../components/ConnectWallet/index';
import './main.css';

function Home() {

  const { isLogued, setIsLogued } = React.useContext(globalContext);

  return (
    <>
      <div className="view-container">
        {
          isLogued 
            ? <>
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

export default Home;
