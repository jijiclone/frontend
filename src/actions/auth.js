import {
    REGISTRATION_SUCCESS,
    REGISTRATION_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_FAIL,
    USER_LOADED_SUCCESS,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    LOGOUT,
    USER_UPDATE_SUCCESS,
    UPDATE_PROFILE_PICTURE_SUCCESS,
    UPDATE_PROFILE_PICTURE_FAIL,
    USER_UPDATE_FAIL
} from "./types"

import axios from "axios";


export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `JWT ${localStorage.getItem("access")}`
            }
        };

        const body = JSON.stringify({ token: localStorage.getItem("access") })

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)

            if (res.data.code !== "token_not_valid") {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                })
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            })
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        })
    }
}

export const load_user = () => async dispatch => {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `JWT ${localStorage.getItem("access")}`,
                "Accept": "application/json"
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            })
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        })
    }
};

export const update_user = (data) => async dispatch => {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `JWT ${localStorage.getItem("access")}`,
                "Accept": "application/json"
            }
        };
        const body = JSON.stringify(data);
        try {
            const res = await axios.patch(`${process.env.REACT_APP_API_URL}/auth/users/me/`, body, config);
            dispatch({
                type: USER_UPDATE_SUCCESS,
                payload: res.data
            })
            return res.status
        } catch (err) {
            const message = err.message;
            dispatch({
                type: USER_UPDATE_FAIL
            })
            return message
        }
    } else {
        dispatch({
            type: USER_UPDATE_FAIL
        })
    }
};

export const update_picture = (data) => async dispatch => {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem("access")}`,
            }
        };
        const formdata = new FormData()
        formdata.append("profile_pic", data.profile_pic[0])
        const body = formdata;
        try {
            const res = await axios.patch(`${process.env.REACT_APP_API_URL}/auth/users/me/`, body, config);
            dispatch({
                type: UPDATE_PROFILE_PICTURE_SUCCESS,
                payload: res.data
            })
            return res.status
        } catch (err) {
            const message = err.message;
            dispatch({
                type: UPDATE_PROFILE_PICTURE_FAIL,

            })
            return message
        }
    } else {
        dispatch({
            type: UPDATE_PROFILE_PICTURE_FAIL,

        })
    }
};

export const login = (data) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify(data);

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res
        })
        dispatch(load_user());
        alert("Login successful")
        return res.statusText
    } catch (err) {
        const message = err.message;
        dispatch({
            type: LOGIN_FAIL,
            payload: message,
        })
        return message
    }
};

export const signup = (data) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    };

    const formdata = new FormData()
    formdata.append("email", data.email)
    formdata.append("username", data.username)
    formdata.append("first_name", data.first_name)
    formdata.append("last_name", data.last_name)
    formdata.append("profile_pic", data.profile_pic[0])
    formdata.append("state", data.state)
    formdata.append("password", data.password)
    formdata.append("re_password", data.re_password)
    // for (var key of formdata.entries()) {
    //     console.log(key[0] + ', ' + key[1]);
    // }
    const body = formdata;
    alert("Creating account please wait a minute.")
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);
        dispatch({
            type: REGISTRATION_SUCCESS,
            payload: res.data
        })
        return res.statusText
    } catch (err) {
        const message = err.message;
        dispatch({
            type: REGISTRATION_FAIL
        })
        console.log(message)
        return message
    }
};


export const verify = (data) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify(data);
    alert("Activating your account please wait a minute.")
    try {
        let res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);
        dispatch({
            type: ACTIVATION_SUCCESS,
        })
        alert("Your account is successfully activated")
        return res.status
    }catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
        console.log(err)
        return err.message
    }
}


export const reset_password = (data) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify(data);
    console.log(body)

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        })
        alert("Url sent to mail successfully")
        return res.status
    } catch (err) {
        const message = err.message;
        dispatch({
            type: PASSWORD_RESET_FAIL
        })
        return message
    }
}

export const reset_password_confirm = (datas) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify(datas);
    console.log(body)

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        })
        alert("Password successfully changed")
        return res.status
    } catch (err) {
        const message = err.message;
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        })
        return message;
    }
}

export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    })
}
