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
        <Image className="image" src="http://farm8.staticflickr.com//7811//33638377048_c0fd555b57_o.png" rounded />
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
