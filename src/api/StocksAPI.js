import {useState, useEffect} from 'react';

const API_URL = "http://131.181.190.87:3000";

// api fetch 
function GetStocks(query){
    
    const [stocks, setStocks] = useState(null);

    const url = API_URL + "/stocks/" + query;

    useEffect(
        () => {
            // this is for the initial loading of the quote page
            if (query === null) { return undefined }
            fetch(url)
                .then(res => res.json())
                .then(json => {
                    setStocks(json);
                })
        },
        [url, query]  
    )

    return stocks

}

// setup the industry parameter for the above fetch 
export function GetAllStocks(industry){

    var query = "symbols";
    industry && (query += "?industry=" + industry);
    return  GetStocks(query); 

}

// just fetch for the symbol
export function GetParticularStock(stock){ return GetStocks(stock); }


// provided the fields, fetch for the auth api endpoint
export function GetStockHistory(fields) {

    // set parameters
    var stock = "";
    var from = "";
    var to = "";
    fields && (stock = fields.stock) && (from = fields.from) && (to = fields.to);

    const token = localStorage.getItem("token"); // token

    const url = `${API_URL}/stocks/authed/${stock}?from=${from}&to=${to}`;

    // hook for api results
    const [history, setHistory] = useState(null);

    useEffect (
        () => {
            // this is for the initial loading of the price history page
            if (fields === null) { return undefined }
            fetch(url, {
                method: "GET",
                headers: { 
                    accept: "application/json", 
                    "Content-Type": "application/json" ,
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => res.json())
            .then((json) => {
                setHistory(json);
            })
        },
        [url, token, fields]
    )

    return history

}