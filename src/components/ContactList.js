import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = ({ contacts, getContactId, term, searchKeyword }) => {
  const inputEl = useRef("");

  const deleteContactHandler = (id) => {
    getContactId(id);
  };

  const getSearchTerm = () => {
    searchKeyword(inputEl.current.value);
  };

  const renderContactList = contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler}
        key={contact.id}
      />
    );
  });
  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right floated">Add Contact</button>
        </Link>
      </h2>
      <div className="ui icon input">
        <input
          ref={inputEl}
          type="text"
          placeholder="Search Contacts"
          className="prompt"
          value={term}
          onChange={getSearchTerm}
        />
        <i className="search icon"></i>
      </div>
      <div className="ui celled list">
        {renderContactList.length > 0
          ? renderContactList
          : "No contacts Available"}
      </div>
    </div>
  );
};

export default ContactList;
