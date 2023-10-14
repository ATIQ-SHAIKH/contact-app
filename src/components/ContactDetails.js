import React from "react";
import { Link, useLocation } from "react-router-dom";
import avatar from "../images/avatar.jpg";

const ContactDetails = () => {
  const { state: contact } = useLocation();
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={avatar} alt="avatar" />
        </div>
        <div className="content">
          <div className="header">{contact.name}</div>
          <div className="description">{contact.email}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
          <button className="ui button blue center">
            Back to Contact List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetails;
