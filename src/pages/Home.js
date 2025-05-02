import { useContext, useEffect, useState } from "react";
import CoinContext from "../context/CoinContext";

const Home = () => {
    const { allCoins, currency } = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [fieldValues, setField] = useState("");
    const [order, setOrder] = useState("");
    const [result, setResult] = useState([]);

    const inputValueChange = (e) => {
        setInputValue(e.target.value);
        if (e.target.value === "") {
            setDisplayCoin(allCoins);
        }
    };

    const searchHandler = (e) => {
        e.preventDefault();
        const filterInputByNames = allCoins.filter((item) =>
            item.name.toLowerCase().includes(inputValue.toLowerCase())
        );

        setResult(filterInputByNames);

        const sortValues = sortValuesByOrder(filterInputByNames, fieldValues, order);
        setDisplayCoin(sortValues);
    };

    const sortValuesByOrder = (filterInputByNames, fieldValues, order) => {
        const dataSort = [...filterInputByNames];
        const fieldSort = fieldValues.toLowerCase();
        const orderSort = order.toLowerCase();

        if (orderSort === "ascending") {
            dataSort.sort((a, b) => (a[fieldSort] < b[fieldSort] ? -1 : 1));
        }
        if (orderSort === "descending") {
            dataSort.sort((a, b) => (a[fieldSort] < b[fieldSort] ? 1 : -1));
        }
        return dataSort;
    };

    const changeByField = (e) => {
        const newField = e.target.value;
        setField(newField);
        setDisplayCoin(
            result.length > 0
                ? sortValuesByOrder(result, newField, order)
                : sortValuesByOrder(allCoins, newField, order)
        );
    };

    const changeByOrder = (e) => {
        const newOrder = e.target.value;
        setOrder(newOrder);
        setDisplayCoin(
            result.length > 0
                ? sortValuesByOrder(result, fieldValues, newOrder)
                : sortValuesByOrder(allCoins, fieldValues, newOrder)
        );
    };

    useEffect(() => {
        setDisplayCoin(allCoins);
    }, [allCoins]);

    return (
        <div className="bg-gray-100 min-h-screen py-10 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Largest Crypto Marketplace</h2>
                    <p className="text-gray-600 text-lg">
                        Welcome to the world's largest cryptocurrency marketplace.
                        Sign up to explore more about cryptos.
                    </p>
                </div>

                <form
                    onSubmit={searchHandler}
                    className="w-full flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center items-center mb-8"
                >
                    <input
                        type="search"
                        list="coinlist"
                        placeholder="Search Crypto"
                        value={inputValue}
                        onChange={inputValueChange}
                        className="w-full sm:w-[200px] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
                    />

                    <select
                        value={fieldValues}
                        onChange={changeByField}
                        className="w-full sm:w-[150px] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
                    >
                        <option value="" disabled>Select field</option>
                        <option value="Coins">Coins</option>
                        <option value="Price">Price</option>
                    </select>

                    <select
                        value={order}
                        onChange={changeByOrder}
                        className="w-full sm:w-[150px] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
                    >
                        <option value="" disabled>Select order</option>
                        <option>Ascending</option>
                        <option>Descending</option>
                    </select>

                    <button
                        type="submit"
                        className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition-colors shadow-sm"
                    >
                        Search
                    </button>

                    <datalist id="coinlist">
                        {allCoins.map((item, index) => (
                            <option key={index} value={item.name} />
                        ))}
                    </datalist>
                </form>

                <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                    <table className="min-w-[600px] w-full">
                        <thead className="bg-gray-200 text-gray-700 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-3 text-left">#</th>
                                <th className="px-6 py-3 text-left">Coins</th>
                                <th className="px-6 py-3 text-left">Price</th>
                                <th className="px-6 py-3 text-left">24H Change</th>
                                <th className="px-6 py-3 text-left">Market Cap</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-700">
                            {displayCoin.length > 0 ? (
                                displayCoin.slice(0, 10).map((item, index) => (
                                    <tr
                                        key={index}
                                        onClick={() => (window.location.href = `/coins/${item.id}`)}
                                        className="hover:bg-blue-50 cursor-pointer transition"
                                    >
                                        <td className="px-6 py-3">{item.market_cap_rank}</td>
                                        <td className="px-6 py-3 flex items-center gap-3">
                                            <img src={item.image} alt={item.name} className="w-6 h-6 rounded-full" />
                                            <span>{item.name} <span className="text-gray-500 uppercase">({item.symbol})</span></span>
                                        </td>
                                        <td className="px-6 py-3 font-medium text-green-600">
                                            {currency.symbol} {item.current_price.toLocaleString()}
                                        </td>
                                        <td className={`px-6 py-3 font-medium ${item.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {item.price_change_percentage_24h.toFixed(2)}%
                                        </td>
                                        <td className="px-6 py-3">{item.market_cap.toLocaleString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-lg text-gray-500">
                                        No data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Home;
