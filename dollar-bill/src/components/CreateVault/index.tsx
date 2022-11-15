import React from 'react';
import axios from 'axios';
import Loading from '../../components/Loading/index';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { useAlert } from 'react-alert';
import './main.css';

function NewUser() {

  const { account } = useWeb3React();
  const alert = useAlert();
  let [isLoading, setIsLoading] = React.useState<boolean>(false);
  let [vaultType, setVaultsType] = React.useState<String>('coin');

  const CreateCoinVault = async (name: string, api: string, apiSecret: string, exchange: string, owner: string) => {
    setIsLoading(true);
    await axios.post('http://localhost:443/createcoinvault', { name: name, api: api, apiSecret: apiSecret, exchange: exchange, owner: owner  }).then((response) => {
      alert.show(response.data.status);
    }).then(() => {
      setIsLoading(false);
    });
  }

  const CreateNFTVault = async (name: string, blockchain: string, owner: string) => {
    setIsLoading(true);
    await axios.post('http://localhost:443/createnftvault', { name: name, blockchain: blockchain, owner: owner }).then((response) => {
      alert.show(response.data.status);
    }).then(() => {
      setIsLoading(false);
    });
  }

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (vaultType === 'coin') {
      const target = e.target as typeof e.target & {
        name: { value: string };
        api: { value: string };
        apiSecret: { value: string };
        exchange: { value: string };
      };
      if (account && target.name && target.api && target.apiSecret && target.exchange) CreateCoinVault(target.name.value, target.api.value, target.apiSecret.value, target.exchange.value, account);
    }

    if (vaultType === 'nft') {
      const target = e.target as typeof e.target & {
        name: { value: string };
        blockchain: { value: string };
      };
      if (account && target.name && target.blockchain) CreateNFTVault(target.name.value, target.blockchain.value, account);
    }
  }

  return (
    <>
      <div className="new-vault">
        <div className="container d-flex justify-content-center">
          <form onSubmit={onSubmitForm}>
            <h1 className="mb-1 text-center">Let's create your vault</h1>
            <p className="info-text mb-4 px-1">Now you can track the performance of your portfolio</p>
            <input className="mb-3" placeholder="Vault's name" name="name" type="text" required />
            <div className="d-flex justify-content-between">
              <p
                className={ (vaultType === 'coin' ? 'selected' : '' ) + ' main-button vault-type d-flex justify-content-center align-items-center'}
                onClick={() => setVaultsType('coin')}
              >Coins Vault</p>
              <p 
                className={ (vaultType === 'nft' ? 'selected' : '' ) + ' main-button vault-type d-flex justify-content-center align-items-center'}
                onClick={() => setVaultsType('nft')}
              >NFTs Vault</p>
            </div>
            {
              vaultType === 'coin'
              ? <>
                  <input className="mb-3" placeholder="What's your API?" name="api" type="text" required />
                  <input className="mb-3" placeholder="API Secret" name="apiSecret" type="text" required />
                  <select className="mb-1" id="exchange" name="exchange" required>
                    <option value="binance">Binance</option>
                  </select>
                </>
              : vaultType === 'nft' ? 
                <>
                  <select className="mb-1" id="blockchain" name="blockchain" required>
                    <option value="polygon">Polygon</option>
                    <option value="ethereum">Ethereum</option>
                  </select>
                </>
                : <></>
            }
            
            <p className="info-text mb-4">Please select an exchange</p>
            <button type="submit" className="main-button mb-2">Create Vault</button>
            <p className="info-text mb-3">When you create an account, you agree to complain with our TOS</p>
            { isLoading === true ? <Loading /> : <></> }
            <Link to="/vaults" className="text-center d-block mt-5 mb-4">Go back</Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewUser;
