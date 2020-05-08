import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { logout, getItem } from "../Helpers/utils";
import { Link  } from "react-router-dom";
import CheckIsAdmin from "../Helpers/isAdmin"

function NavbarCustom() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Tickets System
        </Navbar.Brand>
        {!getItem("token") ? (
          ""
        ) : (
        <>
          <Link to="#" onClick={logout} style={{"marginLeft": "40px"}}>Logout</Link>
          {!CheckIsAdmin() ? '' : (
            <>
            <Link to="/users" style={{"marginLeft": "40px"}}>Users</Link>
            <Link to="/tickets" style={{"marginLeft": "40px"}}>Tickets</Link>
            </>
          )}
        </>
          ) 
        }
      </Navbar>
    </>
  );
}
export default NavbarCustom;
