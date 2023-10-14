import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddContact = ({ addContactHandler }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setState({ ...state, [name]: value });
  };

  const add = (event) => {
    event.preventDefault();
    if (state.name === "" || state.email === "") {
      alert("All the fields are mandatory!");
      return;
    }
    addContactHandler(state);
    setState({
      name: "",
      email: "",
    });
    navigate("/");
  };
  return (
    <div className="ui main">
      <h2>Add Contact</h2>
      <form className="ui form" onSubmit={add}>
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
          Add
        </button>
      </form>
    </div>
  );
};

export default AddContact;
