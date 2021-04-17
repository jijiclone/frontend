import React, { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import {create_member, get_all_items, get_featured_item} from "../services/item.services"
import styles from "../css/main.module.css";


function Main({ access, create_member, get_all_items, get_featured_item }) {
    const [items, setItems] = useState([])
    const [featuredItem, setFeaturedItem] = useState([])


    useEffect(() => {
        get_all_items().then(
            (res) => {
                setItems(res)
            }
        ).catch(error =>{
            console.error('Error:', error);
            return <Redirect to="/" />
        })
        get_featured_item().then(
            (res) => {
                setFeaturedItem(res[0])
            }
        ).catch(error =>{
            console.error('Error:', error);
            return <Redirect to="/" />
        })

    }, [get_all_items, get_featured_item])

    let arr = []
    const onClick = async (e) => {
        e.target.style.backgroundColor = "green";
        e.target.style.color = "white";
        if ( arr.includes(e.target.value) ){
            alert("You have showed interest already!")
        }else {
            await create_member(e.target.value).then(
                (res) => {
                    if (res === 201){
                        alert("Thanks for expressing your Interest \n Your details has been sent to the seller.")
                    }else {
                        alert("something went wrong")
                    }
                }
            )
            arr.push(e.target.value)
        }
    }

    const getItems = () => {
        let list = [];
        let result = [];

        items.map(item => {
            return list.push(
                <div 
                className={`row g-0 shadow rounded overflow-hidden flex-md-row mb-4 h-md-250 ${styles.inner_div}`}>
                    <div className={`col-auto p-4 d-flex flex-column mx-auto my-1 ${styles.img}`}>
                        <img 
                        width="200" height="210"
                        src={item.thumbnail} alt="blog post" />
                    </div>
                    <div className={`col-md-6 p-4 d-flex align-self-center flex-column mx-auto ${styles.text}`}>
                        <h3 className="mb-1">{item.name}</h3>
                        <div className="mb-1 text-muted">#{item.price} </div>
                        <p className="card-text mb-3">{item.description}</p>
                        <div>
                            <button onClick={(e) => onClick(e)} 
                            type="submit" className="qel btn btn-outline-success" value={item.id}>
                                Interested <i className={`far fa-check-circle text-white`}></i>
                            </button>
                        </div>
                        
                    </div>
                </div>
            )
        });

        for (let i = 0; i < list.length; i +=2) {
            result.push(
                <div key={i} className={`row ${styles.outer_div}`}>
                    <div className={` ${styles.col_div}`}>
                        {list[i]}
                    </div>
                    <div className={`${styles.col_div}`}>
                        {list[i+1] ? list[i+1] : null}
                    </div>
                </div>
            )
        }

        return result;
    }

    if(!access) {
        return <Redirect to="/" />
    }

    return (
        <div className={`${styles.wrapper}`}>
            <Row>
                <main className="container bg-dark">
                    <div className={`row p-4 p-md-5 mb-0 text-white ${styles.featured_row}`}>
                        <div className={`col-md-6 ${styles.featured_col_1}`}>
                            <h1 className="display-5 fst-italic">{featuredItem.name}</h1>
                            <div className="mb-1 text-muted">#{featuredItem.price} </div>
                            <p className="lead my-3">{featuredItem.description}</p>
                            <p className="lead mb-0">
                                <Link to={`/blog/${featuredItem.id}`} className="text-white fw-bold" t="_blank">View more...</Link>
                            </p>
                        </div>
                        <div className={`col-md-6 d-none d-md-block ${styles.featured_col_2}`}>
                            <img className={`${styles.imag}`}
                                src={featuredItem.thumbnail} alt="blog post" /> 
                        </div>
                    </div>
                    <div className={`row mb-2 ${styles.getItems}`}>
                        {getItems()}
                    </div>
                </main>
            </Row>
        </div>
    )
}

const mapStateToProps = state => ({
    access: state.auth.access,
})

export default connect(mapStateToProps, { create_member, get_all_items, get_featured_item })(Main);