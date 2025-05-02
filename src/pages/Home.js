import { useContext, useEffect, useState } from "react";
import CoinContext from "../context/CoinContext";
const Home = () => {

    const { allCoins, currency} = useContext(CoinContext);
    const [ displayCoin, setDisplayCoin] = useState([])
    const [ inputValue, setInputValue] = useState("")

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
        setDisplayCoin(filterInputByNames)

        if(inputValue === "") {
            alert("Please enter a cryptocurrency name to search!")
        }
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

                    <form className="flex gap-2" onSubmit={searchHandler}>
                        <input type="search" list="coinlist" placeholder="Search Crypto"
                            className="px-4 py-2 rounded-md hover:bg-blue-300 transition-colors duration-200 text-base font-medium" value={inputValue}  onChange={inputValueChange}
                        />

                        <datalist id="coinlist">
                            {allCoins.map((item, index) => {
                                return <option key={index} value={item.name}/>
                            })}
                        </datalist>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-300 transition-colors duration-200 text-base font-medium"
                        >
                            Search
                        </button>
                    </form>
                </div>

                <div className="overflow-x-auto bg-gray-100 m-4 rounded-md shadow-md">
                    <table border="1" className="w-full text-sm text-left rtl:text-right bg-white border border-gray-300 rounded-lg p-8">
                        <thead className="bg-gray-200 text-gray-700 uppercase">
                            <tr>
                                <th scope="col" className="px-6 py-3"> # </th>
                                <th scope="col" className="px-6 py-3"> Coins </th>
                                <th scope="col" className="px-6 py-3"> Price </th>
                                <th scope="col" className="px-6 py-3"> 24H Change </th>
                                <th scope="col" className="px-6 py-3"> Market Cap </th>
                            </tr>
                        </thead>
                        <tbody className="w-100 divide-y cursor-pointer divide-gray-300">
                            {displayCoin.length > 0 ? (
                                displayCoin.slice(0,10).map((item,index) => (
                                    <tr key={index} className="hover:bg-blue-300 transition-colors duration-200 text-base font-medium"
                                    onClick={() => window.location.href = `/coins/${item.id}`}>
                                        <td className="px-6 py-3"> {item.market_cap_rank} </td>
                                        <td className="px-6 py-3"> <img src={item.image} alt="img" className="w-6 h-6 rounded-full"/>
                                            <span className="text-gray-900">{item.name} <span className="uppercase text-gray-500">({item.symbol})</span></span> </td>
                                        <td className="px-6 py-4 text-green-600 font-semibold">
                                                {currency.symbol} {item.current_price.toLocaleString()}
                                        </td>
                                        <td className={`px-6 py-4 font-medium ${
                                            item.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
                                        }`}>
                                            {item.price_change_percentage_24h.toFixed(2)}%
                                        </td>

                                        <td className="px-6 py-4 text-gray-800">
                                            {item.market_cap.toLocaleString()}
                                        </td>
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

        </>
    )

}

export default Home;
