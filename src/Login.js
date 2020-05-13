import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PostUser } from './api/UserAPI';

import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export function LoginForm(props){

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



function Login(){

    const [details, setDetails] = useState(null);

    const endpoint = "login";
    const response = PostUser(endpoint, details);


    if (response && response.token){
        localStorage.setItem("token", response.token);
        localStorage.setItem("email", details.email);
        window.location.reload(false);
    }

    if (localStorage.token){
        return (
            <LogoutForm/>
        )
    }

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