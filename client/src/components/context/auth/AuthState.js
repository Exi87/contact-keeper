



import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';

import setAuthToken from '../../../utils/setAuthToken'
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


//INTIAL STATE

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null

    };


    //state allow us to access anything in our state
    //dispatch allow us to dispatch to our reducer
    const [state, dispatch] = useReducer(authReducer, initialState)

    //load user
    const loadUser = async () => {
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }

        try {
            const res = await axios.get('/api/auth');

            dispatch({
                type: USER_LOADED,
                payload: res.data
            });

        } catch (err) {

            dispatch({
                type:AUTH_ERROR
               
            })

        }


    };


    //Register user

    const register = async formData => {
       
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users', formData, config);
            console.log(res.data);
        
            
            dispatch({
                type: REGISTER_SUCCESS,

                //res.data is the token sent from the back end
                payload: res.data,


            });

 //loadUser() get all the user
            loadUser()
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        }

    };



    //login user
    const login = async formData => {
       
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/auth', formData, config);
            console.log(res.data);
        
            
            dispatch({
                type: LOGIN_SUCCESS,

                //res.data is the token sent from the back end
                payload: res.data,


            });

 //loadUser() get all the user
            loadUser()
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            });
        }

    };

    //logout

    const logout = () => {
        dispatch({
            type:LOGOUT
        })
    }

    //clear user

    const clearErros = () => {
        dispatch({ type: CLEAR_ERRORS })
    }



    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            error: state.error,

            user: state.user,
            register,
            loadUser,
            login,
            logout,
            clearErros

        }}>
            {props.children}
        </AuthContext.Provider>
    )

};

export default AuthState;


















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





