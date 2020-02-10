import React, { Fragment, useContext, useEffect } from "react";
import ContactContext from "../context/contact/contactContext";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  //console.log(contactContext);
  const { contacts, filtered, getContacts } = contactContext;

  useEffect(() => {
    getContacts();

    //eslint-disable-next-line
  }, []);

  if(contacts.length ===0){
return <h4>Please add a contact</h4>
  }

  return (
    <Fragment>
      {filtered !== null
        ? filtered.map(contact => (
            <ContactItem key={contact.id} contact={contact} />
          ))
        : contacts.map(contact => (
            <ContactItem key={contact.id} contact={contact} />
          ))}
    </Fragment>
  );
};

export default Contacts;
