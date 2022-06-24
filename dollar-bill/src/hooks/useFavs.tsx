import React from 'react';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core';

const useFavs = () => {
    const { account } = useWeb3React();
    let [favAccount, setFavAccount] = React.useState<any>([]);

    React.useEffect(() => {
      const getFavAccount = async () => {
        await axios.post('http://localhost:443/getFavs', { account: account }).then((response) => {
          setFavAccount(response.data);
        });
      }
      getFavAccount();
    }, [account]);

  return favAccount;
}

export default useFavs;
