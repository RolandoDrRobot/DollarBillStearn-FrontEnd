import React from 'react';
import { globalContext } from '../../hooks/appContext';
import { Link } from 'react-router-dom';
import vaultsIcon from '../../assets/img/Vault.png';
import nftIcon from '../../assets/img/nftIcon.png';
import coinIcon from '../../assets/img/coinIcon.png';
import ProfileIcon from '../../assets/img/profile.png';
import './main.css';

function Navbar() {

  const { isLogued, setIsLogued } = React.useContext(globalContext);

  return (
    <>
      <div className="navbar-bottom">
        <div className="container d-flex">
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
      </div>
    </>
  )
}

export default Navbar;
