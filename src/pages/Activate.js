import React, { useState } from 'react';
import {  Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../actions/auth"


function Activate({ verify, match, isAuthenticated }) {
    const [verified, setVerified] = useState(false)
    const [show, setShow] = useState({display: "none"});
    const [networkError, setNetworkError] = useState({display: "none"})
    const [internalError, setInternalError] = useState({display: "none"})

    const verify_account = e => {
        const uid = match.params.uid;
        const token = match.params.token;
        const data = {
            "uid": uid,
            "token": token
        }
        verify(data).then(
            (res) => {
                console.log(res)
                if (res === 204){
                    setVerified(true)
                }else if (res === "Network Error") {
                    setNetworkError({display: "block"})
                }else if (res === "Request failed with status code 400") {
                    setShow({display: "block"})
                }else if (res === "Request failed with status code 500") {
                    setInternalError({display: "block"})
                }
            }
        )
        
    }

    const danger = (
        <div className="alert alert-danger alert-dismissible fade show" style={show} role="alert">
            <h5>User credentials incorrect!</h5>
            <p>Your username or password is incorrect. Try again.</p>
            <button type="button" onClick={() => setShow({display: "none"})} className="btn-close" ></button>
        </div>
    )
    
    const internalErr = (
        <div className="alert alert-danger alert-dismissible fade show" style={internalError} role="alert">
            <h5>Internal Server Error</h5>
            <p>
                There is a fault in the backend.<br />
                Contact Admin to fix this problem.
            </p>
            <button type="button" onClick={() => setInternalError({display: "none"})} className="btn-close" ></button>
        </div>
    );

    const netError = (
            <div className="alert alert-danger alert-dismissible fade show" style={networkError} role="alert">
                <h5>Network Error</h5>
                <p>
                    There is something wrong with the connection.<br />
                    The problem is with us not you.
                </p>
                <button type="button" onClick={() => setNetworkError({display: "none"})} className="btn-close" ></button>
            </div>
        );

    //is user Authenticated 
    //redirect them to the homepage
    if (verified){
        return <Redirect to="/" />
    }

    if (isAuthenticated) {
        return <Redirect to="/main" />
    }

    return (
        <div className="container mt-5">
            <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ marginTop: "200px"}}
            >
                {danger}
                {netError}
                {internalErr}
                <h1>Verify your Account</h1>
                <button
                    onClick={verify_account}
                    style={{ marginTop: "50px" }}
                    type="button"
                    className="btn btn-primary"
                >
                        Verify
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { verify })(Activate);