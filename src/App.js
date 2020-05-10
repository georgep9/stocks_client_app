import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';

import Home from './Home';
import Stocks from './Stocks';
import Quote from './Quote';
import PriceHistory from './PriceHistory';
import Login from './Login';




function App() {

  const [login, setLogin] = useState("Login");

  const routes = [
    { path: '/',
      exact: true,
      main: () => <Stocks/>
    },
    { path: '/Stocks',
      main: () => <Stocks/>
    },
    { path: '/Quote',
      main: () => <Quote/>
    },
    { path: '/PriceHistory',
      main: () => <PriceHistory/>
    }
  ]


  return (
    <div className="App">
      <Router>

        <div className="sideMenu">
          <div id="routes">
            <Link to="/Stocks" style={{textDecoration: "none"}}><h2 id="stocks">Stocks</h2></Link>
            <Link to="/Quote" style={{textDecoration: "none"}}><h2 id="quote">Quote</h2></Link>
            <Link to="/PriceHistory" style={{textDecoration: "none"}}><h2 id="priceHistory">Price History</h2></Link>
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
