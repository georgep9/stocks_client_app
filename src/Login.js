import React, { useState, useEffect } from 'react';

import { LoginAPI } from './api';


function LoginForm(props){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = event => {
        props.setDetails({
            'email': email,
            'password': password
        });
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Email: </label>
            <input name="email" id="email" value={email}
                onChange={(event) => setEmail(event.target.value)}/>
            <label>Password: </label>
            <input name="password" id="password" type="password"
                onChange={(event) => setPassword(event.target.value)}/>
            <button id="login-button" type="submit"><h3>Login</h3></button>
        </form>
    )

}

function LogoutForm(props){

    const handleSubmit = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
    }

    return (
        <form onSubmit={handleSubmit}>
            <h4>Welcome back, {localStorage.getItem("email")}</h4>
            <button type="submit"><h3>Logout</h3></button>
        </form>
    )

}

function Login(){

    const [details, setDetails] = useState(null);

    const response = LoginAPI(details);


    if (response && response.token){
        localStorage.setItem("token", response.token);
        localStorage.setItem("email", details.email);
    }

    if (localStorage.token){
        return (
            <div id="logout-form">
                <LogoutForm/>
            </div>
        )
    }

    return (
        <div id="login-form">
            <LoginForm setDetails={setDetails}/>
            {response && response.error && <p>{response.message}</p>}
        </div>
    )
}

export default Login;