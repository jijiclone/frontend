import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import { update_user, update_picture } from "../actions/auth"
import { useForm } from "react-hook-form";
import { Media } from 'react-bootstrap';
import { create_item, get_my_item } from "../services/item.services"
import styles from "../css/profile.module.css";


function Profile( { update_user, update_picture, create_item, access, get_my_item, currentUser }) {
    const [hover, setHover] = useState("100%")
    const [items, setItems] = useState([])
    const { register, formState: { errors }, handleSubmit } = useForm();
    const {
        register: register2,
        handleSubmit: handleSubmit2
    } = useForm();
    const {
        register: register3,
        handleSubmit: handleSubmit3
    } = useForm();
   
    
    const edit = {
        color: "#0275d8",
        padding: "1rem"
    }

    const red = {
        color: "red"
    }

    const onHoverCam = () => {
        setHover("150%")
    }

    const onHover = () => {
        setHover("100%")
    }


    const onSubmit = async (data) => {
        alert("submitting")
        update_user(data).then(
            (res) => {
                if (res === 200){
                    alert("Profile updated successfully")
                }else {
                    alert("something went wrong")
                }
                window.location.reload()
            }
        )
    }

    const onSubmitPic = async (data) => {
        alert("submitting")
        update_picture(data).then(
            (res) => {
                if (res === 200){
                    alert("Profile updated successfully")
                }else {
                    alert("something went wrong")
                }
                window.location.reload()
            }
        )
    }

    const onSubmitItem = async (data) => {
        alert("Posting...")
        create_item(data).then(
            (res) => {
                if (res === 201){
                    alert("Item Posted updated successfully")
                }else {
                    alert("something went wrong")
                }
                window.location.reload()
            }
        )
    }

    useEffect(() => {
        get_my_item().then(
            (res) => {
                setItems(res)
            }
        ).catch(error =>{
            console.error('Error:', error);
            return <Redirect to="/" />
        })

    }, [get_my_item])

    if(!access) {
        return <Redirect to="/" />
    }

    return (
        <div className={`${styles.wrapper}`}>
            <main className={`container`}>
                <div className="mt-3 ">
                    <div className={`row ${styles.div_row}`}>
                        <div className={`${styles.col_10}`}>
                            <Media className="row">
                                <div className={` ${styles.col_imag}`}>
                                    <div className="position-relative bg-dark" >
                                        <div>
                                            <img className={`${styles.col_img}`}
                                                src={currentUser.profile_pic}
                                                alt="Avatar"
                                            />
                                        </div>
                                        <div className="position-absolute top-100 start-100 translate-middle">
                                            <i className="fa fa-camera text-dark" style={{fontSize: hover}}
                                            data-bs-toggle="modal" data-bs-target="#profile_picture" 
                                            onMouseOver={onHoverCam} onMouseLeave={onHover}></i>
                                        </div>

                                    </div>
                                </div>
                                <Media.Body className={` ${styles.col_text}`}>
                                    <h5 className="text-capitalize">{currentUser.first_name} {currentUser.last_name}<i className="fas fa-pencil-alt"
                                    data-bs-toggle="modal" data-bs-target="#update_profile"  style={edit}></i></h5>
                                    <p className="fst-italic word-wrap">{currentUser.email}</p>
                                    <p className="text-wrap">
                                        {currentUser.state}
                                    </p>
                                </Media.Body>
                            </Media>
                        </div>
                        <div className={`${styles.col_2}`}>
                            <div>
                                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#add_item">
                                    Post Ad <span className="font-weight-bold h-5">+</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* modal forms begins */}
                    <div className="modal fade" id="profile_picture" tabIndex="-1" 
                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel1">Profile Picture</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="">

                                </div>
                                <form onSubmit={handleSubmit2(onSubmitPic)}  >
                                    <div className="mb-3">
                                        <label htmlFor="formFile1" className="form-label">Set Profile Picture</label>
                                        <input className="form-control" type="file"
                                        {...register2("profile_pic" )} id="formFile1" required />
                                    </div>
                                    <button type="submit" className="btn btn-primary" >Save changes</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="update_profile" tabIndex="-1" 
                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel2">Update Bio</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit(onSubmit)}  >
                                    <div className="mb-3">
                                        <div className="form-group mb-3 p-2">
                                            <label htmlFor="formUsername" className="form-label">
                                                Location
                                            </label>
                                            <input type="text" className="form-control" 
                                            id="formUsername" defaultValue={currentUser.state} {...register("state",{
                                            required: "This field is required",
                                            minLength: {
                                                value: 8,
                                                message: 'Minimum of 8 character length' 
                                            }
                                            })} placeholder="Did you change your location?" required />
                                            <span style={red}> {errors.state?.message} </span>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary" >Save changes</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="add_item" tabIndex="-1" 
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel3">Post Item</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="">

                                </div>
                                <form onSubmit={handleSubmit3(onSubmitItem)}  >
                                    <div className="mb-3">
                                        <label htmlFor="formName" className="form-label">Name</label>
                                        <input className="form-control" type="text"
                                        {...register3("name" )} id="formName" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="formPrice" className="form-label">Price</label>
                                        <input className="form-control" type="text"
                                        {...register3("price" )} id="formPrice" required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="formDescription" className="form-label">Description</label>
                                        <input className="form-control" type="text"
                                        {...register3("description" )} id="formDescription" maxLength="250" required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="formThumbnail" className="form-label">Thumbnail</label>
                                        <input className="form-control" type="file"
                                        {...register3("thumbnail" )} id="formThumbnail" required />
                                    </div>
                                    <button type="submit" className="btn btn-primary" >Post Ad</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                    </div>
                    {/* modal form ends */}
                    <div className="row mb-2">
                        <hr />
                        <div className="table-responsive">
                            <table className="table table-striped .table-hover">
                                <thead>
                                    <tr className="tab-row">
                                        <th className="tb-head">Name</th>
                                        <th className="tb-head">Price</th>
                                        <th className="tb-head">Interest</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map(item => (
                                        <tr key={item.id} className="tb-row"> 
                                            <td>
                                                <Link className={styles.link} to={`list/${item.id}`}>  
                                                    {item.name}
                                                </Link>
                                            </td>
                                            <td>#{item.price}</td>
                                            <td>{ item.interest}</td>
                                        </tr>
                                    ))}  
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

const mapStateToProps = state => ({
    access: state.auth.access,
    currentUser: state.auth.user
})

export default connect(mapStateToProps, { update_user, update_picture, create_item, get_my_item })(Profile);