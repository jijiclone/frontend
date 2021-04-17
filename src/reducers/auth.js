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
    SUBSCRIPTION_SUCCESS,
    SUBSCRIPTION_FAIL,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    UPDATE_PROFILE_PICTURE_SUCCESS,
    UPDATE_PROFILE_PICTURE_FAIL,
    MEMBER_CREATED_SUCCESS,
    MEMBER_CREATED_FAIL,
    ITEM_DELETED_SUCCESS,
    ITEM_DELETED_FAIL,
    ITEM_POSTED_SUCCESS,
    ITEM_POSTED_FAIL,
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
    LOGOUT
} from "../actions/types"

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: localStorage.getItem('user'),
    message: null
};

export default function auth(state = initialState, action) {
    const {type, payload} = action;

    switch(type){
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.data.access);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.data.access,
                refresh: payload.data.refresh,
                message: payload.status
            }
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            }
        case REGISTRATION_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_SUCCESS:
        case USER_UPDATE_SUCCESS:
            localStorage.setItem('user', payload);
            return {
                ...state,
                user: payload
            }
        case LOGIN_FAIL:
        case REGISTRATION_FAIL:
        case AUTHENTICATED_FAIL:
        case USER_LOADED_FAIL:
        case LOGOUT:
            localStorage.removeItem("access")
            localStorage.removeItem("refresh")
            localStorage.removeItem("user")
            return {
                ...state,
                isAuthenticated: false,
                access: null,
                refresh: null,
                user: null,
                message: payload
            }
        // case AUTHENTICATED_FAIL:
        //     return {
        //         ...state,
        //         isAuthenticated: false
        //     }
        // case USER_LOADED_FAIL:
        //     return {
        //         ...state,
        //         user: null,
        //         isAuthenticated: false
        //     }
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
        case SUBSCRIPTION_SUCCESS:
        case SUBSCRIPTION_FAIL:
        case USER_UPDATE_FAIL:
        case UPDATE_PROFILE_PICTURE_SUCCESS:
        case UPDATE_PROFILE_PICTURE_FAIL:
        case MEMBER_CREATED_SUCCESS:
        case MEMBER_CREATED_FAIL:
        case ITEM_DELETED_SUCCESS:
        case ITEM_DELETED_FAIL:
        case ITEM_POSTED_SUCCESS:
        case ITEM_POSTED_FAIL:
        case GET_ALL_ITEMS_SUCCESS:
        case GET_ALL_ITEMS_FAIL:
        case GET_FEATURED_ITEM_SUCCESS:
        case GET_FEATURED_ITEM_FAIL:
        case GET_ITEM_MEMBERS_SUCCESS:
        case GET_ITEM_MEMBERS_FAIL:
        case GET_DETAILED_ITEM_SUCCESS:
        case GET_DETAILED_ITEM_FAIL:
        case GET_MY_ITEM_SUCCESS:
        case GET_MY_ITEM_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
}