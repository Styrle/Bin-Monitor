import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './Navigation.css';



class Navigation extends Component {
    render() {
      return (
        <div className="Navigation">
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="home">Navbar</Navbar.Brand>
          <Nav  className="mr-auto">
            <Nav.Link href="status">Status</Nav.Link>
            <Nav.Link href="stats">Stats</Nav.Link>
          </Nav>
        </Navbar>
        </div>
      );
    }
}

export default Navigation;
