import React from 'react';
import { globalContext } from '../../hooks/appContext';
import { Link } from 'react-router-dom';
import vaultsIcon from '../../assets/img/vault.png';
import nftIcon from '../../assets/img/nftIcon.png';
import coinIcon from '../../assets/img/coinIcon.png';
import ProfileIcon from '../../assets/img/profile.png';
import './main.css';

function Navbar() {

  const { isLogued, setIsLogued } = React.useContext(globalContext);

  return (
    <>
      <div className={isLogued ? 'navbar d-flex' : 'navbar d-flex disabled'}>
        <Link to="/" className="button">
          <img src={ProfileIcon} alt="" />
          Home
        </Link>
       <Link to="/vaults" className="button">
          <img src={vaultsIcon} alt="" />
          Vaults
        </Link>
        <Link to="/nfts/0" className="button">
          <img src={nftIcon} alt="" />
          NFTs
        </Link>
        <Link to="/coins/0" className="button">
          <img src={coinIcon} alt="" />
          Coins
        </Link>
      </div>
      <p className="info-text font-cinzel">AXE Capital Ⓒ 2022 Dollar Bill Stearn</p>
    </>
  )
}

export default Navbar;
