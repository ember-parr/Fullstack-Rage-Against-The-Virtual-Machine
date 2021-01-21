import React, { useState, useEffect, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { Button } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const PostDelete = () => {
  const { getToken } = useContext(UserProfileContext);
  const { postId } = useParams();
  const history = useHistory();
  const [post, setPost] = useState();

  //get the current user id fom local stroage
  const currentUser = parseInt(
    JSON.parse(localStorage.getItem("userProfile")).id
  );

  //get post by id
  useEffect(() => {
    getToken().then((token) =>
      fetch(`/api/post/${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 404) {
            history.push("/");
          }
          return res.json();
        })
        .then((data) => {
          setPost(data.post);
        })
    );
  }, [postId]);

  const DeletePost = () => {
    getToken().then((token) => {
      return fetch(`/api/post/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => history.push("/mypost"));
    });
  };

  //check if the post belongs to the user
  if (post !== null) {
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
