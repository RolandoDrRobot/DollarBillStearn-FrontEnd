import React from 'react';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core';

const usePrices = () => {
    const { account } = useWeb3React();
    let [prices, setPrices] = React.useState<any>([]);

    React.useEffect(() => {
      const Prices = async () => {
        await axios.get('http://localhost:443/fetchPrices').then((response) => {
          setPrices(response.data);
        });
      }
      Prices();
    }, [account]);

  return prices;
}

export default usePrices;
