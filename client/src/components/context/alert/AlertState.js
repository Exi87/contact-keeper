



import React, { useReducer } from 'react';
import uuid from 'uuid';

import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import {
    SET_ALERT,
    REMOVE_ALERT

} from '../types'


//INTIAL STATE

const AlertState = props => {
    const initialState = [];


    //state allow us to access anything in our state
    //dispatch allow us to dispatch to our reducer
    const [state, dispatch] = useReducer(alertReducer, initialState)

    //set alert

    const setAlert = (msg, type, timeout=5000) => {
        const id = uuid.v4();
        dispatch({ type: SET_ALERT, payload: { msg, type, id } });

        setTimeout(() => {
            dispatch({ type: REMOVE_ALERT, payload: id })
        }, timeout)
    }






    return (
        <AlertContext.Provider value={{
            alerts: state,
            setAlert
        }}>
            {props.children}
        </AlertContext.Provider>
    )

};

export default AlertState;


















{/*import React, {useReducer} from 'react'

import AuthContext from './authContext'

import authReducer from './authReducer'

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

const AuthState = props =>{

      const initialState ={
            
      token:localStorage.getItem('token'),
      isAuthenticated:null,
      loading:true,
      user:null,
      error:null

      };


      const [state, dispatch] = useReducer(authReducer, initialState)


      return(
          <AuthContext.provider value={{
              token:state.token,
              isAuthenticated:state.isAuthenticated,
              loading:state.loading,
              error:state.error,

              user:state.user

          }}>


              {props.children}
          </AuthContext.provider>


      );
};

export default AuthState;*/}





