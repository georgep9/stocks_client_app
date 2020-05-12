import React, { useState } from 'react';
import { PostUser } from './api';

import {Form, Button} from 'react-bootstrap';



function Register(){

    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [details, setDetails] = useState(null);
    const endpoint = "register";
    const response = PostUser(endpoint, details);

    const handleSubmit = (event) => {
        setDetails(
            {
                'email': email,
                'password': password
            }
        )
        event.preventDefault();
    }

    return (
        <div className="register">
            <h1>Create Account</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control onChange={(event) => setEmail(event.target.value)}/>
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type='password' 
                        onChange={(event) => setPassword(event.target.value)}/>
                </Form.Group>
                <Button type='submit' variant="secondary">Register</Button>
            </Form>
            {response && response.error && <p id="error">{response.message}</p>}
            {response && response.success && <p id="success">{response.message}</p>}

        </div>
    )
}

export default Register;