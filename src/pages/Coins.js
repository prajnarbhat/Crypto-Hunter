import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinContext from "../context/CoinContext";
import Loader from "../pages/Loader";
import RenderCoinDetails from "../pages/RenderCoinDetails";

const Coins = () => {
    const { coinId } = useParams();
    const { currency } = useContext(CoinContext);

    const [isLoading, setLoading] = useState(false); // ✅ initialize with false
    const [coinData, setCoinData] = useState(null);
    const [historyData, setHistoryData] = useState(null);

    const fetchCoinData = useCallback(async () => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-cg-demo-api-key': 'CG-JcGA7m5bu7h3HmvkbNcucbFe'
                }
            };
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
            const data = await res.json();
            setCoinData(data);
        } catch (error) {
            console.error(error);
        }
    }, [coinId]); 

    const fetchHistoryData = useCallback(async () => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-cg-demo-api-key': 'CG-JcGA7m5bu7h3HmvkbNcucbFe'
                }
            };
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=5&interval=daily`, options);
            const data = await res.json();
            setHistoryData(data);
        } catch (error) {
            console.error(error);
        }
    }, [coinId, currency.name]); 
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchCoinData();
            await fetchHistoryData();
            setLoading(false);
        };

        fetchData();
    }, [fetchCoinData, fetchHistoryData]); // ✅ only depend on memoized functions

    return (
        <>
            {isLoading ? <Loader /> : <RenderCoinDetails coinData={coinData} historyCoinData={historyData} />}
        </>
    );
}

export default Coins;
