import React, { useState } from 'react';
import { GetParticularStock } from './api';
import { StockHistoryTable } from './tables';

import {Form, Button, FormGroup} from 'react-bootstrap';

function Quote() {

  const [input, setInput] = useState("");
  const [stock, setStock] = useState(null);
  var entry = GetParticularStock(stock);


  console.log(entry);

  const handleSubmit = (event) => {
    setStock(input);
    event.preventDefault();
  }

  return (

    <div className="Quote">
      <h1>Quote</h1>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Form.Label>Enter a stock name to view its latest entry:</Form.Label>
          <Form.Control onChange={(event) => setInput(event.target.value)}/>
        </FormGroup>
        <Button type='submit' variant="secondary">Search</Button>
      </Form>

      {entry && entry.error && <p id="error">{entry.message}</p>}

      {entry && !entry.error && <h2>{entry.symbol} - {entry.name}</h2>}
      <StockHistoryTable entries={[entry]} />
      
    </div>
  );
}

export default Quote;