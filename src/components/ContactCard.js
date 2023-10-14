import React from "react";
import { Link } from "react-router-dom";
import avatar from "../images/avatar.jpg";

const ContactCard = ({ contact, clickHandler }) => {
  return (
    <div className="item">
      <img className="ui avatar image" src={avatar} alt="avatar" />
      <div className="content">
        <Link
          to={{
            pathname: `/contact/${contact.id}`,
          }}
          state={contact}
        >
          <div className="header">{contact.name}</div>
          <div>{contact.email}</div>
        </Link>
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
        onClick={() => clickHandler(contact.id)}
      ></i>
      <Link
        to={{
          pathname: `/edit`,
        }}
        state={contact}
      >
        <i
          className="edit alternate outline icon"
          style={{ color: "blue", marginTop: "7px" }}
        ></i>
      </Link>
    </div>
  );
};

export default ContactCard;
