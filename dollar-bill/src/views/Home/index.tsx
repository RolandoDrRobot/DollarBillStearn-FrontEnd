import React from 'react';
import CreateVaultButton from '../../components/CreateVaultButton/index';
import VaultsRoom from '../../components/VaultsRoom/index';
import VaultsRoomStatus from '../../components/VaultsRoomStatus/index';
import './main.css';

function Home() {
  return (
    <>
      <div className="view-container">
        <VaultsRoomStatus />
        <VaultsRoom />
        <CreateVaultButton />
      </div>
    </>
  )
}

export default Home;
