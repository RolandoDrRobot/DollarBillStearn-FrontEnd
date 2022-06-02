import React from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../../assets/img/home.png';
import statsIcon from '../../assets/img/stats.png';
import tradingIcon from '../../assets/img/trading.png';
import './main.css';

function Navbar() {
  return (
    <>
      <div className="navbar">
       <Link to="/" className="button">
          <img src={homeIcon} alt="" />
          Home
        </Link>
        <Link to="/stats" className="button">
          <img src={statsIcon} alt="" />
          Stats
        </Link>
        <Link to="/trading" className="button">
          <img src={tradingIcon} alt="" />
          Trading
        </Link>
      </div>
    </>
  )
}

export default Navbar;
