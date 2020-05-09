import {useState, useEffect} from 'react';

function FetchStocks(query){

    var url = "http://131.181.190.87:3000/stocks/" + query;

    console.log(url);

    return fetch(url)
        .then(res => res.json())
        .catch(e => e);

}

function useStocks(query){
    const [stocks, setStocks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(
        () => {
            
            FetchStocks(query)
                .then(stocks => {
                    setStocks(stocks);
                })
                .catch(e => {
                    setError(e);
                })
        },
        [query]  
    )

    console.log(stocks);

    return {
        stocks,
        error
    };

}

export function GetAllStocks(industry){

    var query = "symbols";
    industry && (query += "?industry=" + industry);
    return  useStocks(query); 

}

export function GetParticularStock(stock){ return useStocks(stock); }

