import React, { Fragment, useContext, useEffect } from 'react'
import ContactContext from '../context/contact/contactContext'
import ContactItem from './ContactItem';

const Contacts = () => {
    const contactAll = useContext(ContactContext)


    //console.log(contactContext);
    const { contacts, filtered , getContacts} = contactAll

    useEffect(()=>{
        getContacts()
        //eslint-disable-next-line
    }, [])

    return (
        <Fragment>

            {
                filtered !== null ? filtered.map(contact => (
                    <ContactItem contact={contact}  />
                )) : contacts.map(contact => (
                    <ContactItem contact={contact}  />
                ))
            }

        </Fragment>
    )
}

export default Contacts
