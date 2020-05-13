import React, { useState } from 'react';
import Login from './Login';
import { GetStockHistory } from './api/StocksAPI';
import { StockHistoryTable } from './components/tables';
import { Button, Form } from 'react-bootstrap';

import { Line } from 'react-chartjs-2';

/*
Price History charting graph
*/
function HistoryGraph (props) {

  // convert the API date form to basic calender form
  function getCalenderDate(entry) {
    const date = new Date(entry.timestamp);
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate()+1;
    return (
      `${year}/${month}/${day}`
    )
  }

  // set the variables for graph data conditionally
  var graphLabels = [];
  var graphData = [];
  var showGraph = false;
  if (props.entries && !props.entries.error){
      graphLabels = props.entries.map(getCalenderDate).reverse();
      graphData = props.entries.map(entry => (entry.close)).reverse();
      showGraph = true;
  }

  // set the graph data
  const data = {
    labels: graphLabels,
    datasets: [
      {
        label: 'Closing Price',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: graphData
      }
    ]
  };

  // graphing options
  const options = {
    legend: { 
      display: false 
    }
  }

  // render the graph
  return ( 
    <div id="history-graph">
      {showGraph && <Line data={data} options={options}/>}
    </div>
  )
      
}

/*
Price History
*/
function PriceHistory() {

  
  // hooks for updated input fields
  const [stock, setStock] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fields, setFields] = useState(null); // hook for API parameter

  const history = GetStockHistory(fields); // call api

  // return a render of the login form if token doesn't exist
  if (!localStorage.token){
    return (
      <div className="Price_History">
        <h1>Price History</h1>
        <h2>Please login to view price history.</h2>
        <Login/>
      </div>
    )
  }
  
  // on form submission,  set the 'fields' hook which then calls the API
  const handleSubmit = (event) => {
    setFields(
      {
        'stock': stock,
        'from': from,
        'to': to
      }
    )
    event.preventDefault(); // dont refresh
  }

  // render the input form, conditional error message, table and chart
  return (
    <div className="Price_History">
      <h1>Price History</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Stock: </Form.Label>
          <Form.Control
            onChange={(event) => {setStock(event.target.value)}}/>
        </Form.Group>
        
        <Form.Group>
        <Form.Label>From: </Form.Label>
          <Form.Control type="date" 
            onChange={(event) => {setFrom(event.target.value)}}/>
        </Form.Group>

        <Form.Group>
        <Form.Label>To: </Form.Label>
          <Form.Control type="date" 
            onChange={(event) => {setTo(event.target.value)}}/>
        </Form.Group>
        
        <Button type='submit' variant="secondary">View</Button>
      </Form>
      {history && history.error && <p id="error">{history.message}</p>}
      {history && !history.error && <h2>{history[0].symbol} - {history[0].name}</h2>}
      <StockHistoryTable entries={history} /> 
      <HistoryGraph entries={history}/>
    </div>
  );
}

export default PriceHistory;