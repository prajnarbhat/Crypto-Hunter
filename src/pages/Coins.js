import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinContext from "../context/CoinContext";
import Loader from "../pages/Loader";
import RenderCoinDetails from "../pages/RenderCoinDetails";

const Coins = () => {

    const {coinId} = useParams()
    const { currency } = useContext(CoinContext);
    console.log("Coin Id:", coinId)
    const [ isLoading, setLoading ] = useState();
    const [coinData, setCoinData] = useState();
    const [historyData, setHistoryData] = useState();

    const fetchCoinData = async() => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-JcGA7m5bu7h3HmvkbNcucbFe'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
            .then(res => res.json())
            .then(res => setCoinData(res))
            .catch(err => console.error(err));
    }

    const fetchHistoryData = () => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-JcGA7m5bu7h3HmvkbNcucbFe'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=5&interval=daily`, options)
            .then(res => res.json())
            .then(res => setHistoryData(res))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        setLoading(true);
        fetchCoinData();
        fetchHistoryData();
        setLoading(false)
    },[currency, fetchCoinData, fetchHistoryData])

    return (
        <>
            {isLoading ? <Loader /> : <RenderCoinDetails coinData={coinData} historyCoinData = {historyData}/>}
        </>
    )
}

export default Coins;