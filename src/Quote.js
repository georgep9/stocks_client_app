import React, { useState } from 'react';
import { GetParticularStock } from './api';

import Login from "./Login"


function Stock({entry}){

  console.log(entry.symbol);

  return (
    <div>
      <p>{entry.timestamp}</p>
      <p>{entry.symbol}</p>
      <p>{entry.name}</p>
      <p>{entry.industry}</p>
      <p>{entry.open}</p>
      <p>{entry.high}</p>
      <p>{entry.low}</p>
      <p>{entry.close}</p>
      <p>{entry.volumes}</p>
    </div>
  )
}


function Quote() {

  const [stock, setStock] = useState("");
  const {stocks} = GetParticularStock(stock);

  console.log(stock);

  return (

    <div className="Quote">
      <h1>Quote</h1>

      <h2>Enter a stock name to view its latest entry.</h2>

        <label>
          <input type="text" id="input"/>
        </label>
        <button onClick={() => setStock(document.getElementById("input").value)}>Search</button>

      <Stock entry={stocks} />

      
    </div>
  );
}

export default Quote;