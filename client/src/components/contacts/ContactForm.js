import React, { useState, useContext, useEffect } from "react";

import ContactContext from "../context/contact/contactContext";
import PropTypes from "prop-types";
import { CLEAR_CURRENT } from "../context/types";

const ContactForm = () => {
  //access method in state in contacContext
  const contactContext = useContext(ContactContext);

  const {
    addContact,
    clearCurrent,
    updateContact,
    setCurrent,
    current
  } = contactContext;

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal"
  });

  const { name, email, phone, type } = contact;

  const onChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal"
      });
    }
  }, [contactContext, current]);

  const onsubmit = e => {
    e.preventDefault();
   
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }

    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onsubmit}>
      <h2 className="text-primary">
        {current ? "Update Contact" : "Add Contact"}{" "}
      </h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={onChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={onChange}
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={phone}
        onChange={onChange}
      />

      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />
      <label>personal : {""}</label>

      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />
      <label>professional : {""}</label>

      <div>
        <input
          type="submit"
          value={current ? "Update" : " Add Contact"}
          className=" btn btn-primary btn-block"
        />
      </div>

      {current && (
        <div>
          <button className=" btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

ContactForm.propTypes = {};

export default ContactForm;
