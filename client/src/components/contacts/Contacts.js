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
    }, [contacts])

    return (
        <Fragment>

            {
                
               contacts.map(contact => (
                    <ContactItem contact={contact}  key={contact.id} />
                ))
            }

        </Fragment>
    )
}

export default Contacts
