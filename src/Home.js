import React from 'react';
import Stocks from './Stocks'

function Home() {

    return (
        <div>
            <div className="Home">
            <h1>Home</h1>
            <p>
                Welcome to the Stock Analyst portal. Click on Stocks to see the available companies, Quote
                to get the latest price information by stock symbol, or choose Price History to select a sample of
                market entries information and charting data for a particular stock. 
            </p>
            </div>
            <Stocks/>
        </div>
        
        
    );
}

export default Home;