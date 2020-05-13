import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PostUser } from './api/UserAPI';

import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


// login form component for login section
export function LoginForm(props){

    // hooks for updated input fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // on form submission, set the 'stock' hook which then calls the API
    const handleSubmit = event => {
        props.setDetails({
            'email': email,
            'password': password
        });
        event.preventDefault(); // dont refresh
    }

    // render form
    return (

        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control placeholder="Email" 
                    onChange={(event) => setEmail(event.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" 
                    onChange={(event) => setPassword(event.target.value)}/>
            </Form.Group>
            <Button variant="secondary" type="submit">
                Login
            </Button>
        </Form>
    )
}

// render register button if token does not exist
function RegisterForm(){

    if (localStorage.token){
        return (<div></div>);
    }

    return (
        <div id="register-form">
            <p>Don't have an account?</p>
            <Link to="/Register" style={{textDecoration: "none"}}>
                <Button variant="secondary" type="submit">
                    Register
                </Button>
            </Link>
        </div>
    )
}

// render logout button which removes token upon submit
function LogoutForm(){

    const handleSubmit = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
    }

    return (
        <div id="logout-form">
            <form onSubmit={handleSubmit}>
                <h4>Welcome back, {localStorage.getItem("email")}</h4>
                <Button type="submit" variant="secondary">Logout</Button>
            </form>
        </div>
    )

}

// Login section
function Login(){

    // details for api parameter
    const [details, setDetails] = useState(null);

    const endpoint = "login";
    const response = PostUser(endpoint, details); // api

    // if api provides token, store token, refresh page
    if (response && response.token){
        localStorage.setItem("token", response.token);
        localStorage.setItem("email", details.email);
        window.location.reload(false);
    }

    // if token exists, provide logout button
    if (localStorage.token){
        return (
            <LogoutForm/>
        )
    }

    // render the above components
    return (
        <div>
            <div id="login-form">
                <LoginForm setDetails={setDetails}/>
                {response && response.error && <p id="error">{response.message}</p>}
            </div>
        <RegisterForm />
        </div>
    )
}

export default Login;