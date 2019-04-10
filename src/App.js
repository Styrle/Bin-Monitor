import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
//import logo from './logo.svg';
import './App.css';
import Status from './Status'
import Stats from './Stats'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';

//here we are telling our navigation where to reroute to using the react-router-dom module
class App extends Component {
  render() {
    return (
      <Router>
          <div>
          <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Image className="image" src="https://live.staticflickr.com/7908/33686652828_97f866d53c_o.png" rounded />
            <Nav  className="mr-auto">
            <nav>
            <ul className="navbar-nav mr-auto">
              <li><Link to={'/Status'} className="nav-link">Status</Link></li>
              <li><Link to={'/Stats'} className="nav-link">Stats</Link></li>
            </ul>
            </nav>
            </Nav>
          </Navbar>
            <hr />
            <Switch>
                <Route path='/Status' component={Status} />
                <Route path='/Stats' component={Stats} />
            </Switch>
          </div>
        </Router>

    );
  }
}



export default App;
