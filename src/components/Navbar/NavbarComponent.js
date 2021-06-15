import React, { useState } from 'react';
import { Button, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import { NavLink } from 'react-router-dom'

const NavbarComponent = () => {
    return (
        <Navbar bg="light" variant="light" style={{justifyContent: 'center'}}>
            <Navbar.Brand href="#home">Bookshop</Navbar.Brand>
            <Nav className="mr-auto">
                <NavLink to='/magazines' style={{marginRight: 10, textDecoration: 'none', color: 'gray'}}  activeStyle={{
                    fontWeight: "bold",
                    color: "red",
                    opacity: 1
                }}>Magazines</NavLink>
                <NavLink to='/books' style={{textDecoration: 'none', color: 'gray'}} activeStyle={{
                    fontWeight: "bold",
                    color: "red",
                    opacity: 1
                }}>Books</NavLink>
            </Nav>
        </Navbar>
    );
};

export default NavbarComponent;
