import { useContext } from "react";
import { Link } from "react-router-dom";
import CoinContext from "../context/CoinContext";
import logo from "../images/logo.png";

const Navbar = () => {

    const {setCurrency} = useContext(CoinContext);

    console.log("Cuurency is:", setCurrency)


    // here event is the value we select from 3 option that is usd,eur,inr
    const currencyHandler = (event) => {

        switch(event.target.value) {

            case "usd" : {
                setCurrency({
                    name:"usd",symbol:"$"
                })
                break;
            }
            case "eur" : {
                setCurrency({
                    name:"eur",symbol:"€"
                })
                break;
            }
            case "inr" : {
                setCurrency({
                    name:"inr",symbol:"₹"
                })
                break;
            }
            default : {
                setCurrency({
                    name:"usd",symbol:"$"
                })
                break;
            }
        }
    }
    return (
        <>
            <nav className="bg-gray-700 text-white shadow-md">
                <div className="container mx-auto flex items-center justify-between px-6 py-3 ml-20">
                    <Link to="/" className="flex items-center space-x-3">
                        <img src={logo} alt="logo" className="h-10 w-10 rounded-full" />
                        <h3 className="text-xl font-bold hover:text-blue-300 transition-colors duration-200 text-base font-medium"> Crypto Hunter</h3> 
                     
                    </Link>
                    <div className="flex space-x-6 mr-20"> 
                    <ul className="p-2">
                        <li>
                        <Link to="/"
                        className="hover:text-blue-300 transition-colors duration-200 text-base font-medium">
                        Home
                        </Link>
                        </li>
                    </ul>
                    <select className="text-black cursor-pointer p-2 hover:bg-blue-300 transition-colors duration-200 text-base font-medium rounded-md" onChange={currencyHandler}>
                        <option value="usd"> USD </option>
                        <option value="inr"> INR </option>
                        <option value="eur"> EUR </option>
                    </select>
                    </div> 
                </div>
            </nav>
        </>
    )
}

export default Navbar;