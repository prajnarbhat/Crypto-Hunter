import { useContext } from "react";
import CoinContext from "../context/CoinContext";
import Loader from "../pages/Loader";
import LineChartData from "./LineChartData";

const RenderCoinDetails = ({ coinData, historyCoinData }) => {

    const { currency } = useContext(CoinContext);

    console.log("History data:", historyCoinData)

    return (
      <div className="bg-gray-600 min-h-screen flex flex-col items-center">
        <div className=" bg-gray-100 m-4 rounded-lg shadow-md"> 
          <div className="w-full text-sm text-left rtl:text-right bg-white border border-gray-300 rounded-lg p-8">
            
            {coinData ? (
              <div className="p-5">
                <div className="flex flex-col items-center gap-5 m-3">
                  <img className="max-w-[150px]" src={coinData.image.large} alt={coinData.name}/>
                  <p className="text-xl font-bold">{coinData.name} ({coinData.symbol.toUpperCase()}) </p>
                </div>

                <div className="my-5">
                  <LineChartData historyData={historyCoinData}/>
                </div>

                <div className="max-w-[600px] mx-auto my-5 p-5 border rounded-md shadow-sm">
                  <ul className="flex flex-col gap-4">
                    <li className="flex justify-between items-center border-b pb-2">
                      <h3 className="font-medium text-gray-600">Crypto market rank</h3>
                      <p className="font-semibold">{coinData.market_cap_rank}</p>
                    </li>
                 
                    <li className="flex justify-between items-center border-b pb-2">
                      <h3 className="font-medium text-gray-600">Currency price</h3>
                      <p className="font-semibold">
                        {currency.symbol}
                        {coinData.market_data.current_price[currency.name].toLocaleString()}
                      </p>
                    </li>
                  
                    <li className="flex justify-between items-center border-b pb-2">
                      <h3 className="font-medium text-gray-600">24H High</h3>
                      <p className="font-semibold">
                        {currency.symbol}
                        {coinData.market_data.high_24h[currency.name].toLocaleString()}
                      </p>
                    </li>
                  
                    <li className="flex justify-between items-center border-b pb-2">
                      <h3 className="font-medium text-gray-600">24H Low</h3>
                      <p className="font-semibold">
                        {currency.symbol}
                        {coinData.market_data.low_24h[currency.name].toLocaleString()}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              
            ) : (
              <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                <Loader />
              </div>
            )}
          
          </div>
        </div>
      </div>
    );
  };

export default RenderCoinDetails;