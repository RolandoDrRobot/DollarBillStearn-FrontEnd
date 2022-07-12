import React from 'react';
import { globalContext } from '../../hooks/appContext';
import { Link } from 'react-router-dom';
import vaultsIcon from '../../assets/img/vault.png';
import statsIcon from '../../assets/img/stats.png';
import tradingIcon from '../../assets/img/trading.png';
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
        <Link to="/stats" className="button">
          <img src={statsIcon} alt="" />
          Stats
        </Link>
        <Link to="/trading/0" className="button">
          <img src={tradingIcon} alt="" />
          Trading
        </Link>
      </div>
      <p className="info-text font-cinzel">AXE Capital Ⓒ 2022 Dollar Bill</p>
    </>
  )
}

export default Navbar;
