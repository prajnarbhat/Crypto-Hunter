// Store and retrieve data from localStorage
// Provide global access using React Context

import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

export const CoinContextProvider = ({children}) => {

    const [ allCoins, setAllCoins] = useState([])
    // initial the currency will be USD
    const [ currency, setCurrency] = useState( {
        name: "usd",
        symbol: "$"
    })

    const fetchAllCoins = async() => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-JcGA7m5bu7h3HmvkbNcucbFe'}
        };
        
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(res => res.json())
            .then(res => setAllCoins(res))
            .catch(err => console.error(err));
    }

    // whenever the currency changes it will call this new fetch data

    useEffect(() => {
        fetchAllCoins()
    },[currency, fetchAllCoins])

    console.log("Currency value is:", currency);
    console.log("Setcurrency is:", setCurrency)


    const contextValue = {
        allCoins, currency, setCurrency
    }

    return (
         <CoinContext.Provider value={contextValue}>
            {children}
 
        </CoinContext.Provider>
    )


    



}

export default CoinContext;