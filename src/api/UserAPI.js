import {useState, useEffect} from 'react';

const API_URL = "http://131.181.190.87:3000";

// endpoint: login or register     details: respective parameters
export function PostUser(endpoint, details){

    const url = API_URL + "/user/" + endpoint;

    var email = "";
    var password = "";
    details && (email = details.email) && (password = details.password);

    const [response, setResponse] = useState(null);

    useEffect (
        () => {
            if (details === null) { return undefined; } // initial loading of login section
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