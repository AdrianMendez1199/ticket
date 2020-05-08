import React from "react";
import Login from "./Component/Login";
import "./App.css";
import Tickets  from "./Component/Tickets";
import Admin from "./Component/Admin";
import Register from "./Component/Register";
import PrivateRoute from "./Component/PrivateRoute";
import NavbarCustom from "./Component/Navbar";
import Users from "./Component/Users";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute>
          <NavbarCustom />
          <Route path="/admin" component={Admin} />
          <Route path="/tickets" component={Tickets} />
          <Route path="/users" component={Users} />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
