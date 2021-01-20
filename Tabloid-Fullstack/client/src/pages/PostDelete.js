import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { Link, Redirect, Switch, Route } from "react-router-dom";

export const PostDelete = () => {
  const { postId } = useParams();
  const history = useHistory();
  const [post, setPost] = useState();
  const [posts, setPosts] = useState([]);

  //get the current user id fom local stroage
  const currentUser = parseInt(
    JSON.parse(localStorage.getItem("userProfile")).id
  );

  //TODO only allow the user to see delete page

  //get post
  useEffect(() => {
    fetch(`/api/post/${postId}`)
      .then((res) => {
        if (res.status === 404) {
          return;
        }
        return res.json();
      })
      .then((data) => {
        setPost(data.post);
      });
  }, []);

  const DeletePost = () => {
    return fetch(`/api/post/${postId}`, {
      method: "DELETE",
    }).then(() => history.push("/mypost"));
  };

  return (
    <>
      <h1>post delete </h1>
      <h4>Are you sure you want to delete {post?.title}?</h4>
      <Button onClick={DeletePost}>Yes</Button>{" "}
      <Button>
        <Link to={"/mypost"}>Cancel</Link>
      </Button>
    </>
  );
};
