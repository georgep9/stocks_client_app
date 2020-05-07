import React, { useEffect, useState } from 'react';
import './App.css';

function fetchStocks(){

    const url = "http://131.181.190.87:3000/stocks/symbols";

    return fetch(url)
        .then(res => res.json())
        .then(res => res.map(
            stock => ({
                name: stock.name,
                symbol: stock.symbol,
                industry: stock.industry
            })
        ));

}

function useStocks(){
    const [stocks, setStocks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(
        () => {
            
            fetchStocks()
                .then(stocks => {
                    setStocks(stocks);
                })
                .catch(e => {
                    setError(e);
                })
        },
        []  
    )

    return {
        stocks,
        error
    };
}

function Stock({name, symbol, industry}) {


    return (
        <div className="stock">
            <ul>
                <li>{name}</li>
                <li>{symbol}</li>
                <li>{industry}</li>
            </ul>
        </div>
    );
}

function Stocks() {

    const {stocks, error} = useStocks();


    return (
        <div className="Stocks">
            <h1>Stocks</h1>

            {stocks.map(stock => (
                <Stock key= {stock.name} name={stock.name} symbol={stock.symbol} industry={stock.industry}/>
            ))}

        </div>
    );
}

export default Stocks;