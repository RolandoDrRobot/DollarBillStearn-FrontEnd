import React from 'react';
import axios from 'axios';
import Loading from '../../components/Loading/index';
import { Link, useNavigate } from 'react-router-dom';
import './main.css';

function NewUser() {
  const navigate = useNavigate();
  let [isLoading, setIsLoading] = React.useState<boolean>(false);
  let [createVaultStatus, setCreateVaultStatus] = React.useState<string>('When you create an account, you agree to complain with our TOS');

  const CreateVault = async (vaultName: string, apiKey: string, exchange: string) => {
    setIsLoading(true);
    await axios.post('http://localhost:443/createVault', { vaultName: vaultName, apiKey: apiKey, exchange: exchange }).then((response) => {
      setCreateVaultStatus(response.data.status);
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
      vaultName: { value: string };
      apiKey: { value: string };
      exchange: { value: string };
    };
    const vaultName = target.vaultName.value;
    const apiKey = target.apiKey.value;
    const exchange = target.exchange.value;        
    
    CreateVault(vaultName, apiKey, exchange);
  }

  return (
    <>
      <div className="new-vault d-flex align-items-center text-center">
        <div className="container d-flex justify-content-center">
          <form onSubmit={onSubmitForm}>
            <h1 className="mb-1">Let's create your vault</h1>
            <p className="info-text mb-4 px-5">Now you can track the performance of your portfolio</p>
            <input className="mb-3" placeholder="Vault's name" name="vault-name" type="text" />
            <input className="mb-3" placeholder="API Key" name="api-key" type="text" />
            <select className="mb-1" id="exchange" name="exchange">
              <option value="binance">Binance</option>
              <option value="ftxpro">FTX Pro</option>
            </select>
            <p className="info-text mb-4">Please select an exchange</p>
            <button type="submit" className="main-button mb-3">Create Vault</button>
            <Link to="/" className="text-center d-block mb-3">Go back</Link>
            <p className="info-text">{createVaultStatus}</p>
            { isLoading === true ? <Loading /> : <></> }
          </form>
        </div>
      </div>
    </>
  )
}

export default NewUser;
