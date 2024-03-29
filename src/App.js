import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button } from 'react-bootstrap';

import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Home';
import Stocks from './Stocks';
import Quote from './Quote';
import PriceHistory from './PriceHistory';
import Login from './Login';
import Register from './Register';


function App() {


  
  // routing for pages
  const routes = [
    { path: '/',
      exact: true,
      main: () => <Home/>
    },
    { path: '/Stocks',
      main: () => <Stocks/>
    },
    { path: '/Quote',
      main: () => <Quote/>
    },
    { path: '/PriceHistory',
      main: () => <PriceHistory/>
    },
    {
      path: '/Register',
      main: () => <Register/>
    }
  ]

  // side menu and main section of app for the pages
  return (
    <div className="App">

      
      <Router>
        
        <div className="sideMenu">
          <div id="routes">
            <Link to="/" style={{textDecoration: "none"}}>
              <Button variant="outline-light">Home</Button></Link>
            <Link to="/Stocks" style={{textDecoration: "none"}}>
              <Button variant="outline-light">Stocks</Button></Link>
            <Link to="/Quote" style={{textDecoration: "none"}}>
              <Button variant="outline-light">Quote</Button></Link>
            <Link to="/PriceHistory" style={{textDecoration: "none"}}>
              <Button variant="outline-light">Price History</Button></Link>
          </div>
          <div id="login">
            <Login />
          </div>
        </div>

        <div className="main">
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </Switch>
        </div>
        
      </Router>
    </div>
  );
}

export default App;
