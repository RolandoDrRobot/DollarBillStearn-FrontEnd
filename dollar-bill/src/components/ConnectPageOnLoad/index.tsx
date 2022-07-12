import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { globalContext } from '../../hooks/appContext';
import { injected } from '../../config/connector';

function ConnectOnPageLoad() {

  const { activate, account } = useWeb3React();
  const { isLogued, setIsLogued } = React.useContext(globalContext);

  React.useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage && localStorage.getItem('isWalletConnected') === 'true') {
        try {
          await activate(injected);
          setIsLogued(true);
        } catch (e) {
          console.log(e);
        }
      }
    }
    connectWalletOnPageLoad()
  }, [account]);

  return (
    <>
    </>
  )
}

export default ConnectOnPageLoad;
