import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';

import Home from './Home';
import Stocks from './Stocks';
import Quote from './Quote';
import PriceHistory from './PriceHistory';


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
  }
]


function App() {
  return (
    <div className="App">
      <Router>

        <div className="sideMenu">
          <Link to="/" style={{textDecoration: "none"}}><h2>Home</h2></Link>
          <Link to="/Stocks" style={{textDecoration: "none"}}><h2>Stocks</h2></Link>
          <Link to="/Quote" style={{textDecoration: "none"}}><h2>Quote</h2></Link>
          <Link to="/PriceHistory" style={{textDecoration: "none"}}><h2>Price History</h2></Link>
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
