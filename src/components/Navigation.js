import React from 'react';
import { Navbar, Form, Button, Nav } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux"
import { logout } from  "../actions/auth"
import styles from "../css/nav.module.css"
import { NavLink } from "react-router-dom"

function Navigation({ logout, user}) {

    const checkLogout = () => {
        logout()
        return <Redirect to="/" />
    }

    return (
        <div>
            <Navbar  className={`p-1  bg-transparent ${styles.navbar}`} expand="lg">
                {user ?
                    <Navbar.Brand href="/main" >
                        <span className={`fst-italic fs-3  text-muted ${styles.brand}`}>ConnectMe</span>
                    </Navbar.Brand>
                 : 
                    <Navbar.Brand href="/" >
                        <span className={`fst-italic fs-3  text-muted ${styles.brand}`}>ConnectMe</span>
                    </Navbar.Brand>
                 }
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="">
                    {user ? 
                        <>
                            <Nav className={`justify-content-center ${styles.nav}`} activeKey="/main/dashboard">
                                <Nav.Item>
                                    <NavLink
                                    exact to="/main"
                                    className={styles.darktext}
                                    activeStyle={{
                                        color: "black",
                                    }}
                                    >
                                    Market
                                    </NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink
                                    exact to="/main/profile"
                                    className={styles.darktext}
                                    activeStyle={{
                                        color: "black",
                                    }}
                                    >
                                    Profile
                                    </NavLink>
                                </Nav.Item>
                            </Nav>
                            <Form className="ms-auto" inline>
                                <Link to="/">
                                    <Button variant="outline-success"
                                    onClick={checkLogout}
                                    className="mx-2">Sign Out</Button>
                                </Link> 
                            </Form>
                        </>
                        :
                        <Form className="ms-auto" inline>
                            <Link to="/login">
                                <Button variant="outline-success" className="mx-1">Sign In</Button>
                            </Link>
                            <Link to="/signup">
                                <Button variant="primary" className="mx-1">Sign Up</Button>
                            </Link>
                        </Form>
                    }
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps, { logout })(Navigation);