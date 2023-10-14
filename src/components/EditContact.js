import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditContact = ({ updateContactHandler }) => {
  const { state: contact } = useLocation();
  const [state, setState] = useState({
    id: contact.id,
    name: contact.name,
    email: contact.email,
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setState({ ...state, [name]: value });
  };

  const update = (event) => {
    event.preventDefault();
    if (state.name === "" || state.email === "") {
      alert("All the fields are mandatory!");
      return;
    }
    updateContactHandler(state);
    setState({
      name: "",
      email: "",
    });
    navigate("/");
  };
  return (
    <div className="ui main">
      <h2>Edit Contact</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter the name"
            name="name"
            value={state.name}
            onChange={handleChange}
          />
        </div>
        <label>Email</label>
        <div className="field">
          <input
            type="text"
            placeholder="Enter the email"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="ui button blue">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditContact;
