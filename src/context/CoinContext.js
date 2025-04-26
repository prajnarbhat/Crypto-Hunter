// Store and retrieve data from localStorage
// Provide global access using React Context

import { createContext, useCallback, useEffect, useState } from "react";

export const CoinContext = createContext();

export const CoinContextProvider = ({children}) => {

    const [allCoins, setAllCoins] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    });

    const fetchAllCoins = useCallback(async () => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-JcGA7m5bu7h3HmvkbNcucbFe' }
        };

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options);
            const data = await response.json();
            setAllCoins(data);
        } catch (error) {
            console.error(error);
        }
    }, [currency.name]); 

    useEffect(() => {
        fetchAllCoins();
    }, [fetchAllCoins]); 

    const contextValue = {
        allCoins, currency, setCurrency
    };

    return (
        <CoinContext.Provider value={contextValue}>
            {children}
        </CoinContext.Provider>
    );
};

export default CoinContext;
