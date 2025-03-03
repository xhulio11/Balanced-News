import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from "react-router-dom";
import React, { useState } from "react";
import '../style/navbar.css'; 
import logo from '../assets/logo.svg'; 

function Navigation() {
  var expand = "md"
  // State to track if the offcanvas is open or closed
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);
  
  return (
    <>                                  
        <Navbar expand={expand} className=" mb-3 shape">
          <Container fluid>
            <Navbar.Brand as={Link} to="/home">
              <img src={logo}
                   alt="Balanced News Logo"
                   width="60"
                   height="60"
                   className="d-inline-block align-top"
               />
            </Navbar.Brand>
            <Navbar.Brand as={Link} to="/home" className=''>
              <h1>Balanced News</h1>
            </Navbar.Brand>
            <Navbar.Toggle 
              aria-controls={`offcanvasNavbar-expand-${expand}`} 
              onClick={handleShow} 
              className='ms-auto'
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              show={showOffcanvas}
              onHide={handleClose}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3" onSelect={handleClose}>
                  <Nav.Link as={Link} to="/about" eventKey="about"> About</Nav.Link>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="secondary">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
  );
}

export default Navigation;