import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Explore from "../pages/Explore";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PostDetails from "../pages/PostDetails";
import CategoryManager from "../pages/CategoryManager";
import { UserPost } from "../pages/UserPost";
import { PostForm } from "../pages/PostForm";
import { PostDelete } from "../pages/PostDelete";

const ApplicationViews = () => {
  const { isLoggedIn, isAdmin } = useContext(UserProfileContext);

  return (
    <Switch>
      <Route path="/" exact>
        {isLoggedIn ? <p>Home</p> : <Redirect to="/login" />}
      </Route>
      <Route path="/explore">
        {isLoggedIn ? <Explore /> : <Redirect to="/login" />}
      </Route>
      <Route path="/post/:postId">
        {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
      </Route>
      <Route path="/categories">
        {isLoggedIn ? (
          isAdmin() ? (
            <CategoryManager />
          ) : (
            <Redirect to="/" />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/mypost">
        {isLoggedIn ? <UserPost /> : <Redirect to="/mypost" />}
      </Route>
      <Route path="/create/post">
        {isLoggedIn ? <PostForm /> : <Redirect to="/create/post" />}
      </Route>
      <Route path="/edit/post/:postId(\d+)">
        {isLoggedIn ? (
          <PostForm />
        ) : (
          <Redirect to="/create/post/:postId(\d+)" />
        )}
      </Route>
      <Route path="/delete/post/:postId(\d+)">
        {isLoggedIn ? (
          <PostDelete />
        ) : (
          <Redirect to="/delete/post/:postId(\d+)" />
        )}
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
