import React from 'react';
import { Jumbotron, Button, Container } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import styles from "../css/home.module.css";
import { connect } from "react-redux";


function Home({isAuthenticated }) {

    if (isAuthenticated) {
        return <Redirect to="/main" />
    }
    return (
        <div className={styles.home_page}>
            <Container className={styles.container}>
                <Jumbotron className={` p-3 mb-5 mt-4 bg-white ${styles.jumbo}`}>
                    <h3>Welcome to the ConnectMe!<span className={`${styles.fontSize}`}>&#128540;</span></h3>
                    <p>
                        If you already have an account, go ahead and <Link to="/login">log in</Link>.
                        If you are new to ConnectMe,
                        get started by creating an <Link to="/signup">account</Link>.
                    </p>
                    <p>
                        This is an application created as a demo website. It can be used 
                        by buyers and sellers which takes the marketplace to a digital world.<br />
                        The developed version would be upload soon.
                    </p>
                    <p>
                        <Button variant="primary">
                            <a href="https://www.cypherspot.dev/#contact"
                            rel="noreferrer" target="_blank"
                                className="nav-link text-white"
                            >Contact Us</a>
                        </Button>
                    </p>
                </Jumbotron>
            </Container>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { })(Home);