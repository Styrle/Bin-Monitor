import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';

import './Navigation.css';


//here we have a UI Component which gives us our navigation, it will display the two Components called for status and stats
class Navigation extends Component {
    render() {
      return (
        <div className="Navigation">
        <Navbar >
        <Image className="image" src="https://live.staticflickr.com/7908/33686652828_97f866d53c_o.png" rounded />
          <Nav  className="mr-auto">
          <div className="text-right">  <Nav.Link href="status">Status</Nav.Link> </div>
            <Nav.Link href="stats">Stats</Nav.Link>
          </Nav>
        </Navbar>
        </div>
      );
    }
}

export default Navigation;
