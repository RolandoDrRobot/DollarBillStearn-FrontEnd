import React from 'react';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core';

const useOrders = () => {
  const { account } = useWeb3React();
  let [orders, setOrders] = React.useState<any>([]);

  React.useEffect(() => {
    const Orders = async () => {
      await axios.get('http://localhost:443/fetchOrders').then((response) => {
        setOrders(response.data);
      });
    }
    Orders();
  }, [account]);

  return orders;
}

export default useOrders;
