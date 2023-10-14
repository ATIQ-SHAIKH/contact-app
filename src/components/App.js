import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetails from "./ContactDetails";
import uniqid from "uniqid";
import api from "../api/contact";
import EditContact from "./EditContact";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const getContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    const request = { id: uniqid(), ...contact };
    const response = await api.post("/contacts", request);
    if (response) setContacts([...contacts, response.data]);
    else alert("Some error in addContactHandler");
  };

  const removeContactHandler = async (id) => {
    const response = await api.delete(`/contacts/${id}`);
    if (response.status === 200) {
      const newContactList = contacts.filter((contact) => contact.id !== id);
      setContacts(newContactList);
    }
  };

  const updateContactHandler = async (contact) => {
    const { id } = contact;
    const response = await api.put(`/contacts/${contact.id}`, contact);
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  useEffect(() => {
    const retriveContacts = async () => {
      const contacts = await getContacts();
      if (contacts) setContacts(contacts);
    };
    retriveContacts();
  }, []);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ContactList
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            }
          />
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route path="/contact/:id" element={<ContactDetails />} />
          <Route
            path="/edit"
            element={
              <EditContact updateContactHandler={updateContactHandler} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
