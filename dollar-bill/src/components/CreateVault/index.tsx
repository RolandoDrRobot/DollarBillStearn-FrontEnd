import React from 'react';
import axios from 'axios';
import Loading from '../../components/Loading/index';
import { Link, useNavigate } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import './main.css';

function NewUser() {

  const { account } = useWeb3React();
  const navigate = useNavigate();
  let [isLoading, setIsLoading] = React.useState<boolean>(false);
  let [error, setError] = React.useState<boolean>(false);
  let [createVaultStatus, setCreateVaultStatus] = React.useState<any>('When you create an account, you agree to complain with our TOS');

  const CreateVault = async (name: string, api: string, apiSecret: string, exchange: string, owner: string) => {
    setIsLoading(true);
    await axios.post('http://localhost:443/createVault', { name: name, api: api, apiSecret: apiSecret, exchange: exchange, owner: owner  }).then((response) => {
      setCreateVaultStatus(response.data.status);
      setError(true);
      if (response.data.status === 'created') {
        navigate('/', { replace: true });
      }
    }).then(() => {
      setIsLoading(false);
    });
  }

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      api: { value: string };
      apiSecret: { value: string };
      exchange: { value: string };
    };
    
    if (account && target.name && target.api && target.apiSecret && target.exchange) 
      CreateVault(target.name.value, target.api.value, target.apiSecret.value, target.exchange.value, account);
  }

  return (
    <>
      <div className="new-vault">
        <div className="container d-flex justify-content-center">
          <form onSubmit={onSubmitForm}>
            <h1 className="mb-1 text-center">Let's create your vault</h1>
            <p className="info-text mb-4 px-5">Now you can track the performance of your portfolio</p>
            <input className="mb-3" placeholder="Vault's name" name="name" type="text" required />
            <input className="mb-3" placeholder="What's your API?" name="api" type="text" required />
            <input className="mb-3" placeholder="API Secret" name="apiSecret" type="text" required />
            <select className="mb-1" id="exchange" name="exchange" required>
              <option value="binance">Binance</option>
              <option value="ftx">FTX Pro</option>
            </select>
            <p className="info-text mb-4">Please select an exchange</p>
            <button type="submit" className="main-button mb-2">Create Vault</button>
            <p className={ error ? "info-text error mb-3" : "info-text mb-3" }>{createVaultStatus}</p>
            { isLoading === true ? <Loading /> : <></> }
            <Link to="/" className="text-center d-block mt-5 mb-4">Go back</Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewUser;
