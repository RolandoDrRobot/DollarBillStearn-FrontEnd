import React from 'react';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { globalContext } from '../../hooks/appContext';
import Loading from '../../components/Loading/index';
import binanceIcon from '../../assets/img/coins/binanceIcon.png';
import ftxIcon from '../../assets/img/coins/ftxIcon.png';
import './main.css';

function VaultsRoom() {

  const { account } = useWeb3React();
  let [isLoading, setIsLoading] = React.useState<boolean>(true);

  const { vaults } = React.useContext(globalContext);

  React.useEffect(() => {
    setIsLoading(true);
    if (vaults.length && account) {
      setIsLoading(false);

      Object.entries(vaults[1].balance).map(item => {
        console.log(item)
      })
      
      Object.entries(vaults[1].balance).forEach(item => {
        console.log(item)
      })
      
      for (const item of Object.entries(vaults[1].balance)) {
        console.log(item)
      }
    }
  }, [vaults, account]);

  return (
    <>
      <div className="vault mt-3">
        { 
          isLoading 
            ? <>
                <Loading />
                <p className="info-text">
                  { account ? 'We are loading your vaults' : 'Connect your wallet' }
                </p>
              </>
            : <>
                {
                  vaults.map(function(item:any, i:any) {
                    return (
                      <Link to={`/trading/${i}`} key={i} className="main-button d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <img 
                            src={
                              item.exchange === 'binance' ? binanceIcon
                              : item.exchange === 'ftx' ? ftxIcon
                              : ''
                            }
                            className="exchange-logo" 
                            alt="" 
                          />
                          {item.name}
                        </div>
                        <div>
                          $ {item.usdTotalBalance.toFixed(2)}
                        </div>
                      </Link>
                    )
                  })
                }
                <p className="info-text">
                  { account ? 'Select a vault to manage' : 'Connect your wallet' }
                </p>
              </>
        }
        
      </div>
    </>
  )
}

export default VaultsRoom;
