import React from 'react';
import Loading from '../../components/Loading/index';
import logo from '../../assets/img/profile.png';
import loadingIcon from '../../assets/img/settings.png';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { globalContext } from '../../hooks/appContext';
import { injected } from '../../config/connector';

import './main.css';

function Header() {

  let [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { active, activate, deactivate } = useWeb3React();
  const { isLogued, setIsLogued } = React.useContext(globalContext);

  async function connect() {
    setIsLoading(true);
    try {
      await activate(injected);
      localStorage.setItem('isWalletConnected', 'true');
      setIsLogued(true);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }

  async function disconnect() {
    setIsLoading(true);
    try {
      await deactivate();
      localStorage.setItem('isWalletConnected', 'false');
      setIsLogued(false);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }

  return (
    <> <div className={ active ? 'header active' : 'header'}>
        { active
        ? <nav className="navbar">
            <div className='container'>
              <div className="logo d-flex align-items-center mb-2">
                <a href="https://developermonster.com/"><img src={logo} height="70" alt="Logo" /></a>
                <h2>Dollar Bill <span>Capital</span></h2>
              </div>
              <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <img src={loadingIcon} width="35" height="35" alt="" />
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/market" className="button">
                     Market
                    </Link>
                  </li>
                  <li className="nav-item" onClick={disconnect}><a href="#">Logout</a></li>
                </ul>
              </div>
            </div>
          </nav>
        : isLoading === true 
        ? <Loading /> 
        : <></>        
      }
      </div>
    </>
  )
}

export default Header;
