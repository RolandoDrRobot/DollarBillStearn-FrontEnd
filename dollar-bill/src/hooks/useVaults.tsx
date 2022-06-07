import React from 'react';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core';

const useVaults = () => {
    const { account } = useWeb3React();
    let [vaults, setVaults] = React.useState<any>([]);

    React.useEffect(() => {
      const Vaults = async () => {
        await axios.post('http://localhost:443/getVault', { account: account }).then((response) => {
          setVaults(response.data);
        });
      }
      Vaults()
    }, [account]);

  return vaults;
}

export default useVaults;
