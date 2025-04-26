import React from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { CoinContextProvider } from "../context/CoinContext";
import Coins from "../pages/Coins";
import Home from "../pages/Home";
import Navbar from "./Navbar";


const App = () =>{
    return (
        <>
            <div>
            
            <CoinContextProvider>
            <Router  basename="/">
                <Navbar/>
                <Routes>
                    
                    <Route path="/" element={<Home/>}/>
                    <Route path="/coins/:coinId" element={<Coins/>}/>
                    
                </Routes>
            </Router>
            </CoinContextProvider>
            </div>
        </>
            
      
    )
}

export default App;