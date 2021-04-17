import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { connect } from "react-redux";
import { signup } from "../actions/auth";
import validator from "validator";
import { Link, Redirect } from 'react-router-dom';
import styles from "../css/auth.module.css";


function Signup({ signup, isAuthenticated }) {
    const { register, formState: { errors }, getValues, handleSubmit } = useForm();
    const [show, setShow] = useState({display: "none"});
    const [suc,  setSuc] = useState({display: "none"});
    const [userExist, setUserExist] = useState({display: "none"});
    const [networkError, setNetworkError] = useState({display: "none"})
    const [internalError, setInternalError] = useState({display: "none"})

    const red = {
        color: "red"
    }


    const onSubmit = async (data) => {
        signup(data).then(
            (res) => {
                //checkRegistration
                if (res === "Created") {
                    setSuc({display: "block"})
                    setShow({display: "none"})
                    setUserExist({display: "none"})
                }else if (res === "Request failed with status code 400") {
                    setShow({display: "none"})
                    setSuc({display: "none"})
                    setUserExist({display: "block"})
                }else if (res === "Network Error") {
                    setNetworkError({display: "block"})
                }else if (res === "Request failed with status code 500") {
                    setInternalError({display: "block"})
                }else {
                    setShow({display: "block"})
                    setSuc({display: "none"})
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

    const success = (
            <div className="alert alert-success alert-dismissible fade show" style={suc} role="alert">
                <h5>An Email has been sent to you!</h5>
                <p>
                    Check your mail to activate your account.
                </p>
                <button type="button" onClick={() => setSuc({display: "none"})} className="btn-close" ></button>
            </div>
        );
      
      const isUser = (
            <div className="alert alert-danger alert-dismissible fade show" style={userExist} role="alert">
                <h5>User credentials incorrect!</h5>
                <p>
                    The email already exists. Try another one.
                </p>
                <button type="button" onClick={() => setUserExist({display: "none"})} className="btn-close" ></button>
            </div>
        );

      if (isAuthenticated) {
        return <Redirect to="/main" />
    }

    return (
        <div className={`${styles.wrapper}`}>
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)} className={`p-3 mb-0 mt-4 bg-transparent ${styles.form_div}`}>
                    <div className=" pb-5">
                        <h3 className="mb-4">Sign Up</h3>
                        {danger}
                        {success}
                        {isUser}
                        {netError}
                        {internalErr}
                        <Form.Row className="row">
                            <Form.Group  controlId="formBasicFirstName">
                                <Form.Label className={`${styles.f_label}`}>First Name</Form.Label>
                                <Form.Control type="text" {...register("first_name",{
                                    required: "This field is required",
                                    minLength: {
                                        value: 4,
                                        message: 'Minimum of 4 character length' 
                                    }
                                })} className="mb-4" placeholder="Enter your first name" />
                                <span style={red}> {errors.first_name?.message} </span>
                            </Form.Group>

                            <Form.Group controlId="formBasicLastName">
                                <Form.Label className={`${styles.f_label}`}>Last Name</Form.Label>
                                <Form.Control type="text" {...register('last_name',{
                                    required: "This field is required",
                                    minLength: {
                                        value: 4,
                                        message: 'Minimum of 4 character length' 
                                    }
                                })}  className="mb-4" placeholder="Enter your surname" />
                                <span style={red}> {errors.last_name?.message} </span>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row className="row">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className={`${styles.f_label}`}>Email address</Form.Label>
                                <Form.Control type="email" {...register("email",{
                                    required: "This field is required",
                                    validate: {
                                        emailVal : (value) => validator.isEmail
                                    },
                                    minLength: {
                                        value: 8,
                                        message: 'Minimum of 8 character length' 
                                    }
                                })} className="mb-4" placeholder="Enter your email" />
                                <span style={red}> {errors.email?.message} </span>
                                {errors.email?.type === "emailVal" && (
                                <span style={red}>Enter a valid email address.</span>
                                )}
                            </Form.Group>

                            <Form.Group controlId="formBasicName">
                                <Form.Label className={`${styles.f_label}`}>State</Form.Label>
                                <Form.Control type="text" {...register('state',{
                                    required: "This field is required",
                                    minLength: {
                                        value: 3,
                                        message: 'Minimum of 3 character length' 
                                    }
                                })}  className="mb-4" placeholder="Where are selling from" />
                                <span style={red}> {errors.state?.message} </span>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row className="row">
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label className={`${styles.f_label}`}>Username</Form.Label>
                                <Form.Control type="text" {...register('username',{
                                    required: "This field is required",
                                    minLength: {
                                        value: 6,
                                        message: 'Minimum of 6 character length' 
                                    }
                                })}  className="mb-4" placeholder="What's your nickname" />
                                <span style={red}> {errors.username?.message} </span>
                            </Form.Group>
                            <Form.Group controlId="formGridState">
                                <div className="mb-3">
                                    <label htmlFor="formFile" className={`${styles.f_label}`}>Set Profile Picture</label>
                                    <input className="form-control" type="file"  
                                    {...register('profile_pic',{
                                        required: "This field is required"
                                    }
                                    )} id="formFile" />
                                </div>
                                <span style={red}> {errors.profile_pic?.message} </span>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row className="row">
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label className={`${styles.f_label}`}>Password</Form.Label>
                                <Form.Control type="password" {...register("password",{
                                    required: "This field is required",
                                    minLength: {
                                        value: 8,
                                        message: 'Minimum of 8 character length' 
                                    }
                                })} className="mb-4" placeholder="Password" />
                                <span style={red}> {errors.password?.message} </span>
                            </Form.Group>

                            <Form.Group controlId="formBasicConfirmPassword">
                                <Form.Label className={`${styles.f_label}`}>Confirm Password</Form.Label>
                                <Form.Control type="password" {...register("re_password",{
                                    required: "This field is required",
                                    validate : {
                                        checkMatch: (value) => 
                                        value === getValues("password") || "Password do not match",
                                    },
                                    minLength: {
                                        value: 8,
                                        message: 'Minimum of 8 character length' 
                                    }
                                    
                                })} className="mb-4" placeholder="Confirm Password" />
                            <span style={red}> {errors.re_password?.message} </span>
                            </Form.Group>
                        </Form.Row>

                        <Button variant="primary" className="mt-3" type="submit">
                            Register
                        </Button>
                    </div>
                    <div>
                        <p className="mt-2">
                            Already have an account? <Link to="/login">Sign In</Link>
                        </p>
                    </div>
                </Form>
                
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})


export default connect(mapStateToProps, { signup })(Signup);