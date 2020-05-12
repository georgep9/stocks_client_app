import {useState, useEffect} from 'react';

const API_URL = "http://131.181.190.87:3000";

function GetStocks(query){
    const [stocks, setStocks] = useState(null);

    const url = API_URL + "/stocks/" + query;

    useEffect(
        () => {
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

export function GetAllStocks(industry){

    var query = "symbols";
    industry && (query += "?industry=" + industry);
    return  GetStocks(query); 

}

export function GetParticularStock(stock){ return GetStocks(stock); }

export function GetStockHistory(fields) {

    console.log(fields);

    var stock = "";
    var from = "";
    var to = "";
    fields && (stock = fields.stock) && (from = fields.from) && (to = fields.to);

    const token = localStorage.getItem("token");

    const url = `${API_URL}/stocks/authed/${stock}?from=${from}&to=${to}`;

    const [history, setHistory] = useState(null);

    useEffect (
        () => {
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


export function PostUser(endpoint, details){

    const url = API_URL + "/user/" + endpoint;

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

