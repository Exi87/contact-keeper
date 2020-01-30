import React, {useContext, useState} from 'react'

import ContactContext from '../context/contact/contactContext'

const ContactFilter = ()=> {

    const contactContext = useContext(ContactContext)
    const {filterContacts, clearFilter} = contactContext

    const [text, setText] = useState('')



   const onChange = (e) =>{
       
        setText(
            e.target.value
        )

        if( e.target.value !== ''){
           filterContacts( e.target.value)
        }else{
            clearFilter()
        }
    }

    return (
        <form>
               <input type='text'
                name='text'
                placeholder='Filter....'
                value={text}
                onChange={onChange} />
        </form>
    )
}

export default ContactFilter
