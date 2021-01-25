import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Explore from "../pages/Explore";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PostDetails from "../pages/PostDetails";
import CategoryManager from "../pages/CategoryManager";
import { CommentForm } from "./Comments/CommentForm";
import { UserPost } from "../pages/UserPost";
import { PostForm } from "../pages/PostForm";
import { PostDelete } from "../pages/PostDelete";
import TagList from "./TagList";

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
      <Route path="/comment/:postId">
        {isLoggedIn ? <CommentForm /> : <Redirect to="/login" />}
      </Route>
      <Route path="/mypost">
        {isLoggedIn ? <UserPost /> : <Redirect to="/login" />}
      </Route>
      <Route path="/create/post">
        {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
      </Route>

      <Route path="/edit/post/:postId(\d+)">
        {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
      </Route>

      <Route path="/delete/post/:postId(\d+)">
        {isLoggedIn ? <PostDelete /> : <Redirect to="/login" />}
      </Route>

      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/tags">
        {isLoggedIn ? (
          isAdmin() ? (
            <TagList />
          ) : (
            <Redirect to="/" />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
    </Switch>
  );
};

export default ApplicationViews;
