import React from 'react';
import { globalContext } from '../../hooks/appContext';
import ConnectWallet from '../../components/ConnectWallet/index';
import './main.css';

function ProfileRoom() {

  const { isLogued, setIsLogued } = React.useContext(globalContext);

  return (
    <>
      <div className="view-container">
        {
          isLogued 
          ? <>
            </>
          : <ConnectWallet />
        }
      </div>
    </>
  )
}

export default ProfileRoom; 