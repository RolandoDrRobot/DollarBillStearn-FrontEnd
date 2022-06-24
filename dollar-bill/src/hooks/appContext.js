
import * as React from 'react';
import useVaults from './useVaults';
import usePrices from './usePrices';
import useFavs from './useFavs';

const globalContext = React.createContext();

// Provider in your app
function GlobalContextProvider(props) {
  const vaults = useVaults();
  const prices = usePrices();
  const favs = useFavs();

  return (
    <globalContext.Provider value={{
      vaults,
      prices,
      favs
    }}>
    {props.children}
    </globalContext.Provider>
  );
};

export { globalContext, GlobalContextProvider };
