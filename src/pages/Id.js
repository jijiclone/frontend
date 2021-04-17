import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { get_detailed_item, get_item_members, delete_item } from '../services/item.services';
import styles from "../css/profile.module.css";


function Id({ access, match, delete_item, get_detailed_item, get_item_members }) {
    const [item, setItem] = useState([])
    const [itemMember, setItemMember] = useState([])
    let history = useHistory()

    const id = match.params.id;

    useEffect(() => {
        get_detailed_item(id).then(
            (res) => {
                setItem(res)
            }
        ).catch(error =>{
            console.error('Error:', error);
            return <Redirect to="/" />
        })

        get_item_members(id).then(
            (res) => {
                setItemMember(res)
            }
        ).catch(error =>{
            console.error('Error:', error);
            return <Redirect to="/" />
        })

    }, [id, get_detailed_item, get_item_members])

    const onClick = async (e) => {
        await delete_item(e.target.value).then(
            (res) => {
                if (res === 204){
                    alert("This Item has been removed successfully");
                    history.push("/main")
                }else {
                    alert("something went wrong")
                }
            }
        )
    }

    if(!access) {
        return <Redirect to="/" />
    }

    return (
        <div className={`${styles.wrapper}`}>
            <main className="container">
                <div className={`row ${styles.div_row}`}>
                    <div className={`${styles.col_10}`}>
                        <div key={item.id} className="card">
                            <div className="card-body">
                                <div>
                                    <img src={item.thumbnail} className={`card-img-top ${styles.col_img}`}
                                    width={200} height={400} alt="thumbnail" />
                                </div>
                                <div className="mt-2">
                                    <h5 className="card-title">
                                        Item: {item.name}    
                                    </h5>
                                    <p>Price: {item.price} </p>
                                    <p>Description: {item.description} </p>
                                    <p>No of Interest(s): {item.interest} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.col_2}`}>
                        <div className="mt-3">
                            <button type="button" className="btn btn-success me-2 mb-2" 
                            onClick={(e) => onClick(e)} value={item.id} >
                                Sold <i className={`far fa-check-circle text-white`}></i>
                            </button>
                            <button type="button" className="btn btn-danger mb-2" 
                            onClick={(e) => onClick(e)} value={item.id} >
                                Delete <i className={`fas fa-times text-white`}></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row mb-2">
                    <hr />
                    <div className="table-responsive">
                        <table className="table table-striped .table-hover">
                            <thead>
                                <tr className="tab-row">
                                    <th className="tb-head">Email</th>
                                    <th className="tb-head">First Name</th>
                                    <th className="tb-head">Last Name</th>
                                    <th className="tb-head">State</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemMember.map((item) => (
                                    <tr key={item.email} className="tb-row"> 
                                        <td >{item.email}</td>
                                        <td >{item.first_name}</td>
                                        <td >{item.last_name}</td>
                                        <td >{item.state}</td>
                                    </tr>
                                ))}  
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}

const mapStateToProps = state => ({
    access: state.auth.access,
})


export default connect(mapStateToProps, { delete_item, get_detailed_item, get_item_members })(Id);