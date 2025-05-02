import { useContext, useEffect, useState } from "react";
import CoinContext from "../context/CoinContext";
const Home = () => {

    const { allCoins, currency} = useContext(CoinContext);
    const [ displayCoin, setDisplayCoin] = useState([])
    const [ inputValue, setInputValue] = useState("")
    const [ fieldValues, setField] = useState("")
    const [ order, setOrder] = useState("")
    const [ result, setResult] = useState([])

    console.log("Coins in home:", displayCoin)

    const inputValueChange = (e) => {
        setInputValue(e.target.value);
        if(e.target.value === "") {
            setDisplayCoin(allCoins)
        }
    }

    const searchHandler = (e) => {
        e.preventDefault()
        const filterInputByNames = allCoins.filter(item => {
          return item.name.toLowerCase().includes(inputValue.toLowerCase())
        })
        console.log("What is searchHandler:", filterInputByNames);

        setResult(filterInputByNames)

        const sortValues = sortValuesByOrder(filterInputByNames, fieldValues, order)
        setDisplayCoin(sortValues)

        // if(inputValue === "") {
        //     alert("Please enter a cryptocurrency name to search!")
        // }
    }

    const sortValuesByOrder = (filterInputByNames, fieldValues, order) => {

        const dataSort = [...filterInputByNames];

        const fieldSort = fieldValues.toLowerCase();
        const orderSort = order.toLowerCase();

        if( orderSort === "ascending") {
            dataSort.sort((a,b) => a[fieldSort] < b[fieldSort] ? -1 : 1)
        } 
        if( orderSort === "descending") {
            dataSort.sort((a,b) => a[fieldSort] < b[fieldSort] ? 1 : -1)
        }
        return dataSort
    }

    const changeByField = (e) => {
        setField(e.target.value)
        setDisplayCoin(!result ? sortValuesByOrder(allCoins, fieldValues, order) : sortValuesByOrder(result, fieldValues, order))
    }

    const changeByOrder = (e) => {
        setOrder(e.target.value)
        setDisplayCoin(!result ? sortValuesByOrder(allCoins, fieldValues, order) : sortValuesByOrder(result, fieldValues, order))
    }

    useEffect(() => {
        setDisplayCoin(allCoins);
    },[allCoins])

    return (
        <>
            <div className="bg-gray-600 min-h-screen flex flex-col items-center">
                <div className="flex flex-col max-w-[600px] items-center mt-20 p-6 gap-10 text-center">
                    <h2 className="text-3xl text-white">Largest Crypto Marketplace</h2>
                    <p className="text-white">
                    Welcome to the world's largest cryptocurrency marketplace. 
                    Sign up to explore more about cryptos.
                    </p>
                </div>
                <div className="m-5 p-5">
                    <form className="w-full flex flex-col md:flex-row gap-4 md:gap-6 flex-wrap justify-center items-center w-full max-w-3xl"
                        onSubmit={searchHandler}>
                        <input
                            type="search"
                            list="coinlist"
                            placeholder="Search Crypto"
                            className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            value={inputValue}
                            onChange={inputValueChange}
                        />

                        <select
                            value={fieldValues}
                            onChange={(e) => changeByField(e)}
                            className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
                            <option value="" disabled>Select a field</option>
                            <option value="Coins">Coins</option>
                            <option value="Price">Price</option>
                        </select>

                        <select
                            value={order}
                            onChange={(e) => changeByOrder(e)}
                            className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        >
                            <option value="" disabled>Select Order</option>
                            <option>Ascending</option>
                            <option>Descending</option>
                        </select>

                        <button
                            type="submit"
                            className="w-full md:w-auto bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Search
                        </button>

                        <datalist id="coinlist">
                            {allCoins.map((item, index) => (
                            <option key={index} value={item.name} />
                            ))}
                        </datalist>
                        </form>

                </div>
                <div className=" bg-gray-100 m-4 rounded-md shadow-md">
                    <table className="min-w-[600px] w-full text-sm text-left bg-white border border-gray-300">
                        <thead className="bg-gray-200 text-gray-700 uppercase">
                        <tr>
                            <th className="px-20 py-4">#</th>
                            <th className="px-20 py-4">Coins</th>
                            <th className="px-20 py-4">Price</th>
                            <th className="px-20 py-4">24H Change</th>
                            <th className="px-20 py-4">Market Cap</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300">
                        {displayCoin.length > 0 ? (
                            displayCoin.slice(0, 10).map((item, index) => (
                            <tr
                                key={index}
                                className="hover:bg-blue-100 transition"
                                onClick={() => (window.location.href = `/coins/${item.id}`)}
                            >
                                <td className="px-20 py-2">{item.market_cap_rank}</td>
                                <td className="px-20 py-2 flex items-center gap-2">
                                <img src={item.image} alt={item.name} className="w-6 h-6 rounded-full" />
                                <span className="text-gray-900">
                                    {item.name} <span className="uppercase text-gray-500">({item.symbol})</span>
                                </span>
                                </td>
                                <td className="px-20 py-2 text-green-600 font-semibold">
                                {currency.symbol} {item.current_price.toLocaleString()}
                                </td>
                                <td className={`px-20 py-2 font-medium ${item.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {item.price_change_percentage_24h.toFixed(2)}%
                                </td>
                                <td className="px-20 py-2 text-gray-800">
                                {item.market_cap.toLocaleString()}
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                            <td colSpan="5" className="px-20 py-6 text-center text-gray-500">
                                No data found
                            </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )

}

export default Home;
