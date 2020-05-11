import React, { useState, useEffect } from 'react';
import './App.css';
import { GetAllStocks } from './api';
import { StocksTable } from './tables';




function Stocks() {

    const [industry, setIndustry] = useState("");

    const stocks = GetAllStocks(industry);

    
    return (

        <div className="Stocks">
            <h1>Stocks</h1>
            <label>Industry: </label>
            <select value={industry} onChange={(event) => { setIndustry(event.target.value); }}>
            <option value="">All</option>
            <option value="Health Care">Health Care</option>
            <option value="Industrials">Industrials</option>
            <option value="Consumer Discretionary">Consumer Discretionary</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Consumer Staples">Consumer Staples</option>
            <option value="Utilities">Utilities</option>
            <option value="Financials">Financials</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Materials">Materials</option>
            <option value="Energy">Energy</option>
            <option value="Telecommunication Services">Telecommunication Services</option>
            </select>

            <StocksTable stocks={stocks}/>
            

        </div>
    );
}

export default Stocks;