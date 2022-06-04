import React from "react";
import { Link } from 'react-router-dom';
import "./main.css";

function Header() {
  return (
    <>
      <div className="create-vault mt-4">
        <Link to="/createVault" className="main-button d-flex align-items-center justify-content-center m-0">
          Create New Vault
        </Link>
        <p className="info-text">
          Create a vault for your fav exchange
        </p>
      </div>
    </>
  );
}

export default Header;
