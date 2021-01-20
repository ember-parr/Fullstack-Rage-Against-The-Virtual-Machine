import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const PostDelete = () => {
  const { postId } = useParams();
  const history = useHistory();
  const [post, setPost] = useState();

  //get the current user id fom local stroage
  const currentUser = parseInt(
    JSON.parse(localStorage.getItem("userProfile")).id
  );

  //get post by id
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

  if (post !== null) {
    //the post belongs to the user
    if (post?.userProfileId === currentUser) {
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
    } else {
      return (
        //the post does not belong to the user
        <>
          <h1>This is not your post to delete</h1>
          <Button>
            <Link to={"/mypost"}>Go Back</Link>
          </Button>
        </>
      );
    }
  }
};
