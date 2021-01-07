import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProvider";
import Explore from "../pages/Explore";
import Login from "../pages/Login";
import Register from "../pages/Register";

const ApplicationViews = () => {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <Switch>
      <Route path="/" exact>
        {isLoggedIn ? <p>Home</p> : <Redirect to="/login" />}
      </Route>
      <Route path="/explore">
        {isLoggedIn ? <Explore /> : <Redirect to="/login" />}
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </Switch>
  );
};

export default ApplicationViews;