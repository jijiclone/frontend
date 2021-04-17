import {
    ITEM_POSTED_FAIL,
    ITEM_POSTED_SUCCESS,
    MEMBER_CREATED_SUCCESS,
    MEMBER_CREATED_FAIL,
    ITEM_DELETED_SUCCESS,
    ITEM_DELETED_FAIL,
    GET_ALL_ITEMS_SUCCESS,
    GET_ALL_ITEMS_FAIL,
    GET_FEATURED_ITEM_SUCCESS,
    GET_FEATURED_ITEM_FAIL,
    GET_ITEM_MEMBERS_SUCCESS,
    GET_ITEM_MEMBERS_FAIL,
    GET_DETAILED_ITEM_SUCCESS,
    GET_DETAILED_ITEM_FAIL,
    GET_MY_ITEM_SUCCESS,
    GET_MY_ITEM_FAIL,
} from "../actions/types";

import axios from "axios";


export const get_all_items = () => async dispatch => {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `JWT ${localStorage.getItem("access")}`,
                "Accept": "application/json"
            }
        };

        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/`, config);
            dispatch({
                type: GET_ALL_ITEMS_SUCCESS,
            })
            return res.data
        }catch(e){
            dispatch({
                type: GET_ALL_ITEMS_FAIL,
            })
            return console.log(e.message)
        }
    } else {
        dispatch({
            type: GET_ALL_ITEMS_FAIL,
        })
    }
}

export const create_item = (data) => async dispatch => {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `JWT ${localStorage.getItem("access")}`
            }
        };
        const formdata = new FormData()
        formdata.append("thumbnail", data.thumbnail[0])
        formdata.append("name", data.name)
        formdata.append("price", data.price)
        formdata.append("description", data.description)
    
        const body = formdata;
        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/create/`, body, config);
            dispatch({
                type: ITEM_POSTED_SUCCESS,
            })
            return res.status
        }catch(e){
            dispatch({
                type: ITEM_POSTED_FAIL,
            })
            return console.log(e.message)
        }
    } else {
        dispatch({
            type: ITEM_POSTED_FAIL,
        })
    }
}

export const create_member = (id) => async dispatch => {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `JWT ${localStorage.getItem("access")}`,
                "Accept": "application/json"
            }
        };
        
        const body = JSON.stringify(id);
        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/create_member/`, body, config);
            dispatch({
                type: MEMBER_CREATED_SUCCESS,
            })
            return res.status
        }catch(e){
            dispatch({
                type: MEMBER_CREATED_FAIL,
            })
            return console.log(e.message)
        }
    } else {
        dispatch({
            type: MEMBER_CREATED_FAIL,
        })
    }
}

export const get_featured_item = () => async dispatch => {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `JWT ${localStorage.getItem("access")}`,
                "Accept": "application/json"
            }
        };

        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/featured/`, config);
            dispatch({
                type: GET_FEATURED_ITEM_SUCCESS,
            })
            return res.data
        }catch(e){
            dispatch({
                type: GET_FEATURED_ITEM_FAIL,
            })
            return console.log(e.message)
        }
    } else {
        dispatch({
            type: GET_FEATURED_ITEM_FAIL,
        })
    }
}

export const get_item_members = (id) => async dispatch => {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `JWT ${localStorage.getItem("access")}`,
                "Accept": "application/json"
            },
            params: {"id": id}
        };
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/list_members/`, config);
            dispatch({
                type: GET_ITEM_MEMBERS_SUCCESS,
            })
            return res.data
        }catch(e){
            dispatch({
                type: GET_ITEM_MEMBERS_FAIL,
            })
            return console.log(e.message)
        }
    } else {
        dispatch({
            type: GET_ITEM_MEMBERS_FAIL,
        })
    }
}

export const get_detailed_item = (id) => async dispatch => { 
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `JWT ${localStorage.getItem("access")}`,
                "Accept": "application/json"
            }
        };
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/${id}/`, config);
            dispatch({
                type: GET_DETAILED_ITEM_SUCCESS,
            })
            return res.data
        }catch(e){
            dispatch({
                type: GET_DETAILED_ITEM_FAIL,
            })
            return console.log(e.message)
        }
    } else {
        dispatch({
            type: GET_DETAILED_ITEM_FAIL,
        })
    }
}

export const delete_item = (id) => async dispatch => { 
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `JWT ${localStorage.getItem("access")}`,
                "Accept": "application/json"
            }
        };
        try{
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/delete/${id}/`, config);
            dispatch({
                type: ITEM_DELETED_SUCCESS,
            })
            return res.status
        }catch(e){
            dispatch({
                type: ITEM_DELETED_FAIL,
            })
            return console.log(e.message)
        }
    } else {
        dispatch({
            type: ITEM_DELETED_FAIL,
        })
    }
}

export const get_my_item = () => async dispatch => {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `JWT ${localStorage.getItem("access")}`,
                "Accept": "application/json"
            }
        };

        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/list/`, config);
            dispatch({
                type: GET_MY_ITEM_SUCCESS,
            })
            return res.data
        }catch(e){
            dispatch({
                type: GET_MY_ITEM_FAIL,
            })
            return console.log(e.message)
        }
    } else {
        dispatch({
            type: GET_MY_ITEM_FAIL,
        })
    }
}