import {
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_ALERT,
    REMOVE_ALERT,
    FILTER_CONTACTS,
    CLEAR_CURRENT,
    SET_CURRENT,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS,

    CLEAR_CONTACTS


} from '../types'


export default (state, action) => {

    switch (action.type) {

        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload
            };


        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            };






        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact =>
                    contact._id === action.payload._id ? action.payload : contact)


            };



        case DELETE_CONTACT:
            return {

                ...state,
                contacts: state.contacts.filter(contact =>contact._id !== action.payload

                )
            };

        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: null,
                filtered: null,
                current: null,
                error: null 
            };

        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };


        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi')
                    return contact.name.match(regex) || contact.email.match(regex)

                })

            };

        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };

        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            }


        default:
            return state
    }



}