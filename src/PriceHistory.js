import React, { useState } from 'react';
import Login from './Login';
import { GetStockHistory } from './api';
import { StockHistoryTable } from './tables';
import { Button, Form, FormGroup } from 'react-bootstrap';


function History() {


  const [stock, setStock] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [fields, setFields] = useState(null);

  const history = GetStockHistory(fields);
  
  const handleSubmit = (event) => {
    setFields(
      {
        'stock': stock,
        'from': from,
        'to': to
      }
    )
    event.preventDefault();
  }

  console.log(history)

  return (
    <div className="Price_History">
      <h1>Price History</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Form.Label>Stock: </Form.Label>
          <Form.Control
            onChange={(event) => {setStock(event.target.value)}}/>
        </FormGroup>
        
        <FormGroup>
        <Form.Label>From: </Form.Label>
          <Form.Control type="date" 
            onChange={(event) => {setFrom(event.target.value)}}/>
        </FormGroup>

        <FormGroup>
        <Form.Label>To: </Form.Label>
          <Form.Control type="date" 
            onChange={(event) => {setTo(event.target.value)}}/>
        </FormGroup>
        
        <Button type='submit' variant="secondary">View</Button>
      </Form>
      {history && !history.error && <h2>{history[0].symbol} - {history[0].name}</h2>}
      <StockHistoryTable entries={history} /> 
    </div>
  );

}

function PriceHistory() {

  if (!localStorage.token){
    return (
      <div className="Price_History">
        <h1>Price History</h1>
        <h2>Please login to view price history.</h2>
        <Login/>
      </div>
    )
  }

  return (
    <History />
  );
}

export default PriceHistory;