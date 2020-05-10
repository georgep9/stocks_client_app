import {useState, useEffect} from 'react';

const API_URL = "http://131.181.190.87:3000";

function FetchStocks(query){

    const url = API_URL + "/stocks/" + query;

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


export function LoginAPI(details){

    const url = API_URL + "/user/login";

    var email = "";
    var password = "";
    details && (email = details.email) && (password = details.password);

    const [response, setResponse] = useState(null);

    useEffect (
        () => {
            if (details === null) { return undefined; }
            fetch(url, {
                method: "POST",
                headers: { accept: "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({ 'email': email, 'password': password})
            })
            .then((res) => res.json())
            .then((json) => {
                setResponse(json);
            })
        },
        [url, email, password, details]
    )

    return response;
    
}

