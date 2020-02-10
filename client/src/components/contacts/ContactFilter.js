import React, {useContext, useState, useEffect, useRef} from 'react'

import ContactContext from '../context/contact/contactContext'

const ContactFilter = ()=> {

    const contactContext = useContext(ContactContext)
    const {filterContacts, clearFilter, filtered} = contactContext

    const text= useRef('')

useEffect(()=>{
    if(filtered === null){
text.current.value=''
    }
})

   const onChange = (e) =>{
    

        if( text.current.value !== ''){
           filterContacts( e.target.value)
        }else{
            clearFilter()
        }
    }

    return (
        <form>
               <input 
               type='text'
            
                placeholder='Filter....'
                ref={text}
                onChange={onChange} />
        </form>
    )
}

export default ContactFilter
