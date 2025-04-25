import React from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { CoinContextProvider } from "../context/CoinContext";
import Home from "../pages/Home";
import Navbar from "./Navbar";


const App = () =>{
    return (
        <>
            <div>
            
            <CoinContextProvider>
            <Navbar/>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    
                </Routes>
            </Router>
            </CoinContextProvider>
            </div>
        </>
            
      
    )
}

export default App;