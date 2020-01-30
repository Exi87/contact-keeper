import React, { useReducer } from 'react';

import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_ALERT,
    REMOVE_ALERT,
    CLEAR_CURRENT,
    SET_CURRENT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
    

} from '../types'


//INTIAL STATE

const ContactState = props => {
    const initialState = {
        contacts: [],
        error:null,
        current: null,
        filtered: null
    };


    //state allow us to access anything in our state
    //dispatch allow us to dispatch to our reducer
    const [state, dispatch] = useReducer(contactReducer, initialState)



    const getContacts= async () => {

  

        try {
            const res = await axios.get('/api/contacts')

            dispatch({
                type:GET_CONTACTS,
                payload:res.data
            })
        } catch (err) {
            dispatch({
                type:CLEAR_CONTACTS,
                payload:err.response.data.msg
            })
        }
    }

    //Add contact

    const addContact = async contact => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/contacts', contact, config)
            //dipatch action to the reducer
            dispatch({ type: ADD_CONTACT, payload:res.data })
        } catch (err) {

            dispatch({
                type: CONTACT_ERROR,
                payload:err.response.msg 
            })

        }

    };


   

    //delete contact

    const deleteContact = async id => {

        try {
          await axios.delete(`/api/contacts/${id}`)

            dispatch({ type: DELETE_CONTACT, payload: id })
        } catch (err) {
            dispatch({
                type:CONTACT_ERROR,
                payload:err.response.msg
            })
        }
        //dipatch action to the reducer
       
    };

  
    const updateContact = async contact => {


        //dipatch action to the reducer
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
            //dipatch action to the reducer
            dispatch({ type:UPDATE_CONTACT, payload:res.data })
        } catch (err) {

            dispatch({
                type: CONTACT_ERROR,
                payload:err.response.msg 
            })

        }
    };


    //set current contact

    const setCurrent = contact => {


        //dipatch action to the reducer
        dispatch({ type: SET_CURRENT, payload: contact })
    };

    const clearCurrent = () => {


        //dipatch action to the reducer
        dispatch({ type: CLEAR_CURRENT })
    };

    //update contact


    //filter contact
    const filterContacts = text => {


        //dipatch action to the reducer
        dispatch({ type: FILTER_CONTACTS, payload: text })



    };
    //clear current contact
const clearContacts =()=>{
    dispatch({
        type:CLEAR_CONTACTS
    })
}
    //filter contact
    //clear filter
    const clearFilter = () => {


        //dipatch action to the reducer
        dispatch({ type: CLEAR_FILTER })
    };



    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            error:state.error,
            current: state.current,
            filtered: state.filtered,
            addContact,
            getContacts,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            clearContacts
        }}>
            {props.children}
        </ContactContext.Provider>
    )

};

export default ContactState;