
import {

    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    AUTH_ERROR,
    USER_LOADED,
    CLEAR_ERRORS,
    LOGOUT

} from '../types'


export default (state, action) => {
    switch (action.type) {

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };



        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            console.log(action.payload);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false



            };

        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
         case   LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: action.payload

            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}