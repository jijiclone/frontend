import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../actions/auth"
import { useForm } from "react-hook-form";
import styles from "../css/auth.module.css";


function ResetPasswordConfirm({ match, reset_password_confirm, isAuthenticated }) {
    const [requestSent, setRequestSent] = useState(false);
    const { register, handleSubmit} = useForm();
    const [show, setShow] = useState({display: "none"});
    const [networkError, setNetworkError] = useState({display: "none"})
    const [internalError, setInternalError] = useState({display: "none"})


    const onSubmit = async (data) => {

        const uid = match.params.uid;
        const token = match.params.token;

        const datas = data;

        datas["uid"] = uid;
        datas["token"] = token;

        reset_password_confirm(datas).then(
            (res) => {
                //checkRegistration
                console.log(res)
                if (res === 204) {
                    setRequestSent({display: "block"})
                }else if (res === "Request failed with status code 400") {
                    setShow({display: "block"})
                }else if (res === "Network Error") {
                    setNetworkError({display: "block"})
                }else if (res === "Request failed with status code 500") {
                    setInternalError({display: "block"})
                }else {
                    setShow({display: "block"})
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
    if (requestSent) {
        return <Redirect to="/" />
    }

    if (isAuthenticated) {
        return <Redirect to="/main" />
    }

    return (
        <div className={`container mt-5 ${styles.wrapper}`}>
            {danger}
            {netError}
            {internalErr}
            <form onSubmit={handleSubmit(onSubmit)} className={`p-3 mb-0 mt-4 bg-transparent ${styles.form_div}`}>
                <h1 className="mb-4">Type New Password</h1>
                <div className="form-group mb-4">
                <label className={`${styles.f_label}`}>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="New Password"
                        {...register("new_password")}
                        minLength="6"
                        required
                    />
                </div>
                <div className="form-group mb-4">
                    <label className={`${styles.f_label}`}>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm New Password"
                        {...register("re_new_password")}
                        minLength="6"
                        required
                    />
                </div>
                <button className="btn btn-primary" type="submit">Reset Password</button>
            </form>

        </div>
    )
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { reset_password_confirm })(ResetPasswordConfirm);